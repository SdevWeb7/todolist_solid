import {cookies} from "next/headers";
import {getInjection} from "@/lib/di";
import {redirect} from "next/navigation";
import AddTodoForm from "@/components/todo/add-todo-form";
import TodoList from "@/components/todo/todo-list";


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


    return <div className={'flex-1 flex flex-col pl-4'}>

        {!currentTitle && <p className={'text-center text-xl my-16'}>Veuillez sélectionner une todolist</p>}


        {currentTitle && <>
                <h2 className={'text-center text-3xl font-bold'}>Todolist: {currentTitle}</h2>
                <AddTodoForm currentTitle={currentTitle} />
        </>}


       <TodoList todos={todos} currentTitle={currentTitle} />
    </div>;
}
