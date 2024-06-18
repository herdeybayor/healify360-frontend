"use client";

import BookButton from "@/components/custom/book-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/use-user";
import { DoctorFind } from "@/http";
import { generateImage, generateRandomNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, GraduationCap, Info, LayoutDashboard, MessageCircle, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const routes = [
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
];

export default function PatientDashboard() {
    const [date, setDate] = useState<undefined | DateRange>(undefined);
    const { user, isPending: loadingUser } = useUser();

    const { data: doctorFindQuery, isPending: isFindingDoctor } = useQuery({
        queryKey: ["find-doctors"],
        queryFn: DoctorFind,
    });

    return (
        <div className="">
            {user?.is_onboarding_complete === false && (
                <Alert className="mb-4">
                    <Info />
                    <AlertTitle className="font-semibold">Welcome to Healify360</AlertTitle>
                    <AlertDescription className="text-gray-600">Please complete your onboarding to access all features</AlertDescription>
                </Alert>
            )}

            {loadingUser ? <Skeleton className="h-8 w-32" /> : <h1 className="md:text-2xl font-semibold">Welcome {user?.first_name} 🔥,</h1>}
            <div>
                <div className="mt-6 bg-[#EFFFF4] rounded-lg grid grid-cols-[1fr_auto] min-h-44 md:grid-cols-[30%_1fr_30%] relative pt-3 md:px-0 px-3">
                    <Image src="/medical_equipment.svg" alt="" width={266} height={240} className="self-end absolute md:relative top-0 bottom-0 h-full -left-10 md:left-0" />
                    <div className="flex flex-col md:items-center items-start self-center">
                        <h1 className="lg:text-4xl sm:text-xl z-30 md:text-center font-petchSans break-words max-w-56 text-center self-center md:max-w-none">
                            {"Schedule Call with a\nprofessional doctors\ntoday"}
                        </h1>
                        <Button className="md:mt-3 z-40 self-center mt-2 md:px-8 bg-[#334155]">Explore</Button>
                    </div>
                    <Image src="/medical_supplies.svg" alt="" width={200} height={200} className="absolute z-20 md:right-0 lg:-top-5 top-0 bottom-0 h-full lg:h-auto -right-10" />
                </div>
            </div>
            <div className="md:mt-9 md:text-2xl text-xl mt-3 font-semibold">
                <h2>Quick Links</h2>
                <div className="lg:flex md:mt-6 gap-x-8 mt-3">
                    <div className="flex-1">
                        <div className="flex gap-5 md:gap-8 overflow overflow-y-auto">
                            {routes.map((route, index) => (
                                <Link href={route.url} key={index} className="w-full">
                                    <div className="flex flex-col gap-4 mb-3 md:mb-0 p-5 min-w-[170px] md:min-w-0 rounded-lg border w-full">
                                        {route.icon}
                                        <p className="text-base text-muted-foreground">{route.label}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-3 md:mt-5">
                            <h2>Top Rated Doctors</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:mt-6 mt-3 gap-4 justify-between">
                                {isFindingDoctor && (
                                    <>
                                        <Skeleton className="h-52" />
                                        <Skeleton className="h-52" />
                                        <Skeleton className="h-52" />
                                        <Skeleton className="h-52" />
                                    </>
                                )}
                                {doctorFindQuery?.data?.doctors.map((doctor: any, index: any) => (
                                    <div key={index} className="border p-[14px] rounded-lg">
                                        <Image src={generateImage(doctor._id)} alt="" width={307} height={235} className="rounded-lg w-full" />
                                        <div className="space-y-2 mt-2">
                                            <p className="truncate" title={doctor.full_name}>
                                                {doctor.full_name}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-3 w-3" />
                                                <p className="font-normal text-sm">{doctor.specialization}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MessageCircle className="h-3 w-3" />
                                                <p className="font-normal text-sm">
                                                    {generateRandomNumber(1, 100, doctor._id)} sessions ({generateRandomNumber(1, 25, doctor._id)} reviews)
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-3 w-3" />
                                                <p className="font-normal text-sm">{doctor.years_of_experience} years experience</p>
                                            </div>
                                            <BookButton date={date} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="w-fit rounded-md border hidden xl:block">
                            <Calendar mode="range" selected={date} onSelect={(date) => setDate(date)} className="mx-auto" />
                            <div className="px-5 pb-6">
                                <Button className="w-full">Book a Session</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
