"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useCallback } from "react";
import { AuthRegister } from "@/http";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    firstName: z
        .string({ message: "First name is required" })
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(255, { message: "First name must be at most 255 characters long" }),
    lastName: z.string({ message: "Last name is required" }).min(2, { message: "Last name must be at least 2 characters long" }).max(255, { message: "Last name must be at most 255 characters long" }),
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
    role: z.string({ message: "Role is required" }),
});

function SignupPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "patient",
        },
    });

    const {} = useMutation({
        mutationFn: AuthRegister,
        onSuccess(data) {
            const { user, token } = data;
            setCookie("access-token", token.access_token);

            console.log(data);
            if (user?.role === "patient") {
                router.push("/patient");

                return;
            }
            if (user?.role === "doctor") {
                router.push("/doctor");

                return;
            }
        },
    });

    const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
        console.log(data);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Healify360</h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Your Gateway to Convenient, High-Quality Healthcare. Join us today and connect with certified doctors for seamless, remote consultations.
                </p>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8 flex flex-col">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@doe.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Register As</FormLabel>
                                        <FormControl>
                                            <Select {...field} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {[
                                                            { value: "patient", label: "Patient" },
                                                            { value: "doctor", label: "Doctor" },
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

                        <div className="mt-4 text-center">
                            <p className="text-neutral-600 text-sm dark:text-neutral-300">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
