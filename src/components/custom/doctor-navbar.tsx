"use client";

import { ModeToggle } from "@/components/custom/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/use-user";
import { setCookie } from "cookies-next";
import { ChevronDown, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

function DoctorNavbar() {
    const router = useRouter();

    const { user } = useUser();
    return (
        <nav className="flex items-center lg:px-11 lg:py-6 lg:space-x-6 justify-end border-b border-gray-200">
            <div className="hidden lg:flex items-center space-x-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex items-center space-x-2" variant="ghost" title="My Account">
                            <span className="font-medium">{user ? `${user.first_name} ${user.last_name}` : "-"}</span>
                            <Avatar>
                                <AvatarImage src="" alt="user avatar" />
                                <AvatarFallback>{user ? `${user.first_name[0]}${user.last_name[0]}` : "-"}</AvatarFallback>
                            </Avatar>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setCookie("access-token", "", { expires: new Date(0) });
                                router.push("/login");
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
            </div>
        </nav>
    );
}

export default DoctorNavbar;
