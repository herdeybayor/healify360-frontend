"use client";

import AutoForm from "@/components/custom/auto-form";
import { Button } from "@/components/ui/button";
import { Step2Data, step2Schema, useDoctorOnboardingStep, useDoctorOnboardingStore } from "@/store/doctor-onbording-store";
import { useCallback } from "react";

function DoctorOnboarding2() {
    const { step2, setData } = useDoctorOnboardingStore();
    const [_, setCurrentStep] = useDoctorOnboardingStep();

    const onSubmit = useCallback(
        (data: Step2Data) => {
            setData({ step: 2, data });
            setCurrentStep("3");
        },
        [setData, setCurrentStep]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Contact Information</h1>
            <p className="mt-4 text-muted-foreground">Provide your contact details to stay connected.</p>
            <div className="md:mt-8 mt-4">
                <AutoForm formSchema={step2Schema} onSubmit={onSubmit} values={step2}>
                    <div className="items-center flex gap-4 flex-row">
                        <Button variant="outline" type="button" className="mt-8 w-full" onClick={() => setCurrentStep("1")}>
                            Back
                        </Button>
                        <Button type="submit" className="w-full mt-8">
                            Complete
                        </Button>
                    </div>
                    <p className="text-sm mt-4 text-primary font-semibold">Step 02/05</p>
                </AutoForm>
            </div>
        </div>
    );
}

export default DoctorOnboarding2;
