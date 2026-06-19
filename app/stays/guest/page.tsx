import type { Metadata } from "next";
import { StaysGuestClient } from "./client";

export const metadata: Metadata = {
  title: "Guest Details | Golafly Travel",
  description: "Enter guest information for your hotel booking.",
};

export default function StaysGuestPage() {
  return <StaysGuestClient />;
}
