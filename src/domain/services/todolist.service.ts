import { inject, injectable } from "inversify";
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

    public async createTodolist(userId: string, title: string) {
        return await this.todolistRepository.createTodolist(userId, title);
    }

    public async deleteTodolist(userId: string, id: string) {
        return await this.todolistRepository.deleteTodolist(userId, id);
    }

    public async editTodolist(userId: string, id: string, title: string) {
        return await this.todolistRepository.editTodolist(userId, id, title);
    }
}
