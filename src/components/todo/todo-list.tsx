"use client";

import TodoItem from "@/components/todo/todo-item";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {cn} from "@/lib/utils";


type TodoListProps = {
    todos: {
        id: string,
        content: string,
        completed: boolean
    }[] | null,
    currentTitle: string | null
}
export default function TodoList({todos, currentTitle}: TodoListProps) {
    const [filter, setFilter] = useState('all');


    const filteredTodos = !todos ? [] : todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'uncompleted') return !todo.completed;
        return todo;
    });

    return  <>

        {currentTitle && filteredTodos && filteredTodos.length <= 0 && <p className={'text-center text-xl my-16'}>Aucune tâche pour le moment</p>}

        {currentTitle && filteredTodos && filteredTodos.length > 0 && <ul className={'space-y-2 mt-8'}>
            {filteredTodos.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </ul>}



        <div className={'flex gap-4 mt-auto mx-auto'}>

            <Button
                onClick={() => setFilter('all')}
                className={cn('border bg-background text-foreground hover:bg-foreground hover:text-background', {
                    'w-1/3': true,
                    'bg-foreground text-background': filter === 'all',
                })}>Toutes</Button>

            <Button
                onClick={() => setFilter('completed')}
                className={cn('border bg-background text-foreground hover:bg-foreground hover:text-background', {
                    'w-1/3': true,
                    'bg-foreground text-background': filter === 'completed',
                })}>Terminées</Button>

            <Button
                onClick={() => setFilter('uncompleted')}
                className={cn('border bg-background text-foreground hover:bg-foreground hover:text-background', {
                    'w-1/3': true,
                    'bg-foreground text-background': filter === 'uncompleted',
                })}>Non terminées</Button>
        </div>

    </>
}
