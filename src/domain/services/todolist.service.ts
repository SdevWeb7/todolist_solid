import { inject, injectable } from "inversify";
import {TodolistInsert} from "@/lib/db/schemas";
import { DI_SYMBOLS } from "@/lib/di/types";
import {TodolistRepository} from "@/domain/repositories/todolist.repository";



@injectable()
export class TodolistService {
    constructor(
        @inject(DI_SYMBOLS.TodolistRepository)
        private readonly todolistRepository: TodolistRepository,
    ) {}

    public async getTodolists(userId: string) {
        return this.todolistRepository.getTodolists(userId);
    }

    public async createTodolist(userId: string, title: string): Promise<TodolistInsert> {
        return await this.todolistRepository.createTodolist(userId, title);
    }
}
