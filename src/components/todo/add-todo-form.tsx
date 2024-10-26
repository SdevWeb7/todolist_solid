"use client";

import {useForm} from "react-hook-form";
import {createTodoSchema, TCreateTodoZod} from "@/lib/zod.schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addTodoAction} from "@/actions/todo.actions";


type TAddTodoFormProps = {
    currentTitle: string;
}
export default function AddTodoForm({currentTitle}: TAddTodoFormProps) {
    const form = useForm<TCreateTodoZod>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            content: "",
        },
    })

    const onSubmit = async (data: TCreateTodoZod) => {
        await addTodoAction(currentTitle, data.content);
        form.reset();
    }

    return <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'flex items-center justify-center py-4'}>
            <FormField
                control={form.control}
                name="content"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={'text-center mx-auto block sr-only'}>Votre tâche à ajouter</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={'Votre tâche à ajouter'} {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )} />

            <Button type="submit">Ajouter</Button>
        </form>

    </Form>
}
