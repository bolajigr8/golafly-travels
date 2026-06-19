"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, Heart, Share2, Check, Waves, Wifi, Building2, Wine, UtensilsCrossed, BedDouble, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const IMAGES = [
  "/figma-assets/807baa32c038b5e2bfb445231c1650a5e4bac137.png",
  "/figma-assets/e324c7a87e25ff4e829957125c69753a1ee70ba0.png",
  "/figma-assets/57d9d31f42f899c69b737a73822ce10b3bb6ef51.png",
  "/figma-assets/b77ae2b4b10efa4079970164054c1d770e2ed5c2.png",
  "/figma-assets/ca632a84cc7fb6f669ce5f53ce75a5024f33def6.png",
];

const AMENITIES = [
  { icon: Waves,           label: "Spa" },
  { icon: Wifi,            label: "WiFi" },
  { icon: Building2,       label: "Rooftop" },
  { icon: Wine,            label: "Bar" },
  { icon: UtensilsCrossed, label: "Restaurant" },
];

const ROOMS = [
  {
    id: "classic",
    name: "Classic Room",
    desc: "City view · 26 m²",
    bed: "1 Queen bed",
    sleeps: 2,
    cancellation: "Free cancellation",
    price: 270,
    selected: true,
  },
  {
    id: "river",
    name: "River View Room",
    desc: "Tagus views · 30 m²",
    bed: "1 King bed",
    sleeps: 2,
    cancellation: "Free cancellation",
    price: 350,
  },
  {
    id: "rooftop",
    name: "Rooftop Suite",
    desc: "Terrace · 48 m²",
    bed: "1 King bed + sofa",
    sleeps: 3,
    cancellation: "Non-refundable",
    price: 520,
  },
];

const REVIEWS = [
  { name: "Sofia M.",   rating: 8.8, label: "Unforgettable stay",   date: "March 2026", body: "The staff were incredibly helpful and the beautiful rooms felt like home. We will absolutely return." },
  { name: "James T.",  rating: 9.0, label: "Great value for money", date: "February 2026", body: "Comfortable beds, top-notch facilities. An exceptional breakfast spread. Check-in was quick and friendly." },
  { name: "Alejo M.",  rating: 8.4, label: "Beautiful design",      date: "January 2026", body: "Colonial interiors create an open panoramic vibe. The bathroom was absolutely stunning, highly recommended." },
  { name: "Lucas P.",  rating: 9.4, label: "Felt like home",        date: "March 2026", body: "The staff went out of their way to help with restaurant recommendations. Highly recommended." },
  { name: "Bruna G.",  rating: 8.3, label: "Excellent location",    date: "February 2026", body: "Walking distance to everything we wanted to see. An amazing stay all round." },
];

const RATINGS_DETAIL = [
  { label: "Cleanliness", score: 9.6 },
  { label: "Location",    score: 9.8 },
  { label: "Staff",       score: 9.3 },
  { label: "Comfort",     score: 9.2 },
  { label: "Facilities",  score: 9.0 },
  { label: "Value",       score: 8.7 },
];

export function StaysDetailClient() {
  const [selectedRoom, setSelectedRoom] = useState("classic");
  const [checkIn,  setCheckIn]  = useState("2026-06-25");
  const [checkOut, setCheckOut] = useState("2026-06-28");
  const nights = 3;
  const basePrice = 270;
  const taxes = 97;
  const total = basePrice * nights + taxes;

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-4 sm:py-6">

        {/* Back */}
        <Link href="/stays/search" className="mb-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Back to results
        </Link>

        {/* Title row */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl">Bairro Alto Hotel</h1>
            <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
              <MapPin className="size-3.5" /> Bairro Alto, Lisbon · Portugal
            </p>
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:items-end">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] text-muted-foreground">Exceptional</span>
              <span className="flex h-8 w-10 items-center justify-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">9.1</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground">
                <Heart className="size-3.5" /> Save
              </button>
              <button className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground">
                <Share2 className="size-3.5" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-6 grid h-64 grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:h-80 md:h-96 md:grid-cols-[2fr_1fr_1fr]">
          <div className="row-span-2 overflow-hidden">
            <img src={IMAGES[0]} alt="Hotel main" className="h-full w-full object-cover" />
          </div>
          {IMAGES.slice(1, 3).map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} alt={`Hotel ${i + 2}`} className="h-full w-full object-cover" />
            </div>
          ))}
          {IMAGES.slice(3, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <img src={img} alt={`Hotel ${i + 4}`} className="h-full w-full object-cover" />
              {i === 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="font-mono text-[11px] font-bold text-white">View all images</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left content */}
          <div className="space-y-8">

            {/* Overview */}
            <section>
              <h2 className="mb-2 font-heading text-lg font-bold text-foreground">Overview</h2>
              <p className="leading-relaxed text-muted-foreground text-sm">
                An iconic address overlooking Praça Luís de Camões, with a celebrated rooftop bar, panoramic river views and elegant rooms moments from Chiado's boutiques and historic landmarks.
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Popular amenities</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AMENITIES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <span className="text-[13px] font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room selection */}
            <section>
              <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Choose your room</h2>
              <div className="space-y-3">
                {ROOMS.map(room => {
                  const active = selectedRoom === room.id;
                  return (
                    <motion.div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      whileHover={{ y: -2 }}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-all",
                        active ? "border-primary bg-primary/5 shadow-[0_0_14px_rgba(183,255,0,0.18)]" : "border-border bg-card hover:border-primary/30",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                            active ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
                          )}>
                            {active && <Check className="size-3" strokeWidth={3} />}
                          </div>
                          <div>
                            <p className="font-heading text-[15px] font-bold text-foreground">{room.name}</p>
                            <p className="text-[12px] text-muted-foreground">{room.desc}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                                <BedDouble className="size-3" /> {room.bed}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                                <Users className="size-3" /> Sleeps {room.sleeps}
                              </span>
                              <span className={cn(
                                "rounded-full px-2 py-0.5 font-mono text-[10px]",
                                room.cancellation === "Free cancellation" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500",
                              )}>
                                {room.cancellation}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-heading text-xl font-bold text-primary">${room.price}</p>
                          <p className="font-mono text-[10px] text-muted-foreground">per night</p>
                          <span className={cn(
                            "mt-2 block rounded-full px-4 py-1.5 text-center font-mono text-[11px] font-bold transition-colors",
                            active ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground",
                          )}>
                            {active ? "✓ Selected" : "Select"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-12 items-center justify-center rounded-lg bg-primary font-mono text-lg font-bold text-primary-foreground">9.1</span>
                <div>
                  <p className="font-bold text-foreground">Exceptional</p>
                  <p className="text-[12px] text-muted-foreground">967 anonymous reviews</p>
                </div>
              </div>

              {/* Rating bars */}
              <div className="mb-5 grid grid-cols-2 gap-x-8 gap-y-2">
                {RATINGS_DETAIL.map(r => (
                  <div key={r.label} className="flex items-center gap-2">
                    <span className="w-20 shrink-0 text-[12px] text-muted-foreground">{r.label}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-muted">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(r.score / 10) * 100}%` }} />
                    </div>
                    <span className="w-6 shrink-0 font-mono text-[11px] text-muted-foreground">{r.score}</span>
                  </div>
                ))}
              </div>

              {/* Review cards */}
              <div className="grid gap-3 sm:grid-cols-2">
                {REVIEWS.map(rev => (
                  <div key={rev.name} className="rounded-xl border border-border bg-card p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 font-mono text-[11px] font-bold text-primary">
                        {rev.name[0]}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-foreground">{rev.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{rev.date}</p>
                      </div>
                      <span className="ml-auto rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">{rev.rating}</span>
                    </div>
                    <p className="text-[12px] font-bold text-foreground">{rev.label}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{rev.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="mb-3 font-heading text-lg font-bold text-foreground">Location</h2>
              <div className="h-48 overflow-hidden rounded-xl border border-border bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto size-8 text-primary" />
                    <p className="mt-2 font-mono text-[11px] text-muted-foreground">Bairro Alto, Lisbon · Portugal</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar — booking */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-background p-3">
                  <p className="font-mono text-[9px] uppercase text-muted-foreground">Check-in</p>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                    className="mt-0.5 w-full bg-transparent text-[12px] font-medium text-foreground focus:outline-none" />
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <p className="font-mono text-[9px] uppercase text-muted-foreground">Check-out</p>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                    className="mt-0.5 w-full bg-transparent text-[12px] font-medium text-foreground focus:outline-none" />
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <p className="font-mono text-[9px] uppercase text-muted-foreground">Guests &amp; rooms</p>
                <p className="mt-0.5 text-[12px] font-medium text-foreground">2 Guests · 1 Room</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>${basePrice}.00 × {nights} nights</span><span className="text-foreground">${basePrice * nights}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes &amp; fees</span><span className="text-foreground">${taxes}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-heading text-sm font-bold text-foreground">Total</span>
                <span className="font-heading text-2xl font-bold text-primary">${total}</span>
              </div>

              <p className="flex items-center gap-1.5 text-[11px] text-emerald-500">
                <Check className="size-3.5" /> Free cancellation before check-in
              </p>

              <Link
                href="/stays/rooms"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-center font-bold text-primary-foreground shadow-[0_0_16px_rgba(183,255,0,0.35)] transition-all hover:shadow-[0_0_28px_rgba(183,255,0,0.5)]"
              >
                <Star className="size-4 fill-primary-foreground" /> Reserve
              </Link>

              {/* Save / Share */}
              <div className="flex items-center justify-center gap-6 border-t border-border pt-3">
                <button className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground"><Heart className="size-3.5" /> Save</button>
                <button className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground"><Share2 className="size-3.5" /> Share</button>
              </div>

              {/* Deal footer */}
              <div className="flex items-center justify-between rounded-xl bg-primary/10 px-3 py-2">
                <p>
                  <span className="font-heading text-base font-bold text-primary">${basePrice}</span>
                  <span className="ml-1 font-mono text-[11px] text-muted-foreground line-through">$340</span>
                  <span className="ml-1 font-mono text-[10px] text-muted-foreground">/ night</span>
                </p>
                <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] font-bold text-primary-foreground">21% · limited deal</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
