import {cookies} from "next/headers";
import {getInjection} from "@/lib/di";
import {redirect} from "next/navigation";
import {Input} from "@/components/ui/input";
import {DeleteIcon, Edit3Icon} from "lucide-react";
import AddTodoForm from "@/components/todo/add-todo-form";


export const getTodos = async (todolistName: string | null) => {
    if (!todolistName) return null;

    const token = cookies().get('token')?.value;
    try {
        const todoController = getInjection('TodoController');
        const todos = await todoController.getTodos(token, todolistName);
        return todos;
    } catch (error) {
        console.error('Erreur lors de la récupération des todos :', error);
        redirect('/auth/signin');
    }
}
export default async function TodosBlock({currentTitle}: {currentTitle: string | null}) {
    const todos = await getTodos(currentTitle);


    return <div className={'flex-1 space-y-8 pl-4'}>

        {!currentTitle && <p className={'text-center text-xl my-16'}>Veuillez sélectionner une todolist</p>}


        {currentTitle && <>
                <h2 className={'text-center text-4xl font-bold uppercase'}>{currentTitle}</h2>
                <AddTodoForm />
        </>}

        {currentTitle && todos && todos.length <= 0 && <p className={'text-center text-xl my-16'}>Aucune tâche pour le moment</p>}

        {currentTitle && todos && todos.length > 0 && <ul className={'space-y-2'}>
            {todos.map((todo) => (
                <li
                    className={'w-full flex justify-between items-center gap-2 rounded border'}
                    key={todo.id}>

                    <Input
                        className={'w-6 h-6'}
                        type="checkbox"
                        checked={todo.completed} />
                    <p className={'flex-1 text-center'}>{todo.content}</p>

                    <Edit3Icon />
                    <DeleteIcon />
                </li>
            ))}
        </ul>}

    </div>;
}
