import { injectable } from "inversify";

import { db } from "@/lib/db/db";
import {todolists} from "@/lib/db/schemas";
import {and, eq} from "drizzle-orm";



@injectable()
export class TodolistRepository {

    public async getTodolists(userId: string) {
        try {
            const todolistsTemp = await db
                                        .select()
                                        .from(todolists)
                                        .where(eq(todolists.userId, userId))
                                        .execute();
            return todolistsTemp;
        } catch (error) {
            throw new Error("Failed to get todolists", { cause: error });
        }
    }

    public async createTodolist(userId: string, title: string) {
        try {
            return await db.insert(todolists).values({
                userId: userId,
                title: title,
            }).returning().execute();
        } catch (error) {
            throw new Error("Failed to create todo", { cause: error });
        }
    }

    public async deleteTodolist(userId: string, id: string) {
        try {
            return await db.delete(todolists).where(
                and(
                    eq(todolists.userId, userId),
                    eq(todolists.id, id)))
                .execute();
        } catch (error) {
            throw new Error("Failed to delete todo", { cause: error });
        }
    }
}
