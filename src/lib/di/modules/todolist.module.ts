import { ContainerModule, interfaces } from "inversify";

import { DI_SYMBOLS } from "@/lib/di/types";
import { env } from "@/lib/env";
import {TodolistService} from "@/domain/services/todolist.service";
import {TodolistRepository} from "@/domain/repositories/todolist.repository";
import {TodolistController} from "@/domain/controllers/todolist.controller";



const initializeModule = (bind: interfaces.Bind) => {
    if (env.NODE_ENV === "test") {
        // Mocks
    } else {
        bind<TodolistService>(DI_SYMBOLS.TodolistService).to(TodolistService);
        bind<TodolistRepository>(DI_SYMBOLS.TodolistRepository).to(TodolistRepository);
        bind<TodolistController>(DI_SYMBOLS.TodolistController).to(TodolistController);
    }
};

export const TodolistModule = new ContainerModule(initializeModule);
