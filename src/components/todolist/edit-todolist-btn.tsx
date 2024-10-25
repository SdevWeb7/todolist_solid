"use client";


import Link from "next/link";
import {Edit3Icon} from "lucide-react";
import {useSearchParams} from "next/navigation";


type EditTodolistBtnProps = {
    title: string;
    className?: string;
}
export default function EditTodolistBtn({title, className}: EditTodolistBtnProps) {
    const searchParams = useSearchParams();

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('currentEditing', title);



    return <Link
                className={className}
                href={`/todolist?${params.toString()}`}>
        <Edit3Icon className={'cursor-pointer'} />
    </Link>
}
