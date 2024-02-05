"use client";

import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import OAuthForm from "./OAuthForm";
import logo from "@/public/assets/img/logo.svg";
import { supabase } from "@/utils/supabase/client";
import { useSession } from "@/context/user";

export default function AuthForm({
    signIn,
    signUp,
}: Readonly<{
    signIn: (formData: FormData) => Promise<void>;
    signUp: (formData: FormData) => Promise<void>;
}>) {

    const { signInWithOAuth } = useSession();

    const handleLoginWithOAuth = (provider: "linkedin" | "google") => {
        signInWithOAuth(provider)
    }    

    return (
        <div className="w-full space-y-5">
            <div className="flex items-center justify-center gap-2">
                <Image
                    src={logo}
                    alt="logo-cyberclaire"
                    className="w-12 h-12"
                />
                <h1 className="text-white text-2xl font-bold">CyberClair3</h1>
            </div>
            <Tabs defaultValue="signin" className="w-full">
                <TabsList className="relative grid w-full grid-cols-2 mb-6 p-1 bg-[#202324] ">
                    <TabsTrigger
                        value="signin"
                        className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                    >
                        Connexion
                    </TabsTrigger>
                    <TabsTrigger
                        value="register"
                        className="relative z-1 group basis-1/2 font-semibold transition-colors hover:text-n-1"
                    >
                        Inscription
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <SignInForm signIn={signIn} />
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm signUp={signUp} />
                </TabsContent>
            </Tabs>
            <div className="flex gap-5">
                <OAuthForm
                    name="Google"
                    onClick={() => handleLoginWithOAuth("google")}
                />
                <OAuthForm
                    name="Linkedin"
                    onClick={() => handleLoginWithOAuth("linkedin")}
                />
            </div>
        </div>
    );
}