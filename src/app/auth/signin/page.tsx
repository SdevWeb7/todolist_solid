import SigninForm from "@/components/auth/signin-form";



export default function Page() {

    return <main className={'flex-1 flex flex-col items-center justify-center'}>

        <h1 className={'text-4xl font-bold mb-8'}>Connexion</h1>

        <SigninForm />
    </main>
}
