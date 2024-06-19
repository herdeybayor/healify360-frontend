"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

function SessionPage() {
    const searchParams = useSearchParams();

    const sessionId = searchParams.get("sessionId");
    return <div>SessionPage {sessionId}</div>;
}

export default SessionPage;
