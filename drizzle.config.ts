import {type Config, defineConfig } from "drizzle-kit";

import { env } from "@/lib/env";

export default defineConfig({
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
    dialect: "postgresql",
    out: "./src/lib/db/migrations",
    schema: "./src/lib/db/schemas.ts",
}) satisfies Config;
