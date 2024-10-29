import { TodoController } from "@/domain/controllers/todo.controller";
import { TodoRepository } from "@/domain/repositories/todo.repository";
import { TodoService } from "@/domain/services/todo.service";
import {AuthService} from "@/domain/services/auth.service";
import {AuthController} from "@/domain/controllers/auth.controller";
import {TodolistController} from "@/domain/controllers/todolist.controller";
import {TodolistService} from "@/domain/services/todolist.service";
import {TodolistRepository} from "@/domain/repositories/todolist.repository";
import {AuthRepositoryInterface} from "@/domain/repositories/auth.repository.interface";

export const DI_SYMBOLS = {
    TodoController: Symbol.for("TodoController"),
    TodoRepository: Symbol.for("TodoRepository"),
    TodoService: Symbol.for("TodoService"),
    AuthService: Symbol.for("AuthService"),
    AuthController: Symbol.for("AuthController"),
    AuthRepository: Symbol.for("AuthRepository"),
    TodolistController: Symbol.for("TodolistController"),
    TodolistService: Symbol.for("TodolistService"),
    TodolistRepository: Symbol.for("TodolistRepository"),
};

export interface DI_RETURN_TYPES {
    TodoService: TodoService;
    TodoRepository: TodoRepository;
    TodoController: TodoController;
    AuthService: AuthService;
    AuthController: AuthController;
    AuthRepository: AuthRepositoryInterface;
    TodolistController: TodolistController;
    TodolistService: TodolistService;
    TodolistRepository: TodolistRepository;
}
