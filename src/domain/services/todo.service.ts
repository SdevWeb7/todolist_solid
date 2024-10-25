import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/lib/di/types";
import { TodoRepository } from "@/domain/repositories/todo.repository";



@injectable()
export class TodoService {
    constructor(
        @inject(DI_SYMBOLS.TodoRepository)
        private readonly todoRepository: TodoRepository,
    ) {}

    async getTodos(userId: string, todolistName: string) {
        const [todolist] = await this.todoRepository.getTodolistByName(userId, todolistName);
        return this.todoRepository.getTodos(userId, todolist.id);
    }
}
