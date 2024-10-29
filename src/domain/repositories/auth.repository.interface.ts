import {TSignUpZod} from "@/lib/zod.schemas";
import {UserSelect} from "@/lib/db/schemas";


export interface AuthRepositoryInterface {
    signUp(data: TSignUpZod): Promise<UserSelect>;
    getUserByEmail(email: string): Promise<UserSelect>;
}