"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/use-user";
import { AppointmentGetAll, DoctorDashboard } from "@/http";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

function DoctorsDashboard() {
    const { user, isPending: loadingUser } = useUser();
    const { data: doctorDashboardQuery, isPending: loadingDashboardQuery } = useQuery({
        queryKey: ["doctorDashboard"],
        queryFn: DoctorDashboard,
    });

    const { data: appointmentsQuery, isPending: loadingAppointments } = useQuery({
        queryKey: ["appointments"],
        queryFn: () => AppointmentGetAll({ limit: 5 }),
    });

    return (
        <div>
            {loadingUser ? <Skeleton className="h-8 w-32" /> : <h1 className="text-2xl font-semibold">Welcome {user?.first_name} 🔥,</h1>}
            <p className="text-gray-600">Track, and manage your patients.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                {loadingDashboardQuery && (
                    <>
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                    </>
                )}

                {doctorDashboardQuery && (
                    <>
                        {[
                            {
                                title: "Upcoming appointments",
                                value: new Intl.NumberFormat("en-US", {
                                    minimumIntegerDigits: 2,
                                }).format(doctorDashboardQuery.data.upcoming_appointments_count),
                            },
                            {
                                title: "Total consultation",
                                value: new Intl.NumberFormat("en-US", {
                                    minimumIntegerDigits: 2,
                                }).format(doctorDashboardQuery.data.total_consultations),
                            },
                            {
                                title: "Prescription sent",
                                value: new Intl.NumberFormat("en-US", {
                                    minimumIntegerDigits: 2,
                                }).format(doctorDashboardQuery.data.total_prescriptions_sent),
                            },
                        ].map((item, index) => (
                            <div key={index} className="p-4 bg-white shadow-md border border-grey-200 rounded-md">
                                <h2 className="text-sm text-gray-600">{item.title}</h2>
                                <p className="text-4xl text-gray-900 font-semibold mt-4">{item.value}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Table */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold">Upcoming appointments</h2>
                <table className="w-full mt-4">
                    <thead>
                        <tr>
                            <th className="text-left">Patient</th>
                            <th className="text-left">Date</th>
                            <th className="text-left">Time</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsQuery?.data.docs
                            .filter((appointment: any) => appointment.status === "PENDING")
                            .map((appointment: any, index: number) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="text-left py-4">{appointment.patient_profile_ref.full_name}</td>
                                    <td className="text-left py-4">{new Date(appointment.date_time).toDateString()}</td>
                                    <td className="text-left py-4">{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                    <td className="text-left py-4">{appointment.status}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {loadingAppointments && (
                    <div className="mt-4">
                        <Skeleton className="h-8" />
                        <Skeleton className="h-8" />
                        <Skeleton className="h-8" />
                    </div>
                )}

                {appointmentsQuery?.data.docs.length === 0 && <div className="mt-4 text-gray-600">No upcoming appointments</div>}

                <Button className="mt-4" variant={"ghost"} asChild>
                    <Link href="/doctor/sesssion">View all</Link>
                </Button>
            </div>
        </div>
    );
}

export default DoctorsDashboard;
