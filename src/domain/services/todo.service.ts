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

    async addTodo(userId: string, todolistTitle: string, content: string) {
        const [todolist] = await this.todoRepository.getTodolistByName(userId, todolistTitle);
        return this.todoRepository.addTodo(userId, todolist.id, content);
    }

    async deleteTodo(userId: string, todoId: string) {
        return this.todoRepository.deleteTodo(userId, todoId);
    }

    async toggleTodo(userId: string, todoId: string, checked: boolean) {
        return this.todoRepository.toggleTodo(userId, todoId, checked);
    }
}
