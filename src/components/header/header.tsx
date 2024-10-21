import Link from "next/link";
import {checkAuthAction} from "@/actions/auth.actions";
import SignOutBtn from "@/components/auth/sign-out-btn";



export default async function Header() {
    const user = await checkAuthAction();


    return <header className={'bg-foreground text-background px-4 py-2'}>

        <nav className={'flex justify-between'}>
            <Link
                href={"/"}
                className={'text-xl'}>TS</Link>

            {user && <Link
                       href={"/todolist"}
                       className={'text-xl'}>Todolist</Link>}


            <div className={'space-x-8'}>
                {!user ? <>
                    <Link href={"/auth/signup"}>S&apos;inscrire</Link>
                    <Link href={"/auth/signin"}>Se connecter</Link></> :
                    <SignOutBtn />}
            </div>

        </nav>
    </header>
}
