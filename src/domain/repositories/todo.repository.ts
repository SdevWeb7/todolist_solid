import { injectable } from "inversify";

import { db } from "@/lib/db/db";
import { TodoInsert, todos } from "@/lib/db/schemas";



@injectable()
export class TodoRepository {


    public async create(data: TodoInsert): Promise<TodoInsert> {
        try {
            const [todo] = await db.insert(todos).values(data).returning().execute();
            return todo;
        } catch (error) {
            throw new Error("Failed to create todo", { cause: error });
        }
    }
}
