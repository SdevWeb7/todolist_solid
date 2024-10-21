import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";


export default async function Home() {


    return <main className={'flex-1 flex flex-col items-center justify-center gap-12'}>

        <h1 className={'text-6xl font-bold text-balance text-center'}>Todolist S.O.L.I.D.</h1>

        <Link
            href={"/todolist"}
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "text-3xl py-8"
            })}>C&apos;est parti!</Link>
  </main>;
}
