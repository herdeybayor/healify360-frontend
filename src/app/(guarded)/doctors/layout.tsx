import Logo from "@/components/custom/logo";
import React from "react";

function DoctorsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>
                <Logo href="/doctors" />
                sidebar
            </div>
            <div>DoctorsLayout</div>
        </div>
    );
}

export default DoctorsLayout;
