"use client";

import React from "react";

export default function PointerLockToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.4)",
        cursor: "pointer",
        fontSize: "14px",
        backdropFilter: "blur(5px)",
      }}
    >
      {enabled ? "Exit Movement" : "Start Movement"}
    </button>
  );
}
