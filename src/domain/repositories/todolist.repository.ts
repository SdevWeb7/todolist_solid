import { injectable } from "inversify";

import { db } from "@/lib/db/db";
import {TodolistInsert, todolists} from "@/lib/db/schemas";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";



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
            await db.insert(todolists).values({
                userId: userId,
                title: title,
            }).returning().execute();
            revalidatePath("/todolist");
        } catch (error) {
            throw new Error("Failed to create todo", { cause: error });
        }
    }
}
