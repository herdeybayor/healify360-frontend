"use client";

import useUser from "@/hooks/use-user";
import { FileClock, Home, LayoutDashboard, MessageCircle, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import Logo from "./logo";

export default function SideBar() {
    const pathname = usePathname();

    const { user } = useUser();

    const routes = useMemo(
        () => [
            {
                label: "Dashboard",
                url: "/patient",
                icon: <Home />,
            },
            ...(user?.is_onboarding_complete === false
                ? [
                      {
                          label: "Onboarding",
                          url: "/patient/onboarding",
                          icon: <FileClock />,
                      },
                  ]
                : [
                      {
                          label: "Explore",
                          url: "/patient/explore",
                          icon: <LayoutDashboard />,
                      },
                      {
                          label: "Book Session",
                          url: "/patient/session",
                          icon: <Video />,
                      },
                      {
                          label: "Message",
                          url: "/patient/message",
                          icon: <MessageCircle />,
                      },
                  ]),
        ],
        [user]
    );

    const isActive = useCallback(
        (url: string) => {
            return pathname === url;
        },
        [pathname]
    );

    return (
        <div className="p-4">
            <Logo href="/patient" className="hidden md:block" />

            <ul className="flex-col p-4 gap-4 hidden md:flex">
                {routes.map((item, index) => {
                    return (
                        <Button key={index} asChild variant={isActive(item.url) ? "default" : "ghost"} className={"justify-start"}>
                            <Link href={item.url} className="flex items-center gap-3">
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </Button>
                    );
                })}
            </ul>
        </div>
    );
}
