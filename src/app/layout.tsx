import type { Metadata } from "next";
import { Inter as FontSans, Caveat_Brush as CaveatSans, Chakra_Petch as Petch } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ReactQueryClientProvider } from "@/components/provider/react-query-client-provider";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontCaveatSans = CaveatSans({
    subsets: ["latin"],
    variable: "--font-caveat-sans",
    weight: "400",
});
const fontPetch = Petch({
    subsets: ["latin"],
    variable: "--font-petch",
    weight: "600",
});

export const metadata: Metadata = {
    title: "Healify360",
    description: "Your Gateway to Convenient, High-Quality Healthcare. Join us today and connect with certified doctors for seamless, remote consultations.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn("font-sans", fontSans.variable, fontCaveatSans.variable, fontPetch.variable)}>
                <ReactQueryClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </ReactQueryClientProvider>
            </body>
        </html>
    );
}
