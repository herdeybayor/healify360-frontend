import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface LogoProps {
    href?: string;
}

function Logo({ href = "/" }: LogoProps) {
    return (
        <Link href={href}>
            <div className="items-center gap-3 flex md:hidden">
                <Image src="/logo.png" alt="logo" width={32} height={32} />
                <h1 className="font-caveatSans text-2xl text-[#008037]">Projectxx</h1>
            </div>
        </Link>
    );
}

export default Logo;
