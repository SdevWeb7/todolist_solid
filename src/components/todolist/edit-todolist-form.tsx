"use client";

import {useForm} from "react-hook-form";
import {createTodolistSchema, TEditTodolistZod} from "@/lib/zod.schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {editTodolistAction} from "@/actions/todolist.actions";
import {useRouter, useSearchParams} from "next/navigation";



export default function EditTodolistForm({title, id}: {title: string, id: string}) {
    const form = useForm<TEditTodolistZod>({
        resolver: zodResolver(createTodolistSchema),
        defaultValues: {
            title: title,
        },
    })
    const router = useRouter();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(Array.from(searchParams.entries()));

    const onSubmit = async (data: TEditTodolistZod) => {
        await editTodolistAction(id, data.title);
        params.set('currentEditing', "done");
        if (params.has('currentTitle')) {
            params.set('currentTitle', data.title);
        }
        router.push(`/todolist?${params.toString()}`);

    }

    return <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'flex items-center justify-center'}>
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={'text-center mx-auto block mt-4 sr-only'}>Modifier une todolist</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={'Nouveau nom'} {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )} />

            <Button type="submit">Modifier</Button>
        </form>

    </Form>
}
