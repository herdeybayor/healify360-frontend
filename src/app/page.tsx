import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-screen justify-center items-center">
            <ModeToggle />
            <Button asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
        </main>
    );
}
