import type { Metadata } from "next";
import { StaysRoomsClient } from "./client";

export const metadata: Metadata = {
  title: "Choose Your Room | Golafly Travel",
  description: "Select your room and dates.",
};

export default function StaysRoomsPage() {
  return <StaysRoomsClient />;
}
