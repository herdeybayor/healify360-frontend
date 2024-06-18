"use client";

import { usePatientOnboardingStep } from "@/store/patient-onboarding-store";
import Image from "next/image";
import { type ReactNode } from "react";

function OnboardingLayout({ step1, step2, step3 }: { children: ReactNode; step1: React.ReactNode; step2: React.ReactNode; step3: React.ReactNode }) {
    const [currentStep] = usePatientOnboardingStep();
    return (
        <div className="lg:grid grid-cols-2 h-screen">
            <div className="p-5 flex flex-col items-center mt-14">
                <div className="max-w-md">
                    <h1 className="font-semibold text-2xl">Let&apos;s get you started</h1>
                    <p className="mt-4">Onboarding a patient involves collecting information to ensure their medical care is personalized and effective.</p>
                    <div className="md:mt-8 mt-4">
                        {currentStep === "1" && step1}
                        {currentStep === "2" && step2}
                        {currentStep === "3" && step3}
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <Image alt="" src="/onboarding-desktop-bg.png" width={690} height={990} className="" />
            </div>
        </div>
    );
}

export default OnboardingLayout;
