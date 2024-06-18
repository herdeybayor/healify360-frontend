"use client";

import AutoForm, { AutoFormSubmit } from "@/components/custom/auto-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Step3Data, step3Schema, usePatientOnboardingStep, usePatientOnboardingStore } from "@/store/patient-onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

function PatientOnboarding3() {
    const { step3, setData } = usePatientOnboardingStore();
    const [currentStep, setCurrentStep] = usePatientOnboardingStep();

    const onSubmit = useCallback(
        (data: Step3Data) => {
            setData({ step: 3, data });
            console.log(data);
        },
        [setData]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Medical History and Preferences</h1>
            <p className="mt-4 text-muted-foreground">Gathering the patient&apos;s medical history and preferences to provide comprehensive and personalized care.</p>
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
                    <p className="text-sm mt-4 text-primary font-semibold">Step 03/03</p>
                </AutoForm>
            </div>
        </div>
    );
}

export default PatientOnboarding3;
