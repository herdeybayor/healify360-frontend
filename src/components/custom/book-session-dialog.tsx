"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import { AppointmentBook } from "@/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarIcon, CheckCircle, HourglassIcon } from "lucide-react";

function getISODateTime(date: string, time: string) {
    const [timePart, period] = time.split(/(AM|PM)/);
    let [hour, minute] = timePart.split(":").map(Number);

    if (period === "PM" && hour !== 12) {
        hour += 12;
    } else if (period === "AM" && hour === 12) {
        hour = 0;
    }

    const [year, month, day] = date.split("-").map(Number);

    console.log(year, month, day, hour, minute);
    // Month is zero-based in JavaScript Date
    const isoString = new Date(year, month - 1, day, hour, minute).toISOString();
    return isoString;
}

function BookSessionDialog() {
    const [doctor, setDoctor] = useBookSessionQueryStates();
    const [message, setMessage] = useState("");

    const { mutateAsync: bookSession } = useMutation({
        mutationFn: AppointmentBook,
        onSuccess() {
            setDoctor({
                step: "4",
            });
        },
    });

    // { "message": "I no sick, but they say make I see doctor", // please send the date in this format exactly "date_time": "2024-06-28T21:00:00+01:00", "doctor_id": "666e0de6cc061c723a3557d9" }

    const handleBookSession = useCallback(() => {
        const payload = {
            message,
            date_time: getISODateTime(doctor.date.split("T")[0], doctor.time),
            doctor_id: doctor.doctor,
        };

        toast.promise(bookSession(payload), {
            loading: "Booking session...",
            success: "Session booked successfully",
            error: (error) => error.response?.data.message || "An error occurred",
        });
    }, [bookSession, doctor.date, doctor.doctor, doctor.time, message]);

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
                            <p>
                                <span>Session with</span> <span className="text-[#00AC30]">{doctor.name}</span>{" "}
                                <span>
                                    on {format(new Date(doctor.date), "do MMMM yyyy")} at {doctor.time}
                                </span>
                            </p>
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

                {doctor.step === "4" && (
                    <div>
                        <CheckCircle width={100} height={100} className="mx-auto" />
                        <h4 className="text-center text-3xl font-bold my-4 leading-normal">
                            Your appointment has been <br /> booked!!
                        </h4>
                        <p className="text-sm font-semibold text-[#475569]">Booking session with</p>
                        <div className="bg-[#E2E8F0] p-2 rounded-2xl my-2">
                            <div className="text-[#475569] border-l-4 border-[#00AC30] pl-2">
                                <p>{doctor.name}</p>
                                <div className="flex gap-2 items-center mt-2">
                                    <p className="flex items-center gap-2">
                                        <CalendarIcon size={20} /> <span>{format(new Date(doctor.date), "do MMMM yyyy")}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <HourglassIcon size={20} /> <span>{doctor.time}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                                handleBookSession();
                            } else if (doctor.step === "4") {
                                setDoctor({ doctor: "", name: "", date: "", time: "", step: "1" });
                            }
                        }}
                        className="w-full"
                        disabled={(doctor.step === "1" && !doctor.date) || (doctor.step === "2" && !doctor.time) || (doctor.step === "3" && !message)}
                    >
                        {["1", "2"].includes(doctor.step) ? "Continue" : doctor.step === "3" ? "Confirm Booking" : "Done"}
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
