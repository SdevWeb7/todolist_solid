"use server";


import {signInSchema, signUpSchema, TSignInZod, TSignUpZod} from "@/lib/zod.schemas";
import {getInjection} from "@/lib/di";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import {env} from "@/lib/env";



export const checkAuthAction = async () => {
    try {
        const token = cookies().get('token')?.value;

        const authController = getInjection("AuthController");
        return await authController.verifyToken(token);
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification :', error);
        return null;
    }
};


export const signUpAction = async (input: TSignUpZod) => {
    const {data: safeData, error} = signUpSchema.safeParse(input);
    if (error) throw new Error("invalide data", { cause: error.errors });

    const authController = getInjection("AuthController");

    try {
        const token =  await authController.signUp(safeData);

        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 3600 * 24 * 7,
        });
        return token;
    } catch (error) {
        console.error(error);
        throw new Error("La connexion entre la server action et le controller a échoué", { cause: error });
    }
};



export const signInAction = async (input: TSignInZod) => {
    const {data: safeData, error} = signInSchema.safeParse(input);
    if (error) throw new Error("invalide data", { cause: error.errors });

    const authController = getInjection("AuthController");

    try {
        const user =  await authController.signIn(safeData.email, safeData.password);
        const token = jwt.sign( user, env.JWT_SECRET, { expiresIn: '1h' });

        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: true,
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("La connexion entre la server action et le controller a échoué", { cause: error });
    }
};

export const signOutAction = async () => {
    try {
        cookies().delete('token');
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error("La déconnexion a échoué", { cause: error });
    }
}