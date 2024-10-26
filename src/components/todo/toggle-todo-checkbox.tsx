"use client";

import {Checkbox} from "@/components/ui/checkbox";
import {toggleTodoAction} from "@/actions/todo.actions";


type TTodolist = {
    todoId: string;
    checked: boolean;
}
export default function ToggleTodoCheckbox({todoId, checked}: TTodolist) {

    const onToggle = async () => {
        console.log('todoId', todoId);
        await toggleTodoAction(todoId, checked);
    }


    return <Checkbox
                onClick={onToggle}
                className={'cursor-pointer'}
                checked={checked} />
}
