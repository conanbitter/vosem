import { Elysia, t } from "elysia";
import { jwt } from '@elysiajs/jwt';
import { db } from "./db/db";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";

const jwtPlugin = jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!
});

const authPlugin = new Elysia()
    .use(jwtPlugin)
    .derive({ as: 'global' }, async ({ jwt, cookie: { auth } }) => {
        const user = await jwt.verify(auth!.value);

        if (user) {
            return {
                user: {
                    id: user.id,
                    name: user.name
                }
            };
        }
    })

const app = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') {
            return {
                error: error.all.map((item) => item.summary).join(". ")
            };
        }
    })
    .use(jwtPlugin)
    .use(authPlugin)
    .get('/', async ({ user }) => {
        if (!user) {
            return "User not logged in";
        } else {
            return `Hello ${user.name}`;
        }
    })
    .post('/login', async ({ jwt, cookie: { auth }, body }) => {
        const user = (await db.select().from(schema.users).where(eq(schema.users.login, body.login)))[0];
        if (!user) {
            return { "error": "Login or password is incorrect" };
        }
        if (await Bun.password.verify(body.password, user.password)) {
            const token = await jwt.sign({ id: user.id, name: user.name });

            auth!.set({
                value: token,
                httpOnly: true,
                //secure: true,
                sameSite: true,
                maxAge: 7 * 86400
            })
            return { "error": "ok" };
        } else {
            return { "error": "Login or password is incorrect" };
        }
    }, {
        body: t.Object({
            login: t.String(),
            password: t.String()
        }, { error: "Incorrect request" })
    })
    .get('/logout', ({ cookie: { auth } }) => {
        auth!.remove();
        return { error: "ok" };
    })
    //.derive({ as: 'global' }, () => {
    //    return { user: "sda" };
    //})
    .guard(
        {
            async beforeHandle({ user }) {
                if (!user) {
                    return { error: "User not logged in" };
                }
            }
        },
        (app) => app
            .get('/test', ({ user }) => {
                return { error: "ok", user };
            })
    )
    .listen(3000);
/*
{
        async beforeHandle({ jwt, cookie: { auth } }) {
            const user = await jwt.verify(auth!.value);

            if (!user) {
                return { error: "User not logged in" };
            }
        }
    }
 */
console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);