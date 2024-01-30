import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

import AuthForm from "@/components/login/AuthForm";

export default function Login({
    searchParams,
}: Readonly<{
    searchParams: { message: string };
}>) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect(
                "/login?message=Ce compte n'existe pas, veuillez vous inscrire ou réessayer."
            );
        }

        return redirect("/dashboard");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const first_name = formData.get("first_name") as string;
        const last_name = formData.get("last_name") as string;
        const password = formData.get("password") as string;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { first_name: first_name, last_name: last_name },
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });


        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect(
            "/login?message=Check email to continue sign in process"
        );
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 border-2 border-cyberBorder rounded-xl p-6">
                <AuthForm signIn={signIn} signUp={signUp} />
                {searchParams?.message && (
                    <p className="mt-4 p-2 bg-foreground/10 text-foreground text-center text-sm">
                        {searchParams.message}
                    </p>
                )}
            </div>
        </div>
    );
}
