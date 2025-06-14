/*



const result = await db.select().from(schema.users);
console.log(result);

const admin = await db.select().from(schema.users).where(eq(schema.users.login, "admin"));
if (admin.length > 0) {
    const admin_user = admin[0]!;
    console.log(`Admin is user "${admin_user.name}"`);
    if (await Bun.password.verify(process.env.USR_ADMIN_PASS!, admin_user.password)) {
        console.log("Password verified");
    } else {
        console.log("Password incorrect!");
    }
} else {
    console.log("Can't find admin");
}*/
import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";

const app = new Elysia()
    .onError(({ code, error }) => {
        if (code === 'VALIDATION') {
            return {
                error: error.all.map((item) => item.summary).join(". ")
            };
        }
    })
    .get('/', ({ cookie: { auth } }) => {
        if (auth!.value) {
            return `Hello ${auth!.value}`;
        } else {
            auth!.value = "User";
            return "Hello Elysia";
        }
    })
    .post('/login', async ({ body }) => {
        const user = (await db.select().from(schema.users).where(eq(schema.users.login, body.login)))[0];
        if (!user) {
            return { "error": "Login or password is incorrect" };
        }
        if (await Bun.password.verify(body.password, user.password)) {
            return { "error": "ok", "Name": user.name };
        } else {
            return { "error": "Login or password is incorrect" };
        }
    }, {
        body: t.Object({
            login: t.String(),
            password: t.String()
        }, { error: "Incorrect request" })
    })
    .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);