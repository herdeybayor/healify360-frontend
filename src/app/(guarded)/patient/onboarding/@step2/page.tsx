"use client";

import { PhoneInput, getPhoneData } from "@/components/custom/phone-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Step2Data, step2Schema, usePatientOnboardingStep, usePatientOnboardingStore } from "@/store/patient-onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

function PatientOnboarding2() {
    const { step2, setData } = usePatientOnboardingStore();
    const [currentStep, setCurrentStep] = usePatientOnboardingStep();

    const form = useForm<Step2Data>({
        resolver: zodResolver(step2Schema),
        defaultValues: step2,
    });

    const onSubmit = useCallback(
        (data: Step2Data) => {
            const { isValid: isPhoneNumberValid } = getPhoneData(data.phone_number);
            if (!isPhoneNumberValid) {
                form.setError("phone_number", { message: "Invalid phone number" });
                return;
            }

            const { isValid: isEmergencyPhoneNumberValid } = getPhoneData(data.emergency_contact.phone);
            if (!isEmergencyPhoneNumberValid) {
                form.setError("emergency_contact.phone", { message: "Invalid phone number" });
                return;
            }
            setData({ step: 2, data });
            setCurrentStep("3");
        },
        [setData, setCurrentStep]
    );
    return (
        <div className="max-w-md">
            <h1 className="font-semibold text-2xl">Contact and Demographic Information</h1>
            <p className="mt-4 text-muted-foreground">Collecting detailed contact and demographic information to stay connected and understand the patient's background.</p>
            <div className="md:mt-8 mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8 flex flex-col">
                        <FormField
                            control={form.control}
                            name="phone_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <PhoneInput
                                            // breaker
                                            placeholder="+2348012345678"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="home_address.street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Street" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="home_address.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="home_address.state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="State" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="home_address.country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <h4 className="font-semibold text-lg">Emergency Contact</h4>

                        <FormField
                            control={form.control}
                            name="emergency_contact.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="emergency_contact.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="emergency_contact.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <PhoneInput
                                            // breaker
                                            placeholder="+2348012345678"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="emergency_contact.relationship"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Relationship</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Relationship" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="items-center flex gap-4 flex-row">
                            <Button variant="outline" type="button" className="mt-8 w-full" onClick={() => setCurrentStep("1")}>
                                Back
                            </Button>
                            <Button type="submit" className="mt-8 w-full">
                                Continue
                            </Button>
                        </div>
                    </form>
                    <p className="text-sm mt-4 text-primary font-semibold">Step 0{currentStep}/03</p>
                </Form>
            </div>
        </div>
    );
}

export default PatientOnboarding2;
