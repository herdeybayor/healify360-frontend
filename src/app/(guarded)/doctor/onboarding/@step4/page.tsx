"use client";

import AutoForm from "@/components/custom/auto-form";
import { Button } from "@/components/ui/button";
import { Step4Data, step4Schema, useDoctorOnboardingStep, useDoctorOnboardingStore } from "@/store/doctor-onbording-store";
import { useCallback } from "react";

function DoctorOnboarding4() {
    const { step4, setData } = useDoctorOnboardingStore();
    const [_, setCurrentStep] = useDoctorOnboardingStep();

    const onSubmit = useCallback(
        (data: Step4Data) => {
            setData({ step: 4, data });
            setCurrentStep("5");
        },
        [setData]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Licensure and Insurance</h1>
            <p className="mt-4 text-muted-foreground">Provide your licensure and malpractice insurance details.</p>
            <div className="md:mt-8 mt-4">
                <AutoForm formSchema={step4Schema} onSubmit={onSubmit} values={step4}>
                    <div className="items-center flex gap-4 flex-row">
                        <Button variant="outline" type="button" className="mt-8 w-full" onClick={() => setCurrentStep("3")}>
                            Back
                        </Button>
                        <Button type="submit" className="w-full mt-8">
                            Complete
                        </Button>
                    </div>
                    <p className="text-sm mt-4 text-primary font-semibold">Step 04/05</p>
                </AutoForm>
            </div>
        </div>
    );
}

export default DoctorOnboarding4;
