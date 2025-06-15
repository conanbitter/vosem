import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";

const db = drizzle(process.env.DB_FILE_NAME!);
migrate(db, { migrationsFolder: "./drizzle" });