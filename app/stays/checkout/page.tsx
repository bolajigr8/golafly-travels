import type { Metadata } from "next";
import { StaysCheckoutClient } from "./client";

export const metadata: Metadata = {
  title: "Payment | Golafly Travel",
  description: "Complete your hotel booking payment.",
};

export default function StaysCheckoutPage() {
  return <StaysCheckoutClient />;
}
