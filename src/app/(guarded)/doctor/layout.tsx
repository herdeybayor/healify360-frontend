import DoctorNavbar from "@/components/custom/doctor-navbar";
import DoctorSidebar from "@/components/custom/doctor-sidebar";
import Logo from "@/components/custom/logo";
import React from "react";

function DoctorsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full">
            <div className="max-w-80 w-full bg-background h-full border-r border-gray-200 pt-6">
                <Logo href="/doctor" />
                <DoctorSidebar />
            </div>
            <div className="flex-1">
                <DoctorNavbar />
                <main>{children}</main>
            </div>
        </div>
    );
}

export default DoctorsLayout;
