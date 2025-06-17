import { Elysia, t } from "elysia";
import { authPlugin, apiRoutes } from "./api";
import { staticPlugin } from "@elysiajs/static"
import { createElement } from "react";
import { ServerApp } from "./client/App";
import { renderToReadableStream } from "react-dom/server";
import type { GlobalDataType } from "./common";

//bundling
await Bun.build({
    entrypoints: ['./src/client/index.tsx'],
    outdir: './public',
});

const app = new Elysia()
    .use(staticPlugin())
    .use(authPlugin)
    .get('/favicon.ico', () => Bun.file("favicon.ico"))
    .get('/*', async ({ request, query, params, user, redirect }) => {
        if (!user && params['*'] !== "login") {
            return redirect("/login");
        }

        const url = new URL(request.url)

        const initData: GlobalDataType = { username: user?.name || "" };
        const initDataString = JSON.stringify(initData);

        const app = createElement(ServerApp, { location: url.pathname + url.search, data: initData });
        const stream = await renderToReadableStream(app, {
            bootstrapScripts: ['/public/index.js'],
            bootstrapScriptContent: `window.__INITIAL_DATA__=${initDataString}`
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/html' }
        });
    })
    .use(apiRoutes)
    .listen(3000);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);