import { count, eq } from "drizzle-orm";
import { db } from "./db";
import { tasksTable } from "./schema";
import type { TaskListItem } from "../common";

const TASKS_PER_PAGE = 11;

export async function getPageCount(userId: number): Promise<number> {
    const result = (await db.select({
        allTasks: count()
    }).from(tasksTable).where(eq(tasksTable.author, userId)));
    if (result[0]) {
        return Math.ceil(result[0].allTasks / TASKS_PER_PAGE);
    } else {
        return 0;
    }
}

export async function getTasks(userId: number, page: number): Promise<TaskListItem[]> {
    return await db.select({
        "id": tasksTable.id,
        "state": tasksTable.state,
        "title": tasksTable.title
    })
        .from(tasksTable)
        .orderBy(tasksTable.id) //desc(tasksTable.updated)
        .where(eq(tasksTable.author, userId))
        .limit(TASKS_PER_PAGE)
        .offset((page - 1) * TASKS_PER_PAGE);
}