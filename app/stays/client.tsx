"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Star, Headphones, Tag, ArrowRight, MapPin, CalendarDays, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST = [
  { icon: ShieldCheck, t: "Free Cancellation", b: "On most rooms" },
  { icon: Tag,         t: "Best Price",        b: "We match any price" },
  { icon: Star,        t: "Verified Reviews",  b: "From real guests" },
  { icon: Headphones,  t: "24/7 Support",      b: "We're always here" },
];

const CATEGORIES = [
  { id: "city",  label: "City Breaks",   body: "Boutique stays in the heart of Europe's most loved cities.", cta: "Explore stays", image: "/figma-assets/68c78237f3931d7ed0236da400bde8a75038bba9.png" },
  { id: "beach", label: "Beach Escapes", body: "Resorts and villas steps from the water, from $230 a night.", cta: "See resorts",  image: "/figma-assets/d610ad3014fffd1506e50b70ad719f9da2c5b2c1.png" },
];

const DESTINATIONS = [
  { city: "Dubai",     country: "UAE",         price: 320, image: "/figma-assets/86fe4d5b2b68414a05f9da05648d2541664383d0.png" },
  { city: "Paris",     country: "France",      price: 210, image: "/figma-assets/4029fff1ab68e46771bf8d0dfad0f18a56d53bce.png" },
  { city: "Lisbon",    country: "Portugal",    price: 270, image: "/figma-assets/6e470a7dc9d338b32c2ad34720a21b76b89d16e7.png" },
  { city: "Amsterdam", country: "Netherlands", price: 185, image: "/figma-assets/0f848adbf72acca49e44c504c3ef5cd8700be276.png" },
  { city: "Tokyo",     country: "Japan",       price: 480, image: "/figma-assets/51c4bcb119c6b711a3a92a89ea8b45b0fb58f18a.png" },
  { city: "Rome",      country: "Italy",       price: 175, image: "/figma-assets/e6c08b47271d36b8aad5e4c9f4458ca0a64509c5.png" },
];

export function StaysClient() {
  const router = useRouter();
  const [dest, setDest] = useState("");
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests]     = useState("2 Guests · 1 Room");

  function search(d?: string) {
    const params = new URLSearchParams();
    if (d ?? dest) params.set("dest", d ?? dest);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    params.set("guests", guests);
    router.push(`/stays/search?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="page-container relative z-10 flex flex-col items-center py-14 text-center sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="mb-5 flex items-center gap-2"
          >
            <span className="h-px w-6 bg-primary/60" />
            <span className="font-mono text-[10px] tracking-[3px] text-primary">GOLAFLY · STAYS</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.5 }}
            className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
          >
            Find Your <span className="text-primary">Perfect</span> Stay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Compare thousands of hotels, apartments &amp; villas · Free cancellation · Best price guarantee
          </motion.p>

          {/* search panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.5 }}
            className="mt-8 w-full max-w-[880px] rounded-2xl border border-border bg-card/80 p-3 text-left shadow-xl backdrop-blur sm:p-4"
          >
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr_130px]">
              <Field icon={MapPin} label="Destination">
                <input value={dest} onChange={e => setDest(e.target.value)} placeholder="City, hotel or area"
                  className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none placeholder:text-muted-foreground/60" />
              </Field>
              <Field icon={CalendarDays} label="Check-in">
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                  className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none" />
              </Field>
              <Field icon={CalendarDays} label="Check-out">
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none" />
              </Field>
              <Field icon={Users} label="Guests & rooms">
                <select value={guests} onChange={e => setGuests(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-[13px] font-medium text-foreground outline-none [&>option]:bg-card">
                  <option>1 Guest · 1 Room</option>
                  <option>2 Guests · 1 Room</option>
                  <option>2 Guests · 2 Rooms</option>
                  <option>4 Guests · 2 Rooms</option>
                </select>
              </Field>
              <motion.button
                onClick={() => search()} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_30px_rgba(183,255,0,0.6)]"
              >
                <Search className="size-4" /> Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="border-b border-border bg-muted/30">
        <div className="page-container grid grid-cols-2 sm:grid-cols-4">
          {TRUST.map(({ icon: Icon, t, b }) => (
            <div key={t} className="flex items-center gap-3 px-4 py-5">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10"><Icon className="size-4 text-primary" /></div>
              <div>
                <p className="text-[12px] font-bold text-foreground">{t}</p>
                <p className="text-[11px] text-muted-foreground">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="page-container py-8 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id} onClick={() => search(cat.label)} whileHover={{ scale: 1.01 }}
              className="group relative h-52 overflow-hidden rounded-2xl text-left"
            >
              <img src={cat.image} alt={cat.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h2 className="font-heading text-2xl font-bold text-white">{cat.label}</h2>
                <p className="mt-1 max-w-sm text-[12px] text-white/80">{cat.body}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary">
                  <ArrowRight className="size-3" /> {cat.cta}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="page-container pb-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[2.5px] text-primary">POPULAR DESTINATIONS</p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">Where to Next?</h2>
          </div>
          <button onClick={() => search()} className="font-mono text-[11px] text-primary hover:underline">View all stays →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {DESTINATIONS.map((d, i) => (
            <motion.button
              key={d.city} onClick={() => search(d.city)}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group relative h-56 min-w-[180px] flex-shrink-0 overflow-hidden rounded-2xl text-left"
            >
              <img src={d.image} alt={d.city} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-heading text-[15px] font-bold text-white">{d.city}</p>
                <p className="font-mono text-[10px] text-white/70">{d.country}</p>
                <span className="mt-2 inline-block rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(183,255,0,0.3)]">
                  from ${d.price} / night
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── field wrapper ── */
function Field({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 px-4 py-2.5">
      <p className="flex items-center gap-1 font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase">
        <Icon className="size-2.5" /> {label}
      </p>
      {children}
    </div>
  );
}
