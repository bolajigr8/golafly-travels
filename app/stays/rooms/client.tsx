"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROOMS = [
  { id: "classic", name: "Classic Room",    desc: "City view · 26 m²",    bed: "1 Queen bed", sleeps: 2, cancel: "Free cancellation",  price: 270 },
  { id: "river",   name: "River View Room", desc: "Tagus views · 30 m²",  bed: "1 King bed",  sleeps: 2, cancel: "Free cancellation",  price: 350 },
  { id: "suite",   name: "Rooftop Suite",   desc: "Terrace · 48 m²",      bed: "1 King bed + sofa", sleeps: 3, cancel: "Non-refundable", price: 520 },
];

const NIGHTS = 3;
const TAXES  = 97;

export function StaysRoomsClient() {
  const [selected, setSelected] = useState("classic");
  const [checkIn,  setCheckIn]  = useState("2026-06-25");
  const [checkOut, setCheckOut] = useState("2026-06-28");

  const room  = ROOMS.find(r => r.id === selected) ?? ROOMS[0];
  const total = room.price * NIGHTS + TAXES;

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">

        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-[12px] font-bold text-primary-foreground">1</div>
          <span className="font-mono text-[12px] font-bold text-foreground">Your Stay</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {/* Hotel recap */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-4 border-b border-border p-4">
                <img src="/figma-assets/56e62d381b79e9f0f42965c2bfaddb38c5107fb2.png" alt="Hotel" className="h-16 w-16 rounded-xl object-cover" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Hotel</p>
                  <p className="font-bold text-foreground">Bairro Alto Hotel</p>
                  <div className="flex items-center gap-1">
                    {"★★★★★".split("").map((s, i) => <span key={i} className="text-[10px] text-amber-400">{s}</span>)}
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground">Bairro Alto, Lisbon · Portugal</p>
                </div>
              </div>

              {/* Room tabs */}
              <div className="flex border-b border-border">
                {["Standard", "Superior", "Junior"].map((tab, i) => (
                  <button
                    key={tab}
                    className={cn(
                      "flex-1 py-3 font-mono text-[11px] font-bold transition-colors",
                      i === 0 ? "border-b-2 border-primary text-primary" : "text-muted-foreground",
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Room list */}
              <div className="divide-y divide-border">
                {ROOMS.map(room => (
                  <motion.div
                    key={room.id}
                    onClick={() => setSelected(room.id)}
                    className={cn(
                      "flex cursor-pointer items-start justify-between p-4 transition-colors",
                      selected === room.id ? "bg-primary/5" : "hover:bg-muted/40",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border-2",
                        selected === room.id ? "border-primary bg-primary" : "border-border",
                      )} />
                      <div>
                        <p className="font-bold text-foreground">{room.name}</p>
                        <p className="text-[12px] text-muted-foreground">{room.desc}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">{room.bed}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">Sleeps {room.sleeps}</span>
                          <span className={cn(
                            "rounded px-1.5 py-0.5 font-mono text-[9px]",
                            room.cancel === "Free cancellation"
                              ? "bg-emerald-500/15 text-emerald-500"
                              : "bg-rose-500/15 text-rose-500",
                          )}>
                            {room.cancel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-xl font-bold text-primary">${room.price}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">per night</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dates & guests */}
            <div>
              <p className="mb-3 font-bold text-foreground">Dates &amp; guests</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-mono text-[9px] text-muted-foreground uppercase">Check-in</p>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                    className="mt-0.5 w-full bg-transparent text-[13px] font-medium text-foreground focus:outline-none" />
                </div>
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-mono text-[9px] text-muted-foreground uppercase">Check-out</p>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                    className="mt-0.5 w-full bg-transparent text-[13px] font-medium text-foreground focus:outline-none" />
                </div>
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-mono text-[9px] text-muted-foreground uppercase">Guests &amp; rooms</p>
                  <p className="mt-0.5 text-[13px] font-medium text-foreground">2 Guests · 1 Room</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="bg-primary px-4 py-3">
                <p className="font-mono text-[11px] font-bold text-primary-foreground">Your Booking</p>
                <p className="font-mono text-[9px] text-primary-foreground/70">Live Summary</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img src="/figma-assets/56e62d381b79e9f0f42965c2bfaddb38c5107fb2.png" alt="Hotel" className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-[13px] font-bold text-foreground">Bairro Alto Hotel</p>
                    <p className="font-mono text-[10px] text-muted-foreground">Bairro Alto, Lisbon</p>
                  </div>
                </div>
                <div className="space-y-1 border-t border-border pt-3 text-[12px] text-muted-foreground">
                  <p>Thu, Jun 25 — Sun, Jun 28 · 3 nights</p>
                  <p>Classic Room</p>
                  <p>2 Guests · 1 Room</p>
                </div>
                <div className="space-y-1.5 border-t border-border pt-3 text-[12px]">
                  <div className="flex justify-between text-muted-foreground">
                    <span>${room.price} × {NIGHTS} nights</span>
                    <span>${room.price * NIGHTS}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes &amp; fees</span>
                    <span>${TAXES}</span>
                  </div>
                  <div className="flex justify-between border-t border-primary/30 pt-2 font-bold text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Actions — aligned to the left content column */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="flex items-center justify-between border-t border-border pt-6">
            <Link href="/stays/ba003" className="flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground hover:text-foreground">
              ← Back to hotel
            </Link>
            <Link
              href="/stays/extras"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[0_0_14px_rgba(183,255,0,0.4)] hover:shadow-[0_0_24px_rgba(183,255,0,0.55)]"
            >
              Continue →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
