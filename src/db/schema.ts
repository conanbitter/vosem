import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    login: text().notNull(),
    password: text().notNull(),
    name: text().notNull(),
    registered: int({ mode: "timestamp" }).notNull(),
    role: text({ enum: ["admin", "user"] }).notNull().default("user")
});

export const tasksTable = sqliteTable("tasks", {
    id: int().primaryKey({ autoIncrement: true }),
    state: text({ enum: ["active", "finished", "canceled"] }).notNull().default("active"),
    title: text().notNull(),
    description: text().notNull().default(""),
    created: int({ mode: "timestamp" }).notNull(),
    updated: int({ mode: "timestamp" }).notNull(),
    author: int().references(() => usersTable.id)
});