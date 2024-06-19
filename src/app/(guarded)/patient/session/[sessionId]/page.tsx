"use client";

import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import useUser from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { AppointmentGet } from "@/http";
import { Loader2 } from "lucide-react";

function SessionPage() {
    const { user } = useUser();
    const { sessionId } = useParams<{ sessionId: string }>();

    // {"json":{"message":"appointment retrieved","data":{"_id":"6672360425d9e732d1e75445","message":"Hello world","date_time":"2024-06-13T09:30:00.000Z","status":"PENDING","doctor_ref":"6671d7ee1a472f40205ff915","doctor_profile_ref":"6671f719fcf95751ad0fddb8","patient_ref":"66716da51fc3d380e7574171","patient_profile_ref":"6671d1ce1a472f40205ff8ba","created_at":"2024-06-19T01:36:04.284Z","updated_at":"2024-06-19T01:36:04.284Z","__v":0},"success":true}}
    const { data: appointmentQuery, isPending: loadingAppointment } = useQuery({
        queryKey: ["appointment", { id: sessionId }],
        queryFn: () => AppointmentGet(sessionId),
        enabled: !!sessionId,
    });

    const [loading, setLoading] = React.useState(false);
    return (
        <div className="">
            {(loadingAppointment || loading) && <Loader2 className="mx-auto animate-spin" size={64} />}

            {appointmentQuery && (
                <JitsiMeeting
                    domain={"healify360-web.cp.keenzchillz.properties"}
                    roomName={`Meet with ${appointmentQuery.data.doctor_profile_ref.full_name}`}
                    configOverwrite={{
                        startWithAudioMuted: false,
                        disableModeratorIndicator: true,
                        enableEmailInStats: true,
                    }}
                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    }}
                    userInfo={{
                        displayName: user?.first_name + " " + user?.last_name,
                        email: user?.email || "no-email",
                    }}
                    onApiReady={(externalApi) => {
                        setLoading(false);
                        // here you can attach custom event listeners to the Jitsi Meet External API
                        // you can also store it locally to execute commands
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = "400px";
                    }}
                />
            )}
        </div>
    );
}

export default SessionPage;
