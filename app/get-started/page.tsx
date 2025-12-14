"use client";

import React, { Suspense } from "react";
import InnerAtlasAppShell from "../../components/InnerAtlas/InnerAtlasAppShell";

export default function GetStartedPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FFFBF2]" />}>
            <InnerAtlasAppShell initialScreen="home" />
        </Suspense>
    );
}
