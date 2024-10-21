import {z} from "zod";


export const signInSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse email valide"),
    password: z.string().min(6, "Minimum 6 caractères").max(40, "Maximum 40 caractères"),
});

export const signUpSchema = signInSchema.extend({
    username: z.string().min(3, "Minimum 3 caractères").max(30, "Maximum 30 caractères"),
});


export const createTodolistSchema = z.object({
    title: z.string().min(3, "Minimum 3 caractères").max(30, "Maximum 30 caractères"),
});




export type TSignInZod = z.infer<typeof signInSchema>;
export type TSignUpZod = z.infer<typeof signUpSchema>;
export type TCreateTodolistZod = z.infer<typeof createTodolistSchema>;