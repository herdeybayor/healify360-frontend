"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";

function BookSessionDialog() {
    const [doctor, setDoctor] = useBookSessionQueryStates();
    const [message, setMessage] = useState(
        doctor.date
            ? `Hi Dr. Dekunle Emmanuel,

I would like to book a session with you on ${format(new Date(doctor.date), "do MMMM yyyy")} at ${doctor.time}.

Thanks,
John Doe`
            : ""
    );

    if (!doctor.doctor) return null;
    return (
        <Dialog open={!!doctor.doctor && !!doctor.name} onOpenChange={() => setDoctor({ doctor: "", name: "", date: "", time: "", step: "1" })}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="md:text-2xl font-bold">
                        {doctor.step === "1" && "Select available date"}
                        {doctor.step === "2" && "Select available time"}
                        {doctor.step === "3" && "Confirm your booking"}
                    </DialogTitle>
                    <DialogDescription>
                        {doctor.step === "1" && "Choose a date that is most convenient for you"}
                        {doctor.step === "2" && "In your local timezone (Africa/Lagos)"}
                        {doctor.step === "3" && (
                            <div>
                                <span>Session with</span> <span className="text-[#00AC30]">{doctor.name}</span>{" "}
                                <span>
                                    on {format(new Date(doctor.date), "do MMMM yyyy")} at {doctor.time}
                                </span>
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {doctor.step === "1" && (
                    <Calendar
                        //breaker
                        mode="single"
                        selected={new Date(doctor.date)}
                        onSelect={(date) => setDoctor({ date: date?.toISOString() })}
                        className="mx-auto"
                        classNames={{
                            day_today: "bg-green-200",
                        }}
                    />
                )}
                {doctor.step === "2" && (
                    <div className="md:space-y-6 space-y-4">
                        <div>
                            <p className="text-base font-[500]">🌅 Morning</p>
                            <div className="grid md:grid-cols-4 grid-cols-2 mt-2 gap-2">
                                {["08:00AM", "09:00AM", "10:00AM", "11:00AM"].map((time) => (
                                    <p
                                        key={time}
                                        onClick={() => {
                                            setDoctor({ time });
                                        }}
                                        className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${doctor.time === time && "border text-[#00AC30] border-[#00AC30]"}`}
                                    >
                                        {time}
                                    </p>
                                ))}
                                {["08:30AM", "09:30AM", "10:30AM", "11:30AM"].map((time) => (
                                    <p
                                        key={time}
                                        onClick={() => {
                                            setDoctor({ time });
                                        }}
                                        className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${doctor.time === time && "border text-[#00AC30] border-[#00AC30]"}`}
                                    >
                                        {time}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-base font-[500]">🌞 Afternoon</p>
                            <div className="grid md:grid-cols-4 grid-cols-2 mt-2 gap-2">
                                {["12:00PM", "01:00PM", "02:00PM", "03:00PM"].map((time) => (
                                    <p
                                        key={time}
                                        onClick={() => {
                                            setDoctor({ time });
                                        }}
                                        className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${doctor.time === time && "border text-[#00AC30] border-[#00AC30]"}`}
                                    >
                                        {time}
                                    </p>
                                ))}
                                {["12:30PM", "01:30PM", "02:30PM", "03:30PM"].map((time) => (
                                    <p
                                        key={time}
                                        onClick={() => {
                                            setDoctor({ time });
                                        }}
                                        className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${doctor.time === time && "border text-[#00AC30] border-[#00AC30]"}`}
                                    >
                                        {time}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-base font-[500]">🌑 Evening</p>
                            <div className="grid md:grid-cols-4 grid-cols-2 mt-2 gap-2">
                                {["04:00PM", "05:00PM", "06:00PM", "07:00PM"].map((time) => (
                                    <p
                                        key={time}
                                        onClick={() => {
                                            setDoctor({ time });
                                        }}
                                        className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${doctor.time === time && "border text-[#00AC30] border-[#00AC30]"}`}
                                    >
                                        {time}
                                    </p>
                                ))}
                                {["04:30PM", "05:30PM", "06:30PM", "07:30PM"].map((time) => (
                                    <p
                                        key={time}
                                        onClick={() => {
                                            setDoctor({ time });
                                        }}
                                        className={`border rounded-lg py-3 px-8 cursor-pointer text-center text-[#64748B] ${doctor.time === time && "border text-[#00AC30] border-[#00AC30]"}`}
                                    >
                                        {time}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {doctor.step === "3" && <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message to the doctor" rows={6} className="w-full" />}

                <div className="flex items-center space-x-4">
                    {["2", "3"].includes(doctor.step) && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                setDoctor({ step: "1" });
                            }}
                            className="w-full"
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            if (doctor.step === "1") {
                                setDoctor({ step: "2" });
                            } else if (doctor.step === "2") {
                                setDoctor({ step: "3" });
                            } else if (doctor.step === "3") {
                                setDoctor({ step: "4" });
                            }
                        }}
                        className="w-full"
                        disabled={(doctor.step === "1" && !doctor.date) || (doctor.step === "2" && !doctor.time) || (doctor.step === "3" && !message)}
                    >
                        {["1", "2"].includes(doctor.step) ? "Continue" : doctor.step === "3" ? "Confirm" : "Done"}
                    </Button>
                </div>

                {doctor.step === "4" && (
                    <div>
                        <Button
                            onClick={() => {
                                setDoctor({ step: "1" });
                            }}
                            className="w-full"
                            variant={"outline"}
                        >
                            Reschedule
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default BookSessionDialog;

export function useBookSessionQueryStates() {
    return useQueryStates(
        {
            step: parseAsStringLiteral(["1", "2", "3", "4"]).withDefault("1"),
            doctor: parseAsString.withDefault(""),
            name: parseAsString.withDefault(""),
            date: parseAsString.withDefault(""),
            time: parseAsString.withDefault(""),
        },
        {
            history: "push",
        }
    );
}
