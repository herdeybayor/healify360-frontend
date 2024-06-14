import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex h-screen justify-center items-center">
            <ModeToggle />
            <Button>Get Started</Button>
        </main>
    );
}
