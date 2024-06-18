"use client";

import AutoForm from "@/components/custom/auto-form";
import { DependencyType } from "@/components/custom/auto-form/types";
import { Button } from "@/components/ui/button";
import { SPECIALIZATION, Step3Data, step3Schema, useDoctorOnboardingStep, useDoctorOnboardingStore } from "@/store/doctor-onbording-store";
import { useCallback } from "react";

function DoctorOnboarding3() {
    const { step3, setData } = useDoctorOnboardingStore();
    const [_, setCurrentStep] = useDoctorOnboardingStep();

    const onSubmit = useCallback(
        (data: Step3Data) => {
            setData({ step: 3, data });
            setCurrentStep("4");
        },
        [setData]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Professional Information</h1>
            <p className="mt-4 text-muted-foreground">Tell us about your professional background and education.</p>
            <div className="md:mt-8 mt-4">
                <AutoForm formSchema={step3Schema} onSubmit={onSubmit} values={step3}>
                    <div className="items-center flex gap-4 flex-row">
                        <Button variant="outline" type="button" className="mt-8 w-full" onClick={() => setCurrentStep("2")}>
                            Back
                        </Button>
                        <Button type="submit" className="w-full mt-8">
                            Complete
                        </Button>
                    </div>
                    <p className="text-sm mt-4 text-primary font-semibold">Step 03/05</p>
                </AutoForm>
            </div>
        </div>
    );
}

export default DoctorOnboarding3;
