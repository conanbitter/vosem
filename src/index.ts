import { Elysia, t } from "elysia";
import { authPlugin, apiRoutes } from "./api";
import { staticPlugin } from "@elysiajs/static"
import { createElement } from "react";
import { ServerApp } from "./client/App";
import { renderToReadableStream } from "react-dom/server";
import type { GlobalDataType } from "./common";
import * as tasks from "./db/tasks";

//bundling
await Bun.build({
    entrypoints: ['./src/client/index.tsx'],
    outdir: './public',
});

async function NewResponse(request: Request, globalData: GlobalDataType): Promise<Response> {
    const url = new URL(request.url);

    const initData = JSON.stringify(globalData);

    const app = createElement(ServerApp, { location: url.pathname + url.search, data: globalData });
    const stream = await renderToReadableStream(app, {
        bootstrapScripts: ['/public/index.js'],
        bootstrapScriptContent: `window.__INITIAL_DATA__=${initData}`
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/html' }
    });
}

const app = new Elysia()
    .use(staticPlugin())
    .use(authPlugin)
    .get('/favicon.ico', () => Bun.file("favicon.ico"))
    .get('/login', async ({ request }) => await NewResponse(request, { username: "" }))
    .guard(
        {
            async beforeHandle({ user, redirect }) {
                if (!user) {
                    return redirect("/login");
                }
            }
        },
        (app) => app
            .get('/', ({ redirect }) => redirect("/tasks"))
            .get('/tasks', async ({ request, user, query, redirect }) => {
                let page = 1;
                if (query["page"]) {
                    const pageQuery = parseInt(query["page"]);
                    if (Number.isNaN(pageQuery)) {
                        return redirect("/tasks")
                    }
                    if (pageQuery < 0) return redirect("/tasks?page=1");
                    const pagesCount = await tasks.getPageCount(user!.id);
                    if (pageQuery > pagesCount) return redirect(`/tasks?page=${pagesCount}`);
                    page = pageQuery;
                }
                const tasksData = {
                    list: await tasks.getTasks(user!.id, page),
                    pages: await tasks.getPageCount(user!.id)
                }
                return await NewResponse(request, { username: user?.name || "", tasks: tasksData });
            })
    )
    /*    .get('/*', async ({ request, params, user, redirect }) => {
            if (!user && params['*'] !== "login") {
                return redirect("/login");
            }
            return await NewResponse(request, { username: user?.name || "" });
        })*/
    .use(apiRoutes)
    .listen(3000);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);