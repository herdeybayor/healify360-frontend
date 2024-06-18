"use client";

import AutoForm from "@/components/custom/auto-form";
import { Button } from "@/components/ui/button";
import { Step5Data, step5Schema, useDoctorOnboardingStep, useDoctorOnboardingStore } from "@/store/doctor-onbording-store";
import { useCallback } from "react";

function DoctorOnboarding2() {
    const { step1, step2, step3, step4, step5, setData } = useDoctorOnboardingStore();
    const [_, setCurrentStep] = useDoctorOnboardingStep();

    const onSubmit = useCallback(
        (data: Step5Data) => {
            setData({ step: 5, data });
            console.log({ ...step1, ...step2, ...step3, ...step4, ...step5 });
        },
        [setData, step1, step2, step3, step4, step5]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Services and Achievements</h1>
            <p className="mt-4 text-muted-foreground">Share the services you provide and your professional achievements.</p>
            <div className="md:mt-8 mt-4">
                <AutoForm formSchema={step5Schema} onSubmit={onSubmit} values={step5}>
                    <div className="items-center flex gap-4 flex-row">
                        <Button variant="outline" type="button" className="mt-8 w-full" onClick={() => setCurrentStep("4")}>
                            Back
                        </Button>
                        <Button type="submit" className="w-full mt-8">
                            Complete
                        </Button>
                    </div>
                    <p className="text-sm mt-4 text-primary font-semibold">Step 05/05</p>
                </AutoForm>
            </div>
        </div>
    );
}

export default DoctorOnboarding2;
