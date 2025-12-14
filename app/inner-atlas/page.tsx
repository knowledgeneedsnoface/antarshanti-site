"use client";

import React, { Suspense } from "react";
import InnerAtlasAppShell from "../../components/InnerAtlas/InnerAtlasAppShell";

export default function InnerAtlasPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FFFBF2]" />}>
            <InnerAtlasAppShell initialScreen="chariot" />
        </Suspense>
    );
}
