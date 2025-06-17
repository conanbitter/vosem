import { db } from "./src/db/db";
import { usersTable } from "./src/db/schema";

await db.insert(usersTable).values([
    {
        login: "admin",
        password: await Bun.password.hash(process.env.USR_ADMIN_PASS!),
        name: "Administrator",
        registered: new Date(),
        role: "admin"
    },
    {
        login: "user1",
        password: await Bun.password.hash(process.env.USR_USER1_PASS!),
        name: "Test User",
        registered: new Date(),
        role: "user"
    },
]);