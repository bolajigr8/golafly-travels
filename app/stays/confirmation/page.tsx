import type { Metadata } from "next";
import { StaysConfirmationClient } from "./client";

export const metadata: Metadata = {
  title: "Booking Confirmed | Golafly Travel",
  description: "Your hotel booking is confirmed.",
};

export default function StaysConfirmationPage() {
  return <StaysConfirmationClient />;
}
