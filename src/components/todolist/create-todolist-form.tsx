"use client";

import {useForm} from "react-hook-form";
import {createTodolistSchema, TCreateTodolistZod} from "@/lib/zod.schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addTodolistAction} from "@/actions/todolist.actions";



export default function CreateTodolistForm() {
    const form = useForm<TCreateTodolistZod>({
        resolver: zodResolver(createTodolistSchema),
        defaultValues: {
            title: "",
        },
    })

    const onSubmit = async (data: TCreateTodolistZod) => {
        await addTodolistAction(data.title);
    }

    return <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'flex items-center justify-center border-b border-black mb-6'}>
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={'text-center mx-auto block mt-4 sr-only'}>Ajouter une todolist</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={'Le nom de votre todolist'} {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )} />

            <Button type="submit">Créer</Button>
        </form>

    </Form>
}
