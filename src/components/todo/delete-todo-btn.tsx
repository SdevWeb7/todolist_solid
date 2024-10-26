"use client";

import {DeleteIcon} from "lucide-react";
import {deleteTodoAction} from "@/actions/todo.actions";



export default function DeleteTodoBtn({todoId}: {todoId: string}) {


    const onDelete = async () => {
        await deleteTodoAction(todoId);
    }


    return <DeleteIcon
                    className={'cursor-pointer'}
                    onClick={onDelete} />
}
