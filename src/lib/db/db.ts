import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


import { env } from "@/lib/env";


import * as schema from "./schemas";



const pool = new Pool({
    connectionString: env.DATABASE_URL,
});


export const db = drizzle(pool, { schema });
