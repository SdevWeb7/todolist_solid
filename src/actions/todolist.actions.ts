"use server";



import {cookies} from "next/headers";
import {getInjection} from "@/lib/di";
import {revalidatePath} from "next/cache";

export const addTodolistAction = async (title: string) => {
    const token = cookies().get('token')?.value;

    const todolistController = getInjection('TodolistController');
    await todolistController.createTodolist(token, title);
    revalidatePath('/');
}

export const deleteTodolistAction = async (id: string) => {
    const token = cookies().get('token')?.value;

    const todolistController = getInjection('TodolistController');
    await todolistController.deleteTodolist(token, id);
    revalidatePath('/');
}

export const editTodolistAction = async (id: string, title: string) => {
    const token = cookies().get('token')?.value;

    const todolistController = getInjection('TodolistController');
    await todolistController.editTodolist(token, id, title);
    revalidatePath('/');
}