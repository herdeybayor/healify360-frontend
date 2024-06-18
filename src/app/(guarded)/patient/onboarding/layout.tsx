"use client";

import { usePatientOnboardingStep } from "@/store/patient-onboarding-store";
import Image from "next/image";
import { type ReactNode } from "react";

function OnboardingLayout({ step1, step2, step3 }: { children: ReactNode; step1: React.ReactNode; step2: React.ReactNode; step3: React.ReactNode }) {
    const [currentStep] = usePatientOnboardingStep();
    return (
        <div className="lg:grid grid-cols-2 h-screen">
            <div className="p-5 flex flex-col items-center mt-14">
                {currentStep === "1" && step1}
                {currentStep === "2" && step2}
                {currentStep === "3" && step3}
            </div>
            <div className="hidden lg:block">
                <Image alt="" src="/onboarding-desktop-bg.png" width={690} height={990} className="" />
            </div>
        </div>
    );
}

export default OnboardingLayout;
