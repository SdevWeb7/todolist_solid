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

}
