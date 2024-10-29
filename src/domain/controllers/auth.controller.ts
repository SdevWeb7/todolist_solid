import {inject, injectable} from "inversify";
import {AuthService} from "@/domain/services/auth.service";
import {DI_SYMBOLS} from "@/lib/di/types";
import {signUpSchema, TSignUpZod} from "@/lib/zod.schemas";
import {UserSelect} from "@/lib/db/schemas";


@injectable()
export class AuthController {
    constructor(
        @inject(DI_SYMBOLS.AuthService)
        private readonly authService: AuthService,
    ) {}


    public async verifyToken(token: string | undefined): Promise<UserSelect | null> {
        try {
            return await this.authService.verifyToken(token);
        } catch (error) {
            throw new Error('Invalid token', {
                cause: error
            });
        }
    }

    public async signUp(input: TSignUpZod): Promise<string> {
        const {data, error} = signUpSchema.safeParse(input);
        if (error) throw new Error("invalide data", { cause: error.errors });

        try {
            return await this.authService.signUp(data);
        } catch (error) {
            throw new Error("La connexion entre le controller et le service a échoué", { cause: error });
        }
    }

    public async signIn(email: string, password: string): Promise<UserSelect> {
        try {
            return await this.authService.signIn(email, password);
        } catch (error) {
            throw new Error("La connexion entre le controller et le service a échoué", {cause: error});
        }
    }
}