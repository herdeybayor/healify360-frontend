import { create } from "zustand";
import { z } from "zod";
import { persist, createJSONStorage } from "zustand/middleware";
import { parseAsStringLiteral, useQueryState } from "nuqs";

// Enum for Education Types and Specializations
const EDUCATION_TYPES = {
    MD: {
        enumValue: "MD",
        fullName: "Doctor of Medicine",
    },
    DO: {
        enumValue: "DO",
        fullName: "Doctor of Osteopathic Medicine",
    },
    BS: {
        enumValue: "BS",
        fullName: "Bachelor of Science",
    },
    BA: {
        enumValue: "BA",
        fullName: "Bachelor of Arts",
    },
    MS: {
        enumValue: "MS",
        fullName: "Master of Science",
    },
    MA: {
        enumValue: "MA",
        fullName: "Master of Arts",
    },
    MPH: {
        enumValue: "MPH",
        fullName: "Master of Public Health",
    },
    MHA: {
        enumValue: "MHA",
        fullName: "Master of Health Administration",
    },
    Residency: {
        enumValue: "Residency",
        fullName: "Residency",
    },
    Fellowship: {
        enumValue: "Fellowship",
        fullName: "Fellowship",
    },
    Internship: {
        enumValue: "Internship",
        fullName: "Internship",
    },
    PhD: {
        enumValue: "PhD",
        fullName: "Doctor of Philosophy",
    },
    DSc: {
        enumValue: "DSc",
        fullName: "Doctor of Science",
    },
    MBA: {
        enumValue: "MBA",
        fullName: "Master of Business Administration",
    },
    JD: {
        enumValue: "JD",
        fullName: "Juris Doctor",
    },
    DDS: {
        enumValue: "DDS",
        fullName: "Doctor of Dental Surgery",
    },
    DMD: {
        enumValue: "DMD",
        fullName: "Doctor of Medicine in Dentistry",
    },
} as const;

export const SPECIALIZATION = {
    Cardiology: ["Interventional Cardiology", "Electrophysiology", "Heart Failure & Transplantation", "Preventive Cardiology", "Nuclear Cardiology"],
    Dermatology: ["Pediatric Dermatology", "Dermatopathology", "Mohs Surgery", "Cosmetic Dermatology"],
    Endocrinology: ["Diabetes", "Thyroid Disorders", "Bone and Mineral Metabolism", "Endocrine Oncology", "Pediatric Endocrinology"],
    Gastroenterology: ["Hepatology", "Inflammatory Bowel Disease", "Advanced Endoscopy", "Pediatric Gastroenterology", "Neurogastroenterology"],
    Neurology: ["Stroke", "Epilepsy", "Movement Disorders", "Neuromuscular Medicine", "Neurocritical Care", "Pediatric Neurology"],
    Orthopedics: ["Sports Medicine", "Joint Replacement", "Spine Surgery", "Pediatric Orthopedics", "Orthopedic Oncology", "Hand Surgery"],
    Pediatrics: ["Pediatric Cardiology", "Pediatric Endocrinology", "Pediatric Gastroenterology", "Pediatric Neurology", "Pediatric Oncology", "Pediatric Pulmonology"],
    Psychiatry: ["Child and Adolescent Psychiatry", "Geriatric Psychiatry", "Forensic Psychiatry", "Addiction Psychiatry", "Consultation-Liaison Psychiatry"],
    Surgery: ["General Surgery", "Cardiothoracic Surgery", "Neurosurgery", "Pediatric Surgery", "Plastic Surgery", "Vascular Surgery"],
    Urology: ["Pediatric Urology", "Urologic Oncology", "Female Pelvic Medicine and Reconstructive Surgery", "Male Infertility", "Endourology"],
} as const;

// Extract enum values as arrays
const EDUCATION_ENUM_VALUES = Object.keys(EDUCATION_TYPES) as [keyof typeof EDUCATION_TYPES];
const SPECIALIZATION_ENUM_VALUES = Object.keys(SPECIALIZATION) as [keyof typeof SPECIALIZATION];

// Schemas for each step
export const step1Schema = z.object({
    full_name: z
        .string({
            required_error: "Full name is required",
            description: "Full name",
        })
        .min(2, { message: "Full name must be at least 2 characters long" })
        .max(255, { message: "Full name must be at most 255 characters long" }),
    bio: z
        .string({
            required_error: "Bio is required",
            description: "Bio",
        })
        .min(2, { message: "Bio must be at least 2 characters long" })
        .max(400, { message: "Bio must be at most 255 characters long" }),
    date_of_birth: z.coerce
        .date({
            required_error: "Date of birth is required",
            description: "Date of birth",
        })
        .refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" }),
    gender: z.enum(["M", "F", "R"], { message: "Please select a valid gender" }),
});

export const step2Schema = z.object({
    phone_number: z.object(
        {
            code: z.string().min(1, { message: "Country code is required" }),
            number: z.string().min(7, { message: "Phone number must be at least 7 digits long" }),
        },
        {
            required_error: "Phone number is required",
            description: "Phone number",
        }
    ),
    home_address: z.object(
        {
            street: z.string().min(1, { message: "Street is required" }),
            city: z.string().min(1, { message: "City is required" }),
            state: z.string().min(1, { message: "State is required" }),
            country: z.string().min(1, { message: "Country is required" }),
        },
        {
            required_error: "Home address is required",
            description: "Home address",
        }
    ),
});

export const step3Schema = z.object({
    years_of_experience: z.number().min(0, { message: "Years of experience must be a positive number" }),
    education: z.array(
        z.object({
            year: z.number().int().min(1900, { message: "Year must be after 1900" }),
            institution: z.string().min(1, { message: "Institution name is required" }),
            field_of_study: z.string().min(1, { message: "Field of study is required" }),
            degree: z.enum(EDUCATION_ENUM_VALUES as [string], { message: "Invalid degree" }),
        })
    ),
    specialization: z.enum(SPECIALIZATION_ENUM_VALUES, { message: "Invalid specialization", description: "Specialization", required_error: "Specialization is required" }),
    sub_specialization: z
        .string({
            required_error: "Sub-specialization is required",
            description: "Sub-specialization",
        })
        .min(1, { message: "Sub-specialization is required" }),
});

export const step4Schema = z.object({
    medical_license: z
        .string({
            required_error: "Medical license is required",
            description: "Medical license",
        })
        .min(1, { message: "Medical license is required" }),
    states_of_licensure: z.array(
        z.object({
            state: z.string().min(1, { message: "State is required" }),
            license_number: z
                .string({
                    required_error: "License number is required",
                    description: "License number",
                })
                .min(1, { message: "License number is required" }),
        }),
        {
            required_error: "At least one state of licensure is required",
            description: "State of licensure",
        }
    ),
    malpractice_insurance_details: z.object(
        {
            provider: z.string().min(1, { message: "Provider is required" }),
            policy_number: z
                .string({
                    required_error: "Policy number is required",
                    description: "Policy number",
                })
                .min(1, { message: "Policy number is required" }),
            coverage_amount_in_dollars: z
                .number({
                    required_error: "Coverage amount is required",
                    description: "Coverage amount",
                })
                .positive({ message: "Coverage amount must be a positive number" }),
        },
        {
            required_error: "Malpractice insurance details are required",
            description: "Malpractice insurance details",
        }
    ),
});

export const step5Schema = z.object({
    services_provided: z.object(
        {
            procedures: z.array(
                z.object({
                    title: z.string().min(1, { message: "Procedure title is required" }),
                    description: z.string().min(1, { message: "Procedure description is required" }),
                })
            ),
            conditions_treated: z.array(
                z.object({
                    title: z.string().min(1, { message: "Condition title is required" }),
                    description: z.string().min(1, { message: "Condition description is required" }),
                })
            ),
        },
        {
            required_error: "Services provided are required",
            description: "Services provided",
        }
    ),
    awards: z.array(
        z.object({
            title: z.string().min(1, { message: "Award title is required" }),
            year: z.number().int().min(1900, { message: "Year must be after 1900" }),
        })
    ),
    publication: z.array(
        z.object({
            title: z.string().min(1, { message: "Publication title is required" }),
            year: z.number().int().min(1900, { message: "Year must be after 1900" }),
        })
    ),
});

// Define types
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;

type StepData =
    | { step: 1; data: Partial<Step1Data> }
    | { step: 2; data: Partial<Step2Data> }
    | { step: 3; data: Partial<Step3Data> }
    | { step: 4; data: Partial<Step4Data> }
    | { step: 5; data: Partial<Step5Data> };

// Initial data for each step
const initialStep1Data: Step1Data = {
    full_name: "Dr. John Doe",
    bio: "Cardiologist with 20 years of experience",
    date_of_birth: new Date("1970-01-01"),
    gender: "M",
};

const initialStep2Data: Step2Data = {
    phone_number: { code: "+1", number: "5551234567" },
    home_address: { city: "New York", state: "NY", street: "123 Main St", country: "USA" },
};

const initialStep3Data: Step3Data = {
    years_of_experience: 20,
    education: [{ year: 1990, institution: "Harvard Medical School", field_of_study: "Medicine", degree: "MD" }],
    specialization: "Cardiology",
    sub_specialization: "Interventional Cardiology",
};

const initialStep4Data: Step4Data = {
    medical_license: "123456",
    states_of_licensure: [{ state: "NY", license_number: "NY123456" }],
    malpractice_insurance_details: { provider: "ABC Insurance", policy_number: "POL987654321", coverage_amount_in_dollars: 1000000 },
};

const initialStep5Data: Step5Data = {
    services_provided: {
        procedures: [{ title: "Angioplasty", description: "Procedure to open blocked arteries" }],
        conditions_treated: [{ title: "Heart Disease", description: "Condition affecting the heart" }],
    },
    awards: [{ title: "Best Doctor Award", year: 2015 }],
    publication: [{ title: "Research on Cardiology", year: 2010 }],
};

// Zustand Store
export const useDoctorOnboardingStore = create<{
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
    step4: Step4Data;
    step5: Step5Data;
    setData: ({ step, data }: StepData) => void;
    reset: () => void;
}>()(
    persist(
        (set) => ({
            step1: initialStep1Data,
            step2: initialStep2Data,
            step3: initialStep3Data,
            step4: initialStep4Data,
            step5: initialStep5Data,
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
                    step1: initialStep1Data,
                    step2: initialStep2Data,
                    step3: initialStep3Data,
                    step4: initialStep4Data,
                    step5: initialStep5Data,
                }),
        }),
        {
            name: "doctor-onboarding-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export function useDoctorOnboardingStep() {
    return useQueryState("step", parseAsStringLiteral(["1", "2", "3", "4", "5"]).withDefault("1"));
}
