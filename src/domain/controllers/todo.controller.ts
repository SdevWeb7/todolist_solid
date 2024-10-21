import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/lib/di/types";
import { TodoService } from "@/domain/services/todo.service";



@injectable()
export class TodoController {
    constructor(
        @inject(DI_SYMBOLS.TodoService)
        private readonly todoService: TodoService,
    ) {}

}
