import {injectable} from "inversify";
import {db} from "@/lib/db/db";
import {users, UserSelect} from "@/lib/db/schemas";
import {TSignUpZod} from "@/lib/zod.schemas";
import bcrypt from 'bcryptjs';
import {eq} from "drizzle-orm";



@injectable()
export class AuthRepository {
    constructor() {}


    public async signUp(data: TSignUpZod): Promise<UserSelect> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const [user] = await db.insert(users).values(
                {
                    ...data,
                    password: hashedPassword,
                }
            ).returning().execute();

            return user;
        } catch (error) {
            throw new Error("L'insertion en base de données a échoué", {cause: error});
        }
    }

    public async getUserByEmail(email: string): Promise<UserSelect> {
        try {
            const [user] = await db.select().from(users).where(eq(users.email, email)).execute();
            return user;
        } catch (error) {
            throw new Error("La requête a échoué.", { cause: error });
        }
    }

}


