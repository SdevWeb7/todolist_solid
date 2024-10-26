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
    public async addTodo(userId: string, todolistId: string, content: string) {
        try {
            return await db.insert(todos).values({
                userId,
                todolistId,
                content,
                completed: false
            }).execute();
        } catch (error) {
            throw new Error("Failed to add todo", { cause: error });
        }
    }
    public async deleteTodo(userId: string, todoId: string) {
        try {
            return await db.delete(todos).where(and(
                eq(todos.userId, userId),
                eq(todos.id, todoId)
            )).execute();
        } catch (error) {
            throw new Error("Failed to delete todo", { cause: error });
        }
    }

    public async toggleTodo(userId: string, todoId: string, checked: boolean) {
        try {
            return await db.update(todos).set({
                completed: !checked
            }).where(and(
                eq(todos.userId, userId),
                eq(todos.id, todoId)
            )).execute();
        } catch (error) {
            throw new Error("Failed to toggle todo", { cause: error });
        }
    }
}
