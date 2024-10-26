"use server";



import {cookies} from "next/headers";
import {getInjection} from "@/lib/di";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export const addTodoAction = async (todolistTitle: string, content: string) => {

    const token = cookies().get('token')?.value;
    try {
        const todoController = getInjection('TodoController');
        await todoController.addTodo(token, todolistTitle, content);
        revalidatePath('/todolist');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche :', error);
        redirect('/auth/signin');
    }
}


export const deleteTodoAction = async (todoId: string) => {
        const token = cookies().get('token')?.value;
        try {
            const todoController = getInjection('TodoController');
            await todoController.deleteTodo(token, todoId);
            revalidatePath('/todolist');
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
            redirect('/auth/signin');
        }
}

export const toggleTodoAction = async (todoId: string, checked: boolean) => {
    const token = cookies().get('token')?.value;
    try {
        const todoController = getInjection('TodoController');
        await todoController.toggleTodo(token, todoId, checked);
        revalidatePath('/todolist');
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error);
        redirect('/auth/signin');
    }
}