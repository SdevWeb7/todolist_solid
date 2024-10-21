"use server";



import {cookies} from "next/headers";
import {getInjection} from "@/lib/di";

export const addTodolistAction = async (title: string) => {
    const token = cookies().get('token')?.value;

    try {
        const todolistController = getInjection('TodolistController');
        await todolistController.createTodolist(token, title);
    } catch (error) {
        console.error('Erreur lors de la création de la todolist :', error);
    }
}