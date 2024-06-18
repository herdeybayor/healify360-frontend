import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SessionsPage() {
    return (
        <div>
            <h1 className="font-semibold text-2xl mb-4">Sessions</h1>
            <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <div>upcoming</div>
                </TabsContent>
                <TabsContent value="cancelled">
                    <div>cancelled</div>
                </TabsContent>
                <TabsContent value="all">
                    <div>all</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default SessionsPage;
