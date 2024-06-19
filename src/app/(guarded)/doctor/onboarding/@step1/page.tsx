"use client";

import AutoForm from "@/components/custom/auto-form";
import { Button } from "@/components/ui/button";
import { Step1Data, step1Schema, useDoctorOnboardingStep, useDoctorOnboardingStore } from "@/store/doctor-onbording-store";
import { useCallback } from "react";

function DoctorOnboarding1() {
    const { step1, setData } = useDoctorOnboardingStore();
    const [_, setCurrentStep] = useDoctorOnboardingStep();

    const onSubmit = useCallback(
        (data: Step1Data) => {
            setData({ step: 1, data });
            setCurrentStep("2");
        },
        [setData, setCurrentStep]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Doctor&apos;s Basic Information</h1>
            <p className="mt-4 text-muted-foreground">Let&apos;s get started with some basic information about you.</p>
            <div className="md:mt-8 mt-4">
                <AutoForm
                    formSchema={step1Schema}
                    onSubmit={onSubmit}
                    values={step1}
                    fieldConfig={{
                        bio: {
                            fieldType: "textarea",
                            inputProps: {
                                placeholder: "Write a short bio about yourself",
                                rows: 4,
                            } as any,
                        },
                    }}
                >
                    <div className="items-center flex gap-4 flex-row">
                        <Button type="submit" className="w-full mt-8">
                            Complete
                        </Button>
                    </div>
                    <p className="text-sm mt-4 text-primary font-semibold">Step 01/05</p>
                </AutoForm>
            </div>
        </div>
    );
}

export default DoctorOnboarding1;
