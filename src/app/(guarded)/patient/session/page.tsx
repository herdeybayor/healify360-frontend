"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { AppointmentGetAll } from "@/http";
import { CalendarIcon, HourglassIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

function SessionCard({ session }: { session: any }) {
    return (
        <div className="flex items-center p-6 border border-slate-200 rounded-2xl bg-background">
            <div className="py-2 border-l-2 pl-2 border-primary">
                <p className="text-slate-600">{session.doctor_profile_ref.full_name}</p>
                <div className="flex gap-2 items-center mt-2 text-slate-600">
                    <p className="flex items-center gap-2">
                        <CalendarIcon size={20} /> <span>{format(new Date(session.date_time), "do MMMM yyyy")}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <HourglassIcon size={20} /> <span>{format(new Date(session.date_time), "hh:mma")}</span>
                    </p>
                </div>
            </div>
            <Button className="ml-auto">Send Message</Button>
        </div>
    );
}

function SessionsPage() {
    const { data: appointmentsQuery, isPending: loadingAppointments } = useQuery({
        queryKey: ["appointments"],
        queryFn: () => AppointmentGetAll({ limit: 100 }),
    });
    return (
        <div className="mx-auto max-w-lg">
            <h1 className="font-semibold text-2xl mb-4">Sessions</h1>
            <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-3 max-w-lg">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4 max-w-lg">
                    {appointmentsQuery?.data.docs
                        .filter((session: any) => session.status === "PENDING")
                        .map((session: any, index: number) => (
                            <SessionCard session={session} key={index} />
                        ))}
                </TabsContent>
                <TabsContent value="cancelled" className="space-y-4 max-w-lg">
                    {appointmentsQuery?.data.docs
                        .filter((session: any) => session.status === "CANCELLED")
                        .map((session: any, index: number) => (
                            <SessionCard session={session} key={index} />
                        ))}
                </TabsContent>
                <TabsContent value="all" className="space-y-4 max-w-lg">
                    {appointmentsQuery?.data.docs.map((session: any, index: number) => (
                        <SessionCard session={session} key={index} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default SessionsPage;
