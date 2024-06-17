"use client";

import React from "react";
import DashboardIcon from "../icons/DashboardIcon";
import MessageIcon from "../icons/MessageIcon";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DoctorSidebar() {
    const pathname = usePathname();
    return (
        <div className="mt-6 flex flex-col p-4 gap-4">
            {[
                {
                    label: "Dashboard",
                    url: "/doctor",
                    icon: <DashboardIcon />,
                },
                {
                    label: "Message",
                    url: "/doctor/message",
                    icon: <MessageIcon />,
                },
            ].map((route, index) => (
                <Button key={index} asChild variant={pathname === route.url ? "default" : "ghost"} className="justify-start">
                    <Link href={route.url} className="flex items-center gap-3">
                        {route.icon}
                        <span>{route.label}</span>
                    </Link>
                </Button>
            ))}
        </div>
    );
}

export default DoctorSidebar;
