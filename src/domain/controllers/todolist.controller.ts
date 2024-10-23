import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/lib/di/types";
import {AuthService} from "@/domain/services/auth.service";
import {TodolistService} from "@/domain/services/todolist.service";



@injectable()
export class TodolistController {
    constructor(
        @inject(DI_SYMBOLS.TodolistService)
        private readonly todolistService: TodolistService,
        @inject(DI_SYMBOLS.AuthService)
        private readonly authService: AuthService,
    ) {}


    public async getTodolists(token: string | undefined) {
        const user = await this.authService.verifyToken(token);
        return this.todolistService.getTodolists(user.id);
    }

    public async createTodolist(token: string | undefined, title: string) {
        const user = await this.authService.verifyToken(token);
        return this.todolistService.createTodolist(user.id, title);
    }

    public async deleteTodolist(token: string | undefined, id: string) {
        const user = await this.authService.verifyToken(token);
        return this.todolistService.deleteTodolist(user.id, id);
    }
}
