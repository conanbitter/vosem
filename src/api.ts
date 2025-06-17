import { jwt } from '@elysiajs/jwt';
import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { tasksTable, usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import type { LoginResponse, TasksResponse } from './common';

const jwtPlugin = jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!
});

export const authPlugin = new Elysia()
    .use(jwtPlugin)
    .derive({ as: 'global' }, async ({ jwt, cookie: { auth } }) => {
        const user = await jwt.verify(auth!.value);

        if (user) {
            return {
                user: {
                    id: user.id as number,
                    name: user.name as string
                }
            };
        }
    });

export const apiRoutes = new Elysia({ prefix: '/api' })
    .use(jwtPlugin)
    .use(authPlugin)
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') {
            return {
                error: true,
                message: error.all.map((item) => item.summary).join(". ")
            };
        }
    })
    .post('/login', async ({ jwt, cookie: { auth }, body }): Promise<LoginResponse> => {
        await Bun.sleep(2000);
        const user = (await db.select().from(usersTable).where(eq(usersTable.login, body.login)))[0];
        if (!user) {
            return { "error": true, "message": "Login or password is incorrect" };
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
            return { "error": false, "username": user.name };
        } else {
            return { "error": true, "message": "Login or password is incorrect" };
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
    .guard(
        {
            async beforeHandle({ user }) {
                if (!user) {
                    return { error: "login" };
                }
            }
        },
        (app) => app
            .post('/tasklist', async ({ user }): Promise<TasksResponse> => {
                //await Bun.sleep(2000);
                const result = await db.select({
                    "id": tasksTable.id,
                    "state": tasksTable.state,
                    "title": tasksTable.title
                }).from(tasksTable).orderBy(tasksTable.updated).where(eq(tasksTable.author, user!.id));
                return {
                    error: false,
                    list: result
                }
            })
            .get('/test', ({ user }) => {
                return { error: "ok", user };
            })
    )