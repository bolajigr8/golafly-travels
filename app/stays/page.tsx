import type { Metadata } from "next";
import { StaysClient } from "./client";

export const metadata: Metadata = {
  title: "Stays | Golafly Travel",
  description: "Find and book hotels, apartments and resorts worldwide.",
};

export default function StaysPage() {
  return <StaysClient />;
}
