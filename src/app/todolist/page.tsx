import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";
import {getInjection} from "@/lib/di";
import TodosBlock from "@/components/todo/todos-block";
import Link from "next/link";
import CreateTodolistForm from "@/components/todolist/create-todolist-form";
import DeleteTodolistBtn from "@/components/todolist/delete-todolist-btn";
import EditTodolistBtn from "@/components/todolist/edit-todolist-btn";


const getTodolist = async () => {
    const token = cookies().get('token')?.value;

    try {
        const todolistController = getInjection('TodolistController');
        const todolists = await todolistController.getTodolists(token);
        return todolists;
    } catch (error) {
        console.error('Erreur lors de la récupération des todolists :', error);
        redirect('/');
    }
}

type TodolistPageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
export default async function Page({searchParams}: TodolistPageProps) {
    const todolists = await getTodolist();

    const headersList = headers();
    console.log(headersList);


    return <main className={'flex-1 px-4'}>

        <h1 className={'text-center text-4xl font-bold mt-16'}>Todolists</h1>


        <section className={'md:flex border shadow mt-16 min-h-80 p-4 space-y-8'}>
            <div className={'border-r pr-4'}>
                <h2 className={'text-center underline text-lg'}>Mes todolists</h2>

                <CreateTodolistForm />

                <ul className={'space-y-2'}>
                    {todolists.map((todolist) => (
                        <li
                            className={'w-full flex justify-between items-center'}
                            key={todolist.id}>
                            <Link
                                className={'px-6 py-2 bg-foreground text-background rounded-xl text-xl block max-w-[50%]'}
                                href={`/todolist/?currentTitle=${todolist.title}`}>{todolist.title}</Link>

                            <EditTodolistBtn title={todolist.title as string} />

                            <DeleteTodolistBtn id={todolist.id} />
                        </li>
                    ))}
                </ul>
            </div>

            <TodosBlock
                currentTitle={searchParams.currentTitle as string || null} />
        </section>



    </main>
}
