"use client";

import AutoForm from "@/components/custom/auto-form";
import { Button } from "@/components/ui/button";
import { Step1Data, step1Schema, useDoctorOnboardingStore } from "@/store/doctor-onbording-store";
import { useCallback } from "react";

function PatientOnboarding3() {
    const { step1, setData } = useDoctorOnboardingStore();

    const onSubmit = useCallback(
        (data: Step1Data) => {
            setData({ step: 1, data });

            console.log(data);
        },
        [setData]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Medical History and Preferences</h1>
            <p className="mt-4 text-muted-foreground">Gathering the patient&apos;s medical history and preferences to provide comprehensive and personalized care.</p>
            <div className="md:mt-8 mt-4">
                <AutoForm formSchema={step1Schema} onSubmit={onSubmit} values={step1}>
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

export default PatientOnboarding3;
