import type { Metadata } from "next";
import { StaysExtrasClient } from "./client";

export const metadata: Metadata = {
  title: "Enhance Your Stay | Golafly Travel",
  description: "Add optional extras to your hotel booking.",
};

export default function StaysExtrasPage() {
  return <StaysExtrasClient />;
}
