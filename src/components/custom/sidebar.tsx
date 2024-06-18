"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "../icons/DashboardIcon";
import ExploreIcon from "../icons/ExploreIcon";
import MessageIcon from "../icons/MessageIcon";
import VideoCallIcon from "../icons/VideoCallIcon";
import Logo from "./logo";

const routes = [
    {
        label: "Dashboard",
        url: "/patients",
        icon: <DashboardIcon />,
    },
    {
        label: "Explore",
        url: "/patients/explore",
        icon: <ExploreIcon />,
    },
    {
        label: "Book Session",
        url: "/patients/session",
        icon: <VideoCallIcon />,
    },
    {
        label: "Message",
        url: "/patients/message",
        icon: <MessageIcon />,
    },
];

export default function SideBar() {
    const pathname = usePathname();

    const isActive = function (href: string) {
        if (pathname === href) return true;
        else return false;
    };

    return (
        <div className="p-4">
            <Logo href="/patients" className="hidden md:block" />

            <ul className="space-y-3 hidden md:block">
                {routes.map((item, index) => {
                    return (
                        <li key={index} className={`flex items-center space-x-3 py-2 px-3 rounded-lg  ${isActive(item.url) ? "bg-[#00AC30] text-white" : "text-black"}`}>
                            {item.icon}
                            <Link href={item.url}>{item.label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
