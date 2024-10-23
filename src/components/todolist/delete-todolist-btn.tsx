"use client";


import {DeleteIcon} from "lucide-react";
import {deleteTodolistAction} from "@/actions/todolist.actions";



type DeleteTodolistBtnProps = {
    id: string;
}
export default function DeleteTodolistBtn({id}: DeleteTodolistBtnProps) {

    const onDeleteTodolist = async (id: string) => {
        await deleteTodolistAction(id);
    }

    return <DeleteIcon
                    onClick={() => onDeleteTodolist(id)}
                    className={'cursor-pointer'} />

}
