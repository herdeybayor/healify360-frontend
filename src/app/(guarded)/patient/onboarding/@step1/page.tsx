"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Step1Data, step1Schema, usePatientOnboardingStep, usePatientOnboardingStore } from "@/store/patient-onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

function PatientOnboarding2() {
    const { step1, setData } = usePatientOnboardingStore();
    const [currentStep, setCurrentStep] = usePatientOnboardingStep();

    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: step1,
    });

    const onSubmit = useCallback(
        (data: Step1Data) => {
            setData({ step: 1, data });
            setCurrentStep("2");
        },
        [setData, setCurrentStep]
    );
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8 flex flex-col">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Adio Aina" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>Date of birth</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Select your date of birth" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {[
                                                    { value: "M", label: "Male" },
                                                    { value: "F", label: "Female" },
                                                    { value: "O", label: "Other" },
                                                ].map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <Button type="submit" className="mt-8 w-full">
                            Submit &rarr;
                        </Button>
                    </div>
                </form>
                <p className="text-sm mt-4 text-primary font-semibold">Step 0{currentStep}/03</p>
            </Form>
        </div>
    );
}

export default PatientOnboarding2;
