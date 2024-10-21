"use client";


import {signOutAction} from "@/actions/auth.actions";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";



export default function SignOutBtn() {
    const router = useRouter();

    return <Link
            href={"/"}
            onClick={async(e) => {
                e.preventDefault();
                const success = await signOutAction();
                if (success) router.push('/?disconnected=true');
                else toast({description: 'Erreur lors de la déconnexion'});
            }}>Se déconnecter</Link>
}
