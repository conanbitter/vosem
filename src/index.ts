import { Elysia, t } from "elysia";
import { authPlugin, apiRoutes } from "./api";

const app = new Elysia()
    .use(authPlugin)
    .get('/', ({ user }) => {
        if (!user) {
            return "User not logged in";
        } else {
            return `Hello ${user.name}`;
        }
    })
    .use(apiRoutes)
    .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);