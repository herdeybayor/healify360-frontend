"use client";

import BookSessionDialog, { useBookSessionQueryStates } from "@/components/custom/book-session-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DoctorFind } from "@/http";
import { generateImage, generateRandomNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Filter, GraduationCap, MessageCircle, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function ExplorePage() {
    const router = useRouter();
    const { data: doctorFindQuery, isPending: isFindingDoctor } = useQuery({
        queryKey: ["find-doctors"],
        queryFn: DoctorFind,
    });

    const [_, setDoctor] = useBookSessionQueryStates();

    return (
        <div>
            <BookSessionDialog />
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-2xl">Explore</h1>
                <div className="flex items-center gap-4">
                    <Button variant="ghost">
                        <Search className="text-gray-500" />
                    </Button>
                    <Button variant="outline">
                        <Filter className="h-5 w-5" /> Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:mt-6 mt-3 gap-4">
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
                        </div>
                        <Button
                            className="mt-4 w-full"
                            onClick={() =>
                                setDoctor({
                                    doctor: doctor.user_ref._id,
                                    name: doctor.full_name,
                                })
                            }
                        >
                            Book a Session
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ExplorePageWrapper() {
    return (
        <Suspense fallback={<Skeleton className="h-screen" />}>
            <ExplorePage />
        </Suspense>
    );
}
