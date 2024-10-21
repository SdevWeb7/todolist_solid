"use client";



import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {signInSchema, TSignInZod} from "@/lib/zod.schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {signInAction} from "@/actions/auth.actions";



export default function SigninForm() {
    const form = useForm<TSignInZod>({
        mode: 'onBlur',
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: TSignInZod) => {
        await signInAction(data);
    }

    return <Form {...form}>

        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'shadow border rounded-xl p-8'}>
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={'Votre adresse e-mail'} {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )} />



            <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem className={'mt-6'}>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                            <Input
                                type={'password'}
                                placeholder={'Votre mot de passe'} {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )} />


            <Button
                type="submit"
                disabled={!form.formState.isValid}
                className={'mt-4 disabled:bg-foreground/70'}>Se connecter</Button>

        </form>
    </Form>
}
