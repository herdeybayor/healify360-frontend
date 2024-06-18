"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MenuIcon from "../icons/MenuIcon";
import DashboardIcon from "../icons/DashboardIcon";
import ExploreIcon from "../icons/ExploreIcon";
import VideoCallIcon from "../icons/VideoCallIcon";
import MessageIcon from "../icons/MessageIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
    {
        label: "Dashboard",
        url: "/patient",
        icon: <DashboardIcon />,
    },
    {
        label: "Explore",
        url: "/patient/explore",
        icon: <ExploreIcon />,
    },
    {
        label: "Book Session",
        url: "/patient/session",
        icon: <VideoCallIcon />,
    },
    {
        label: "Message",
        url: "/patient/message",
        icon: <MessageIcon />,
    },
];

export function MobileNav() {
    const pathname = usePathname();

    const isActive = function (href: string) {
        if (pathname === href) return true;
        else return false;
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <MenuIcon />
            </SheetTrigger>
            <SheetContent className="w-full">
                <ul className="space-y-3 mt-8">
                    {routes.map((item, index) => {
                        return (
                            <SheetTrigger asChild key={index}>
                                <Link href={item.url} className="block">
                                    <li className={`flex items-center gap-3 py-2 px-3 rounded-lg  ${isActive(item.url) ? "bg-[#00AC30] text-white" : "text-black"}`}>
                                        {item.icon}
                                        {item.label}
                                    </li>
                                </Link>
                            </SheetTrigger>
                        );
                    })}
                </ul>
            </SheetContent>
        </Sheet>
    );
}
