"use client";


import {DeleteIcon} from "lucide-react";
import {deleteTodolistAction} from "@/actions/todolist.actions";
import {cn} from "@/lib/utils";



type DeleteTodolistBtnProps = {
    id: string;
    className?: string;
}
export default function DeleteTodolistBtn({id, className}: DeleteTodolistBtnProps) {

    const onDeleteTodolist = async (id: string) => {
        await deleteTodolistAction(id);
    }

    return <DeleteIcon
                    onClick={() => onDeleteTodolist(id)}
                    className={cn('cursor-pointer', className)} />

}
