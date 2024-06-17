"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import Link from "next/link";
import { AuthLogin } from "@/http";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required" }),
});

function LoginPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
        mutationFn: AuthLogin,
        onSuccess(data) {
            const { user, token } = data?.data;
            setCookie("access-token", token.access_token);
            if (user?.role === "patient") return router.push("/patient");
            if (user?.role === "doctor") return router.push("/doctor");
        },
    });

    const onSubmit = useCallback(
        (data: z.infer<typeof formSchema>) => {
            toast.promise(login(data), {
                loading: "Logging in...",
                success: "Logged in successfully",
                error: (error) => error?.response?.data?.message || "Failed to login",
            });
        },
        [login]
    );

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Healify360</h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Continue Your Journey to Better Health. Sign in to access your account and connect with your healthcare provider.
                </p>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8 flex flex-col">
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

                            <Button type="submit" disabled={isLoggingIn}>
                                Submit &rarr;
                            </Button>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-neutral-600 text-sm dark:text-neutral-300">
                                Don&apos; have an account?{" "}
                                <Link href="/signup" className="text-primary hover:underline">
                                    Signup
                                </Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
