import type { Metadata } from "next";
import { Suspense } from "react";
import { StaysSearchClient } from "./client";

export const metadata: Metadata = {
  title: "Hotel Search | Golafly Travel",
  description: "Browse and compare hotels worldwide.",
};

export default function StaysSearchPage() {
  return (
    <Suspense fallback={<div className="page-container py-10"><div className="h-64 animate-pulse rounded-2xl bg-muted" /></div>}>
      <StaysSearchClient />
    </Suspense>
  );
}
