"use client";

import useUser from "@/hooks/use-user";
import React from "react";

function DoctorsDashboard() {
    const { user } = useUser();
    return (
        <div>
            <h1 className="text-2xl font-semibold">Welcome {user?.first_name} 🔥,</h1>
            <p className="text-gray-600">Track, and manage your patients.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                    {
                        title: "Upcoming appointments",
                        value: new Intl.NumberFormat("en-US", {
                            minimumIntegerDigits: 2,
                        }).format(4),
                    },
                    {
                        title: "Total consultation",
                        value: new Intl.NumberFormat("en-US", {
                            minimumIntegerDigits: 2,
                        }).format(2420),
                    },
                    {
                        title: "Prescription sent",
                        value: new Intl.NumberFormat("en-US", {
                            minimumIntegerDigits: 2,
                        }).format(100),
                    },
                ].map((item, index) => (
                    <div key={index} className="p-4 bg-white shadow-md border border-grey-200 rounded-md">
                        <h2 className="text-sm text-gray-600">{item.title}</h2>
                        <p className="text-4xl text-gray-900 font-semibold mt-4">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorsDashboard;
