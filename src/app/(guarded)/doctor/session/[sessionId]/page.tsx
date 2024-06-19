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
                    roomName={`Meet with ${appointmentQuery.data.patient_profile_ref.full_name}`}
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
