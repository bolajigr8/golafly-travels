import type { Metadata } from "next";
import { StaysDetailClient } from "./client";

export const metadata: Metadata = {
  title: "Bairro Alto Hotel | Golafly Travel",
  description: "5-star hotel in Bairro Alto, Lisbon. Exceptional rating 9.1.",
};

export default function StaysDetailPage() {
  return <StaysDetailClient />;
}
