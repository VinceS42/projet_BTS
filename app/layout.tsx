import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { figtree } from "@/components/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import UserProvider from "@/context/user";

export const metadata: Metadata = {
    title: "Cyberclair3",
    description: "",
    icons: {
        icon: "/assets/img/Nico.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${figtree.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UserProvider>{children}</UserProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
