import React from "react";

function MessagePage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-2xl">Messages</h1>
                <div className="flex items-center gap-4">
                    <button className="btn btn-primary">New Message</button>
                    <button className="btn btn-primary">New Group</button>
                </div>
            </div>
        </div>
    );
}

export default MessagePage;
