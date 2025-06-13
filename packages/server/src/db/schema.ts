import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    login: text().notNull(),
    password: text().notNull(),
    name: text().notNull(),
    registered: int({ mode: "timestamp" }).notNull(),
    role: text({ enum: ["admin", "user"] }).notNull().default("user")
});