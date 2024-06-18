import { create } from "zustand";
import { z } from "zod";
import { persist, createJSONStorage } from "zustand/middleware";

// Step 1 Schema
const stepOneSchema = z.object({
    full_name: z.string().min(2, { message: "Full name must be at least 2 characters long" }).max(255, { message: "Full name must be at most 255 characters long" }),
    date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    gender: z.enum(["M", "F", "O"], { message: "Please select a valid gender" }),
});

// Step 2 Schema
const stepTwoSchema = z.object({
    phone_number: z.object({
        code: z.string().min(1, { message: "Country code is required" }),
        number: z.string().min(7, { message: "Phone number must be at least 7 digits long" }),
    }),
    home_address: z.object({
        city: z.string().min(1, { message: "City is required" }),
        state: z.string().min(1, { message: "State is required" }),
        street: z.string().min(1, { message: "Street is required" }),
        country: z.string().min(1, { message: "Country is required" }),
    }),
    emergency_contact: z.object({
        name: z.string().min(2, { message: "Contact name must be at least 2 characters long" }),
        email: z.string().email({ message: "Invalid email format" }),
        phone: z.string().min(7, { message: "Phone number must be at least 7 digits long" }),
        relationship: z.string().min(1, { message: "Relationship is required" }),
    }),
});

// Step 3 Schema
const stepThreeSchema = z.object({
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
type StepOneData = z.infer<typeof stepOneSchema>;
type StepTwoData = z.infer<typeof stepTwoSchema>;
type StepThreeData = z.infer<typeof stepThreeSchema>;

type StepData = { step: 1; data: Partial<StepOneData> } | { step: 2; data: Partial<StepTwoData> } | { step: 3; data: Partial<StepThreeData> };

// Initial data for each step
const initialStepOneData: StepOneData = {
    full_name: "Somebody Doe",
    date_of_birth: "1990-05-15",
    gender: "M",
};

const initialStepTwoData: StepTwoData = {
    phone_number: { code: "+1", number: "5551234567" },
    home_address: { city: "New York", state: "NY", street: "123 Main St", country: "USA" },
    emergency_contact: { name: "Jane Doe", email: "jane.doe@example.com", phone: "5559876543", relationship: "Spouse" },
};

const initialStepThreeData: StepThreeData = {
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

// Zustand Store
export const usePatientOnboardingStore = create<{
    stepOne: StepOneData;
    stepTwo: StepTwoData;
    stepThree: StepThreeData;
    setData: ({ step, data }: StepData) => void;
    reset: () => void;
}>()(
    persist(
        (set) => ({
            stepOne: initialStepOneData,
            stepTwo: initialStepTwoData,
            stepThree: initialStepThreeData,
            setData: ({ step, data }: StepData) =>
                set((state) => {
                    const key = `step${step}` as keyof typeof state;
                    return {
                        ...state,
                        [key]: { ...state[key], ...data },
                    };
                }),
            reset: () =>
                set({
                    stepOne: initialStepOneData,
                    stepTwo: initialStepTwoData,
                    stepThree: initialStepThreeData,
                }),
        }),
        {
            name: "patient-onboarding-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

const toExport = { usePatientOnboardingStore, patientOnboardingStep1Schema: stepOneSchema, patientOnboardingStep2Schema: stepTwoSchema, patientOnboardingStep3Schema: stepThreeSchema };

export default toExport;
