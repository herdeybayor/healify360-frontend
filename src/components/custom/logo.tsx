import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface LogoProps {
    href?: string;
    className?: string;
}

function Logo({ href = "/", className }: LogoProps) {
    return (
        <Link href={href} className={cn("cursor-pointer", className)}>
            <div className="items-center gap-3 flex">
                <Image src="/logo.png" alt="logo" width={64} height={64} />
                <h1 className="font-caveatSans text-2xl text-[#008037]">Healify360</h1>
            </div>
        </Link>
    );
}

export default Logo;
