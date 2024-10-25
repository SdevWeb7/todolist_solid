import { injectable } from "inversify";

import { db } from "@/lib/db/db";
import {todolists, todos} from "@/lib/db/schemas";
import {and, eq} from "drizzle-orm";



@injectable()
export class TodoRepository {

    public async getTodolistByName(userId: string, todolistName: string) {
        try {
            return await db.select().from(todolists).where(and(
                eq(todolists.title, todolistName),
                eq(todolists.userId, userId)
            )).execute();
        } catch (error) {
            throw new Error("Failed to get id of todolist", { cause: error });
        }
    }
    public async getTodos(userId: string, todolistId: string) {
        try {
            return await db.select().from(todos).where(and(
                eq(todos.userId, userId),
                eq(todos.todolistId, todolistId)
            )).execute();
        } catch (error) {
            throw new Error("Failed to get todos", { cause: error });
        }
    }
}
