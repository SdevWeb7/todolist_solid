import { ContainerModule, interfaces } from "inversify";

import { DI_SYMBOLS } from "@/lib/di/types";
import { env } from "@/lib/env";
import { TodoController } from "@/domain/controllers/todo.controller";
import { TodoRepository } from "@/domain/repositories/todo.repository";
import { TodoService } from "@/domain/services/todo.service";



const initializeModule = (bind: interfaces.Bind) => {
    if (env.NODE_ENV === "test") {
        // Mocks
    } else {
        bind<TodoService>(DI_SYMBOLS.TodoService).to(TodoService);
        bind<TodoRepository>(DI_SYMBOLS.TodoRepository).to(TodoRepository);
        bind<TodoController>(DI_SYMBOLS.TodoController).to(TodoController);
    }
};

export const TodoModule = new ContainerModule(initializeModule);
