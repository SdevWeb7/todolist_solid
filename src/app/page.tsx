import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";


export default async function Home() {


    return <main className={'flex-1 flex flex-col items-center justify-center gap-12'}>


        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Todolist <span
                className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">S.O.L.I.D </span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Réalisation d&apos;une todolist en respectant les principes S.O.L.I.D.</p>


        <Link
            href={"/todolist"}
            className={cn(buttonVariants({
                variant: "default",
                size: "lg",
            }), 'text-3xl py-6')}>C&apos;est parti!</Link>
    </main>;
}
