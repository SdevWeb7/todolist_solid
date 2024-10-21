import { Container } from "inversify";

import { env } from "@/lib/env";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/lib/di/types";
import { TodoModule } from "@/lib/di/modules/todo.module";
import { AuthModule } from "@/lib/di/modules/auth.module";
import {TodolistModule} from "@/lib/di/modules/todolist.module";


const ApplicationContainer = new Container({
    defaultScope: "Singleton",
});

export const initializeContainer = () => {
    ApplicationContainer.load(AuthModule);
    ApplicationContainer.load(TodolistModule);
    ApplicationContainer.load(TodoModule);

};

export const destroyContainer = () => {
    ApplicationContainer.unload(AuthModule);
    ApplicationContainer.unload(TodolistModule);
    ApplicationContainer.unload(TodoModule);
};

if (env.NODE_ENV !== "test") {
    initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K,
): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
