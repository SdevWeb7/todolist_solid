import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {getInjection} from "@/lib/di";
import TodosBlock from "@/components/todo/todos-block";
import Link from "next/link";
import CreateTodolistForm from "@/components/todolist/create-todolist-form";
import DeleteTodolistBtn from "@/components/todolist/delete-todolist-btn";
import EditTodolistBtn from "@/components/todolist/edit-todolist-btn";
import {TodolistSelect} from "@/lib/db/schemas";
import EditTodolistForm from "@/components/todolist/edit-todolist-form";
import {cn} from "@/lib/utils";


const getTodolist = async (): Promise<TodolistSelect[]> => {
    const token = cookies().get('token')?.value;

    try {
        const todolistController = getInjection('TodolistController');
        const todolists = await todolistController.getTodolists(token);
        return todolists;
    } catch (error) {
        console.error('Erreur lors de la récupération des todolists :', error);
        redirect('/auth/signin');
    }
}

type TodolistPageProps = {
    searchParams: {
        [key: string]: string | undefined;
    };
}
export default async function Page({searchParams}: TodolistPageProps) {
    const todolists = await getTodolist();

    return <main className={'flex-1 px-4'}>

        <h1 className={'text-center text-4xl font-bold my-8'}>Todolists</h1>


        <section className={'md:flex border shadow mt-16 min-h-80 p-4 space-y-8 md:space-y-0'}>
            <div className={'border-r pr-4'}>
                <h2 className={'text-center underline text-xl'}>Mes todolists</h2>

                <CreateTodolistForm />

                <ul className={'space-y-2'}>
                    {todolists.map((todolist) => (
                        <li
                            className={cn('w-full flex items-center gap-2 rounded border', {
                                'bg-foreground text-background': searchParams.currentTitle === todolist.title,
                            })}
                            key={todolist.id}>

                            {searchParams.currentEditing === todolist.title ?
                                <EditTodolistForm title={todolist.title} id={todolist.id} /> :
                                <Link
                                    className={'py-2 px-3 text-xl flex-1'}
                                    href={`/todolist/?currentTitle=${todolist.title}`}>{todolist.title}</Link>}


                            {searchParams.currentEditing !== todolist.title && (
                                <EditTodolistBtn
                                        className={'ml-auto'}
                                        title={todolist.title} />)}

                            <DeleteTodolistBtn
                                        className={'pr-2 h-8 w-8'}
                                        id={todolist.id} />
                        </li>
                    ))}
                </ul>
            </div>

            <TodosBlock
                currentTitle={searchParams.currentTitle || null} />
        </section>



    </main>
}
