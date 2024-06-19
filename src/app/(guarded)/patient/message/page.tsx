import { ChatLayout } from "@/components/custom/chat/chat-layout";
import { cookies } from "next/headers";
import React from "react";

function MessagePage() {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    return (
        <div className="">
            <h1 className="font-semibold text-2xl">Messages</h1>

            <div className="z-10 border mt-8 rounded-lg w-full h-[80vh] text-sm lg:flex">
                <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
            </div>
        </div>
    );
}

export default MessagePage;
