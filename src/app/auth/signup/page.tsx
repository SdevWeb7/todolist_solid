"use client";

import SignupForm from "@/components/auth/signup-form";


export default function Page() {


    return <main className={'flex-1 flex flex-col items-center justify-center'}>

        <h1 className={'text-4xl font-bold mb-8'}>Inscription</h1>
        <SignupForm />
    </main>
}
