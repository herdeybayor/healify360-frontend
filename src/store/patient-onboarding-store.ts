import { create } from "zustand";
import { z } from "zod";
import { persist, createJSONStorage } from "zustand/middleware";
import { parseAsStringLiteral, useQueryState } from "nuqs";

// Ethnicity enum
export const ethnicityEnum = z.enum(["WHITE", "BLACK_OR_AFRICAN_AMERICAN", "HISPANIC_OR_LATINO", "ASIAN", "NATIVE_AMERICAN_OR_ALASKA_NATIVE", "NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER", "OTHER"]);

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
            name: z
                .string({
                    required_error: "Illness name is required",
                })
                .min(1, { message: "Illness name is required" })
                .describe("Name of the major illness"),
            period: z.coerce.date().refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" }),
        }),
        { description: "Major Illness" }
    ),
    surgeries: z.array(
        z.object({
            name: z
                .string({
                    required_error: "Surgery name is required",
                })
                .min(1, { message: "Surgery name is required" })
                .describe("Name of the surgery"),
            period: z.coerce.date().refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" }),
        })
    ),
    allergies: z.array(
        z.object({
            name: z
                .string({
                    required_error: "Allergy name is required",
                })
                .min(1, { message: "Allergy name is required" })
                .describe("Name of the allergy"),
            reaction: z.string().min(1, { message: "Reaction is required" }),
        })
    ),
    family_medical_history: z.array(
        z.object({
            name: z
                .string({
                    required_error: "Family member name is required",
                })
                .min(1, { message: "Family member name is required" })
                .describe("Name of the family member"),
            illness: z.string().min(1, { message: "Illness is required" }),
            relationship: z.string().min(1, { message: "Relationship is required" }),
        }),
        {
            description: "Family Medical History",
        }
    ),
    current_medications: z.array(
        z.object({
            name: z
                .string({
                    required_error: "Medication name is required",
                })
                .min(1, { message: "Medication name is required" })
                .describe("Name of the medication")
                .default("Aspirin"),
            dosage: z.string().min(1, { message: "Dosage is required" }).default("100mg"),
            frequency: z.string().min(1, { message: "Frequency is required" }).default("Once daily"),
        }),
        {
            description: "Current Medications",
        }
    ),
    insurance_information: z.object(
        {
            provider: z.string().min(1, { message: "Provider is required" }).default("Blue Cross Blue Shield"),
            policy_number: z.string().min(1, { message: "Policy number is required" }).default("123456789"),
            group_number: z.string().min(1, { message: "Group number is required" }).default("987654321"),
        },
        { required_error: "Insurance Information is required", description: "Insurance Information" }
    ),
    preferences: z.object({
        languages: z.array(
            z.object({
                language: z.enum(["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Arabic"], { message: "Invalid language" }).default("English"),
                proficiency: z.enum(["Basic", "Intermediate", "Advanced"], { message: "Invalid proficiency" }).default("Basic"),
            }),
            { message: "Invalid language" }
        ),
        communication_preferences: z.array(
            z.object({
                preference: z.enum(["Email", "Phone", "SMS", "Mail"], { message: "Invalid communication preference" }).default("Email"),
            }),
            { message: "Invalid communication preference" }
        ),
        accessibility_needs: z.array(
            z.object({
                need: z.enum(["Wheelchair", "Cane", "Walker", "Hearing Aid", "Service Animal", "Other"], { message: "Invalid accessibility need" }).default("Wheelchair"),
            }),
            { message: "Invalid accessibility need" }
        ),
    }),
    occupation: z.string().min(1, { message: "Occupation is required" }).default("Engineer"),
    ethnicity: ethnicityEnum.default("WHITE"),
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
    phone_number: "+2349787655963",
    home_address: { city: "New York", state: "NY", street: "123 Main St", country: "USA" },
    emergency_contact: { name: "Jane Doe", email: "jane.doe@example.com", phone: "2349787655963", relationship: "Spouse" },
};

const initialStep3Data: Step3Data = {
    major_illnesses: [
        { name: "Diabetes", period: new Date("2010-01-01") },
        { name: "Hypertension", period: new Date("2015-01-01") },
    ],
    surgeries: [
        { name: "Appendectomy", period: new Date("2012-01-01") },
        { name: "Knee Replacement", period: new Date("2018-01-01") },
    ],
    allergies: [
        { name: "Penicillin", reaction: "Rash" },
        { name: "Peanuts", reaction: "Anaphylaxis" },
    ],
    family_medical_history: [
        { name: "John Doe", illness: "Diabetes", relationship: "Father" },
        { name: "Jane Doe", illness: "Hypertension", relationship: "Mother" },
    ],
    current_medications: [
        { name: "Aspirin", dosage: "100mg", frequency: "Once daily" },
        { name: "Lisinopril", dosage: "10mg", frequency: "Twice daily" },
    ],
    insurance_information: { provider: "Blue Cross Blue Shield", policy_number: "123456789", group_number: "987654321" },
    preferences: {
        languages: [
            { language: "English", proficiency: "Basic" },
            { language: "Spanish", proficiency: "Intermediate" },
        ],
        communication_preferences: [{ preference: "Email" }, { preference: "Phone" }],
        accessibility_needs: [{ need: "Wheelchair" }, { need: "Hearing Aid" }],
    },
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
        }
    )
);

export function usePatientOnboardingStep() {
    return useQueryState("step", parseAsStringLiteral(["1", "2", "3"]).withDefault("1"));
}
