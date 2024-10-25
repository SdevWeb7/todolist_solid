import {
    boolean,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";



export const users = pgTable("users", {
    createdAt: timestamp("createdAt", {
        mode: "date",
        precision: 3,
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
    email: varchar("email").unique(),
    id: uuid("id").primaryKey().defaultRandom().unique(),
    password: varchar("password"),
    username: varchar("username"),
    updatedAt: timestamp("updatedAt", {
        mode: "date",
        precision: 3,
        withTimezone: true,
    })
        .$onUpdate(() => new Date())
        .notNull(),
});


export const todolists = pgTable("todolists", {
    createdAt: timestamp("createdAt", {
        mode: "date",
        precision: 3,
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
    id: uuid("id").primaryKey().defaultRandom().unique(),
    title: varchar("title").notNull(),
    userId: uuid("userId").references(() => users.id).notNull(),
});



export const todos = pgTable("todos", {
    completed: boolean("completed").default(false).notNull(),
    content: varchar("content").notNull(),
    createdAt: timestamp("createdAt", {
        mode: "date",
        precision: 3,
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
    id: uuid("id").primaryKey().defaultRandom().unique(),
    todolistId: uuid("todolistId").references(() => todolists.id, {
        onDelete: "cascade",
    }).notNull(),
    userId: uuid("userId").references(() => users.id, {
        onDelete: "cascade",
    }).notNull(),
});



export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type TodoInsert = typeof todos.$inferInsert;
export type TodoSelect = typeof todos.$inferSelect;
export type TodolistInsert = typeof todolists.$inferInsert;
export type TodolistSelect = typeof todolists.$inferSelect;
