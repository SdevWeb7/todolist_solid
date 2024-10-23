"use client";


import Link from "next/link";
import {EditIcon} from "lucide-react";
import {useSearchParams} from "next/navigation";


type EditTodolistBtnProps = {
    title: string;
}
export default function EditTodolistBtn({title}: EditTodolistBtnProps) {
    const searchParams = useSearchParams();

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('currentEditing', title);



    return <Link href={`/todolist?${params.toString()}`}>
        <EditIcon className={'cursor-pointer'} />
    </Link>
}
