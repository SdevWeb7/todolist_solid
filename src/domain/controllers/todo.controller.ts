import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/lib/di/types";
import { TodoService } from "@/domain/services/todo.service";
import {AuthService} from "@/domain/services/auth.service";



@injectable()
export class TodoController {
    constructor(
        @inject(DI_SYMBOLS.TodoService)
        private readonly todoService: TodoService,
        @inject(DI_SYMBOLS.AuthService)
        private readonly authService: AuthService,
    ) {}

    async getTodos(token: string | undefined, todolistName: string) {
        const user = await this.authService.verifyToken(token);

        return this.todoService.getTodos(user.id, todolistName);
    }

    async addTodo(token: string | undefined, todolistTitle: string, content: string) {
        const user = await this.authService.verifyToken(token);

        return this.todoService.addTodo(user.id, todolistTitle, content);
    }

    async deleteTodo(token: string | undefined, todoId: string) {
        const user = await this.authService.verifyToken(token);

        return this.todoService.deleteTodo(user.id, todoId);
    }

    async toggleTodo(token: string | undefined, todoId: string, checked: boolean) {
        const user = await this.authService.verifyToken(token);

        return this.todoService.toggleTodo(user.id, todoId, checked);
    }
}
