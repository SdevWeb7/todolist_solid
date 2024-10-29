import {inject, injectable} from "inversify";
import {DI_SYMBOLS} from "@/lib/di/types";
import {TSignUpZod} from "@/lib/zod.schemas";
import {UserSelect} from "@/lib/db/schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {env} from "@/lib/env";
import type {AuthRepositoryInterface} from "@/domain/repositories/auth.repository.interface";


@injectable()
export class AuthService {
    constructor(
        @inject(DI_SYMBOLS.AuthRepository)
        private readonly authRepository: AuthRepositoryInterface,
    ) {}


    public async signUp(data: TSignUpZod): Promise<string> {
        const user = await this.authRepository.getUserByEmail(data.email);
        if (user) throw new Error('User already exists');

        const datas = await this.authRepository.signUp(data);
        const token = jwt.sign({
            ...datas,
            password: undefined
        }, env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    public async signIn(email: string, password: string): Promise<UserSelect> {
        try {
            const user = await this.authRepository.getUserByEmail(email);
            if (!user) throw new Error('Invalid credentials');

            const isPasswordValid = bcrypt.compare(password, user.password!);

            if (!isPasswordValid) throw new Error('Invalid credentials');

            return {
                ...user,
                password: null
            };
        } catch (error) {
            throw new Error("La connexion entre le service et le repository a eu un problème", { cause: error });
        }
    }


    public async verifyToken(token: string | undefined): Promise<UserSelect | null> {
        try {
            if (!token) throw new Error('Token is required');
            return jwt.verify(token, env.JWT_SECRET) as UserSelect;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
