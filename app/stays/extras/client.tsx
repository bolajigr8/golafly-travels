"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Car, Clock, LogOut, ParkingSquare, Shield } from "lucide-react";

const EXTRAS = [
  { id: "breakfast",  icon: Coffee,        label: "Breakfast included",  desc: "Daily buffet breakfast for all guests",             price: 18,  per: "/ night" },
  { id: "transfer",   icon: Car,           label: "Airport transfer",    desc: "Private round-trip airport pickup & drop-off",      price: 45,  per: "/ stay"  },
  { id: "earlyin",    icon: Clock,         label: "Early check-in",      desc: "Guaranteed room from 9:00 AM on arrival day",       price: 25,  per: "/ stay"  },
  { id: "lateout",    icon: LogOut,        label: "Late check-out",      desc: "Keep your room until 4:00 PM on departure",         price: 25,  per: "/ stay"  },
  { id: "parking",    icon: ParkingSquare, label: "On-site parking",     desc: "Secure covered parking, in & out access",           price: 15,  per: "/ night" },
  { id: "insurance",  icon: Shield,        label: "Travel insurance",    desc: "Free cancellation & medical coverage",              price: 12,  per: "/ night" },
];

const NIGHTS = 3;
const BASE   = 270 * NIGHTS; // $810
const TAXES  = 97;

export function StaysExtrasClient() {
  const [added, setAdded] = useState<string[]>([]);

  const toggle = (id: string) =>
    setAdded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const addonsTotal = EXTRAS
    .filter(e => added.includes(e.id))
    .reduce((sum, e) => sum + (e.per === "/ night" ? e.price * NIGHTS : e.price), 0);

  const total = BASE + addonsTotal + TAXES;

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">

        {/* Step */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-[12px] font-bold text-primary-foreground">2</div>
          <span className="font-mono text-[12px] font-bold text-foreground">Your Stay</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10">
                  <Coffee className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Enhance your stay</p>
                  <p className="text-[12px] text-muted-foreground">Optional extras — add now, pay at checkout</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {EXTRAS.map(extra => {
                  const Icon = extra.icon;
                  const isAdded = added.includes(extra.id);
                  return (
                    <motion.div
                      key={extra.id}
                      className="rounded-xl border border-border bg-background p-4"
                      animate={{ borderColor: isAdded ? "rgba(183,255,0,0.5)" : undefined }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid size-9 place-items-center rounded-lg bg-primary/10">
                          <Icon className="size-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-foreground">{extra.label}</p>
                          <p className="text-[11px] text-muted-foreground">{extra.desc}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="font-mono text-[12px] font-bold text-foreground">
                              ${extra.price} <span className="text-muted-foreground font-normal">{extra.per}</span>
                            </p>
                            <button
                              onClick={() => toggle(extra.id)}
                              className={
                                isAdded
                                  ? "rounded-full bg-primary/15 px-3 py-1 font-mono text-[11px] font-bold text-primary"
                                  : "rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary/30"
                              }
                            >
                              {isAdded ? "✓ Added" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                    <span>$270 × 3 nights</span><span>$810</span>
                  </div>
                  <AnimatePresence>
                    {added.map(id => {
                      const e = EXTRAS.find(ex => ex.id === id)!;
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between text-muted-foreground"
                        >
                          <span>{e.label}</span>
                          <span>${e.per === "/ night" ? e.price * NIGHTS : e.price}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes &amp; fees</span><span>${TAXES}</span>
                  </div>
                  <div className="flex justify-between border-t border-primary/30 pt-2 font-bold text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">${total}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="flex items-center justify-between border-t border-border pt-6">
            <Link href="/stays/rooms" className="font-mono text-[12px] text-muted-foreground hover:text-foreground">← Back</Link>
            <Link href="/stays/guest" className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[0_0_14px_rgba(183,255,0,0.4)] hover:shadow-[0_0_24px_rgba(183,255,0,0.55)]">
              Continue →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
