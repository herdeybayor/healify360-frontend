"use client";

import AutoForm from "@/components/custom/auto-form";
import { getPhoneData } from "@/components/custom/phone-input";
import { Button } from "@/components/ui/button";
import { PatientProfileCreate } from "@/http";
import { Step1Data, Step2Data, Step3Data, step3Schema, usePatientOnboardingStep, usePatientOnboardingStore } from "@/store/patient-onboarding-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

function PatientOnboarding3() {
    const router = useRouter();
    const { step1, step2, step3, setData } = usePatientOnboardingStore();
    const [_, setCurrentStep] = usePatientOnboardingStep();

    const queryClient = useQueryClient();

    const { mutateAsync: createProfile, isPending: isCreatingProfile } = useMutation({
        mutationFn: PatientProfileCreate,
        onSuccess() {
            router.push("/patient");
            queryClient.invalidateQueries({
                queryKey: ["auth-session"],
            });
        },
    });

    const onSubmit = useCallback(
        (data: Step3Data) => {
            setData({ step: 3, data });
            const my_phone = getPhoneData(step2.phone_number);
            const emergency_contact = getPhoneData(step2.emergency_contact.phone);

            const payload: Step1Data &
                Omit<Step2Data, "phone_number" | "emergency_contact"> &
                Step3Data & { phone_number: { code: string; number: string }; emergency_contact: { name: string; email: string; phone: { code: string; number: string }; relationship: string } } = {
                ...step1,
                ...step2,
                ...data,
                phone_number: { code: my_phone.countryCallingCode || "", number: my_phone.nationalNumber || "" },
                emergency_contact: {
                    ...step2.emergency_contact,
                    phone: { code: emergency_contact.countryCallingCode || "", number: emergency_contact.nationalNumber || "" },
                },
            };

            toast.promise(createProfile(payload), {
                loading: "Saving...",
                success: "Profile created successfully",
                error: (error) => error.response?.data.message || "An error occurred",
            });
        },
        [setData, step1, step2]
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
                        <Button type="submit" className="w-full mt-8" disabled={isCreatingProfile}>
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
