import { ContainerModule, interfaces } from "inversify";

import { DI_SYMBOLS } from "@/lib/di/types";
import { env } from "@/lib/env";
import {AuthService} from "@/domain/services/auth.service";
import {AuthController} from "@/domain/controllers/auth.controller";
import {AuthRepository} from "@/domain/repositories/auth.repository";
import {AuthRepositoryInterface} from "@/domain/repositories/auth.repository.interface";



const initializeModule = (bind: interfaces.Bind) => {
    if (env.NODE_ENV === "test") {
        // Mocks
    } else {
        bind<AuthService>(DI_SYMBOLS.AuthService).to(AuthService);
        bind<AuthController>(DI_SYMBOLS.AuthController).to(AuthController);
        bind<AuthRepositoryInterface>(DI_SYMBOLS.AuthRepository).to(AuthRepository);
    }
};

export const AuthModule = new ContainerModule(initializeModule);
