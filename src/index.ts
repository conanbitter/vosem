import { Elysia, t } from "elysia";
import { authPlugin, apiRoutes } from "./api";
import { staticPlugin } from "@elysiajs/static"
import { createElement } from "react";
import App from "./client/App";
import { renderToReadableStream } from "react-dom/server";

//bundling
await Bun.build({
    entrypoints: ['./src/client/index.tsx'],
    outdir: './public',
});

const app = new Elysia()
    .use(staticPlugin())
    .use(authPlugin)
    .get('/', ({ user }) => {
        if (!user) {
            return "User not logged in";
        } else {
            return `Hello ${user.name}`;
        }
    })
    .get('/react', async () => {
        const app = createElement(App)
        const stream = await renderToReadableStream(app, {
            bootstrapScripts: ['/public/index.js']
        })

        return new Response(stream, {
            headers: { 'Content-Type': 'text/html' }
        })
    })
    .use(apiRoutes)
    .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);