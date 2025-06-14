/*import { eq } from "drizzle-orm";
import { db } from "./db/db";
import * as schema from "./db/schema";

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
import { Elysia } from "elysia";

const app = new Elysia()
    .get('/', ({ cookie: { auth } }) => {
        if (auth!.value) {
            return `Hello ${auth!.value}`;
        } else {
            auth!.value = "User";
            return "Hello Elysia";
        }
    })
    .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);