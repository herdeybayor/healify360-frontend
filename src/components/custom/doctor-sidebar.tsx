"use client";

import useUser from "@/hooks/use-user";
import { FileClock, Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Button } from "../ui/button";

function DoctorSidebar() {
    const { user } = useUser();
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                label: "Dashboard",
                url: "/doctor",
                icon: <Home />,
            },
            ...(user?.is_onboarding_complete === false
                ? [
                      {
                          label: "Onboarding",
                          url: "/doctor/onboarding",
                          icon: <FileClock />,
                      },
                  ]
                : [
                      {
                          label: "Message",
                          url: "/doctor/message",
                          icon: <MessageCircle />,
                      },
                  ]),
        ],
        [user]
    );

    return (
        <div className="mt-6 flex flex-col p-4 gap-4">
            {routes.map((route, index) => (
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
