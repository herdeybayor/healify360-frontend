import { create } from "zustand";
import { z } from "zod";
import { persist, createJSONStorage } from "zustand/middleware";
import { parseAsStringLiteral, useQueryState } from "nuqs";

// Step 1 Schema
export const step1Schema = z.object({
    full_name: z.string().min(2, { message: "Full name must be at least 2 characters long" }).max(255, { message: "Full name must be at most 255 characters long" }),
    date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    gender: z.enum(["M", "F", "O"], { message: "Please select a valid gender" }),
});

// Step 2 Schema
export const step2Schema = z.object({
    phone_number: z.string(),
    home_address: z.object({
        city: z.string().min(1, { message: "City is required" }),
        state: z.string().min(1, { message: "State is required" }),
        street: z.string().min(1, { message: "Street is required" }),
        country: z.string().min(1, { message: "Country is required" }),
    }),
    emergency_contact: z.object({
        name: z.string().min(2, { message: "Contact name must be at least 2 characters long" }),
        email: z.string().email({ message: "Invalid email format" }),
        phone: z.string(),
        relationship: z.string().min(1, { message: "Relationship is required" }),
    }),
});

// Step 3 Schema
export const step3Schema = z.object({
    major_illnesses: z.array(
        z.object({
            name: z.string().min(1, { message: "Illness name is required" }),
            period: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
        })
    ),
    surgeries: z.array(
        z.object({
            name: z.string().min(1, { message: "Surgery name is required" }),
            period: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
        })
    ),
    allergies: z.array(z.string().min(1, { message: "Allergy is required" })),
    family_medical_history: z.array(z.string().min(1, { message: "Family medical history item is required" })),
    current_medications: z.array(z.string().min(1, { message: "Medication is required" })),
    insurance_information: z.object({
        provider: z.string().min(1, { message: "Provider is required" }),
        policy_number: z.string().min(1, { message: "Policy number is required" }),
        group_number: z.string().min(1, { message: "Group number is required" }),
    }),
    preferences: z.object({
        languages: z.array(z.string().min(1, { message: "Language is required" })),
        communication_preferences: z.array(z.enum(["Email", "Phone"], { message: "Invalid communication preference" })),
        accessibility_needs: z.array(z.string().min(1, { message: "Accessibility need is required" })),
    }),
    occupation: z.string().min(1, { message: "Occupation is required" }),
    ethnicity: z.string().min(1, { message: "Ethnicity is required" }),
});

// Define types
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

type StepData = { step: 1; data: Partial<Step1Data> } | { step: 2; data: Partial<Step2Data> } | { step: 3; data: Partial<Step3Data> };

// Initial data for each step
const initialStep1Data: Step1Data = {
    full_name: "Somebody Doe",
    date_of_birth: "1990-05-15",
    gender: "M",
};

const initialStep2Data: Step2Data = {
    phone_number: "+15551234567",
    home_address: { city: "New York", state: "NY", street: "123 Main St", country: "USA" },
    emergency_contact: { name: "Jane Doe", email: "jane.doe@example.com", phone: "5559876543", relationship: "Spouse" },
};

const initialStep3Data: Step3Data = {
    major_illnesses: [
        { name: "Hypertension", period: "2010-01-01" },
        { name: "Type 2 Diabetes", period: "2015-06-01" },
    ],
    surgeries: [{ name: "Appendectomy", period: "2012-08-15" }],
    allergies: ["Penicillin", "Pollen"],
    family_medical_history: ["Heart disease", "Cancer"],
    current_medications: ["Lisinopril", "Metformin"],
    insurance_information: { provider: "ABC Insurance", policy_number: "POL987654321", group_number: "GRP123456789" },
    preferences: { languages: ["English", "Spanish"], communication_preferences: ["Email", "Phone"], accessibility_needs: ["Wheelchair access"] },
    occupation: "Engineer",
    ethnicity: "WHITE",
};

export const usePatientOnboardingStore = create<{
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
    setData: ({ step, data }: StepData) => void;
    reset: () => void;
}>()(
    persist(
        (set) => ({
            step1: initialStep1Data,
            step2: initialStep2Data,
            step3: initialStep3Data,
            setData: ({ step, data }: StepData) =>
                set((state) => {
                    const key = `step${step}` as keyof typeof state;
                    console.log("setting", key, data);
                    return {
                        ...state,
                        [key]: { ...state[key], ...data },
                    };
                }),
            reset: () =>
                set({
                    step1: initialStep1Data,
                    step2: initialStep2Data,
                    step3: initialStep3Data,
                }),
        }),
        {
            name: "patient-onboarding-storage",
            storage: createJSONStorage(() => localStorage),
            getStorage: () => localStorage,
        }
    )
);

export function usePatientOnboardingStep() {
    return useQueryState("step", parseAsStringLiteral(["1", "2", "3"]).withDefault("1"));
}
