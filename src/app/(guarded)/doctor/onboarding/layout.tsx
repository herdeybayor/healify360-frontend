"use client";

import { useDoctorOnboardingStep } from "@/store/doctor-onbording-store";
import Image from "next/image";
import { type ReactNode } from "react";

function OnboardingLayout({
    step1,
    step2,
    step3,
    step4,
    step5,
}: {
    children: ReactNode;
    step1: React.ReactNode;
    step2: React.ReactNode;
    step3: React.ReactNode;
    step4: React.ReactNode;
    step5: React.ReactNode;
}) {
    const [currentStep] = useDoctorOnboardingStep();
    return (
        <div className="lg:grid grid-cols-2 h-screen">
            <div className="p-5 flex flex-col items-center mt-14">
                {currentStep === "1" && step1}
                {currentStep === "2" && step2}
                {currentStep === "3" && step3}
                {currentStep === "4" && step4}
                {currentStep === "5" && step5}
            </div>
            <div className="hidden lg:block">
                <Image alt="" src="/onboarding-desktop-bg.png" width={690} height={990} className="" />
            </div>
        </div>
    );
}

export default OnboardingLayout;
