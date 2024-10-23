"use server";


import {signInSchema, signUpSchema, TSignInZod, TSignUpZod} from "@/lib/zod.schemas";
import {getInjection} from "@/lib/di";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import {env} from "@/lib/env";
import {redirect} from "next/navigation";



export const checkAuthAction = async () => {
    try {
        const token = cookies().get('token')?.value;

        const authController = getInjection("AuthController");
        return await authController.verifyToken(token);
    } catch (error) {
        console.error("La vérification du token a échoué", { cause: error });
        return null;
    }
};


export const signUpAction = async (input: TSignUpZod) => {
    const authController = getInjection("AuthController");

    const token =  await authController.signUp(input);

    cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 3600 * 24 * 7,
    });
    redirect('/todolist');
};



export const signInAction = async (input: TSignInZod) => {
    const {data: safeData, error} = signInSchema.safeParse(input);
    if (error) throw new Error("invalide data", { cause: error.errors });

    const authController = getInjection("AuthController");

    const user =  await authController.signIn(safeData.email, safeData.password);
    const token = jwt.sign( user, env.JWT_SECRET, { expiresIn: '1h' });

    cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: true,
    });
    redirect('/todolist');
};

export const signOutAction = async () => {
    try {
        cookies().delete('token');
        return { success: true };
    } catch (error) {
        throw new Error("La déconnexion a échoué", { cause: error });
    }
}