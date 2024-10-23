import {inject, injectable} from "inversify";
import {DI_SYMBOLS} from "@/lib/di/types";
import {AuthRepository} from "@/domain/repositories/auth.repository";
import {TSignUpZod} from "@/lib/zod.schemas";
import {UserSelect} from "@/lib/db/schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {env} from "@/lib/env";


@injectable()
export class AuthService {
    constructor(
        @inject(DI_SYMBOLS.AuthRepository)
        private readonly authRepository: AuthRepository,
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


    public async verifyToken(token: string | undefined): Promise<UserSelect> {
        if (!token) throw new Error('Token is required');
        return jwt.verify(token, env.JWT_SECRET) as UserSelect;
    }
}
