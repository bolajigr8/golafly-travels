"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, Bed, Wifi, Search, ArrowRight, ArrowLeftRight,
  Car, MapPin, Package, ChevronLeft, ChevronRight,
  Star, Heart, Shield, Zap, Headphones, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AirportInput } from "@/components/flights/airport-input";
import { flightSearchSchema, todayISO, type FlightSearchValues } from "@/features/flights/schema";

/* ── constants ───────────────────────────────────────────────── */
const SEARCH_TABS = [
  { id: "flights",  label: "Flights",  icon: Plane   },
  { id: "stays",    label: "Stays",    icon: Bed     },
  { id: "packages", label: "Packages", icon: Package },
  { id: "esim",     label: "eSIM",     icon: Wifi    },
] as const;

const POPULAR_CHIPS = [
  { label: "Dubai",    flag: "🇦🇪" },
  { label: "London",   flag: "🇬🇧" },
  { label: "Paris",    flag: "🇫🇷" },
  { label: "Istanbul", flag: "🇹🇷" },
  { label: "New York", flag: "🇺🇸" },
] as const;

const TRUST_BADGES = [
  { icon: Shield,     title: "Best Price Guarantee",  body: "We match or beat any price"       },
  { icon: Zap,        title: "Instant Confirmation",  body: "Secure checkout, instant results" },
  { icon: Wifi,       title: "Instant eSIM Delivery", body: "Stay connected anywhere"          },
  { icon: Headphones, title: "24/7 Support",           body: "We're here to help"               },
] as const;

const PACKAGES = [
  { id: "p1", city: "Barcelona Getaway",  dates: "Jun 12 – Jun 18 · 6 Nights", price: 450, was: 650,  flag: "🇪🇸", image: "/figma-assets/50af09cd9f4725b97ba0eee78b1508e467f46e7b.png" },
  { id: "p2", city: "Dubai Experience",   dates: "Jun 15 – Jun 21 · 6 Nights", price: 620, was: 890,  flag: "🇦🇪", image: "/figma-assets/b75a89a6c30f33eaadd2c912ac2869d69a86371f.png" },
  { id: "p3", city: "Istanbul Escape",    dates: "May 20 – May 25 · 5 Nights", price: 380, was: 540,  flag: "🇹🇷", image: "/figma-assets/26396d034a176d61f6145e8344f4688cfbbd339f.png" },
  { id: "p4", city: "New York City Break",dates: "Jun 10 – Jun 15 · 5 Nights", price: 520, was: 740,  flag: "🇺🇸", image: "/figma-assets/e49b71049160081e369c9f4e94ca8dfa449d8b49.png" },
  { id: "p5", city: "Tokyo Adventure",    dates: "Jul 8 – Jul 15 · 7 Nights",  price: 890, was: 1270, flag: "🇯🇵", image: "/figma-assets/e31ed10a1978df15cd132d1afc316dfea4d19e16.png" },
] as const;

const ESIM_PLANS = [
  { id: "e1", country: "Europe",        flag: "🇪🇺", coverage: "35 Countries",  data: "10 GB", days: "30 Days", speed: "4G/5G", price: 12.99, popular: true,  image: "/figma-assets/ea7457b5fb5fd1164e5fdb8b833ec074a5be5042.png" },
  { id: "e2", country: "United States", flag: "🇺🇸", coverage: "Nationwide",    data: "10 GB", days: "30 Days", speed: "4G/5G", price: 11.99, popular: false, image: "/figma-assets/3d4d91c7feb993ee2aa986b8f11fbe2cb985caef.png" },
  { id: "e3", country: "Thailand",      flag: "🇹🇭", coverage: "Nationwide",    data: "5 GB",  days: "15 Days", speed: "4G/5G", price:  6.99, popular: false, image: "/figma-assets/bea5b101047ba3f4ee50e7d24259452cf87d16e7.png" },
  { id: "e4", country: "Japan",         flag: "🇯🇵", coverage: "Nationwide",    data: "10 GB", days: "30 Days", speed: "4G/5G", price:  9.99, popular: false, image: "/figma-assets/0bfa61d5a8fe2b57c9ad48cbbfeb26574ff13c38.png" },
] as const;

const FLIGHT_DEALS = [
  { code: "IB", from: "London",  to: "Dubai",    dates: "Jun 10 – Jun 17 · Round Trip", price: 180, image: "/figma-assets/b841eefb5a8042e1723d1d45e652a02a748cefaf.png" },
  { code: "TP", from: "Paris",   to: "New York", dates: "Jun 12 – Jun 19 · Round Trip", price: 220, image: "/figma-assets/9e7afcda4579d21255ce64e7a7cb8e9c326d9ecf.png" },
  { code: "VY", from: "Madrid",  to: "Rome",     dates: "Jun 11 – Jun 15 · Round Trip", price: 120, image: "/figma-assets/784825a64a0b3a5dfe0484dd0d090c96262d3946.png" },
] as const;

const TOP_STAYS = [
  { name: "ME Dubai Hotel",         city: "Dubai",    rating: 9.2, reviews: 1230, price: 210, image: "/figma-assets/b75a89a6c30f33eaadd2c912ac2869d69a86371f.png" },
  { name: "The Hoxton, Paris",      city: "Paris",    rating: 8.9, reviews: 856,  price: 180, image: "/figma-assets/50af09cd9f4725b97ba0eee78b1508e467f46e7b.png" },
  { name: "NH Collection Madrid",   city: "Madrid",   rating: 9.0, reviews: 987,  price: 150, image: "/figma-assets/784825a64a0b3a5dfe0484dd0d090c96262d3946.png" },
] as const;

const MOBILITY = [
  { icon: Plane,  title: "Airport Transfers", body: "Reliable transfers to/from 200+ airports" },
  { icon: Car,    title: "Car Rentals",        body: "Compare the best deals from top providers" },
  { icon: MapPin, title: "City Rides",         body: "Book a ride anywhere, anytime"            },
] as const;

const BUILD_STEPS = [
  { icon: MapPin,   label: "Choose Destination", sub: "Where to?"             },
  { icon: Plane,    label: "Add Flights",         sub: "Find the best flights" },
  { icon: Bed,      label: "Add Stays",           sub: "Select your stay"      },
  { icon: Wifi,     label: "Add eSIM",            sub: "Stay connected"        },
] as const;

/* ── component ───────────────────────────────────────────────── */
export default function TravelsHome() {
  const router  = useRouter();
  const [tab,     setTab]     = useState<(typeof SEARCH_TABS)[number]["id"]>("flights");
  const [pkgIdx,  setPkgIdx]  = useState(0);
  const [liked,   setLiked]   = useState<Record<string, boolean>>({});

  const { control, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm<FlightSearchValues>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: { origin: "LHR", destination: "DXB", departure_date: "", return_date: "", adults: 1, cabin_class: "economy" },
  });

  function swapAirports() {
    const { origin, destination } = getValues();
    setValue("origin", destination, { shouldValidate: true });
    setValue("destination", origin,  { shouldValidate: true });
  }

  function onSearch(values: FlightSearchValues) {
    const p = new URLSearchParams({ origin: values.origin, destination: values.destination, departure_date: values.departure_date, adults: String(values.adults), cabin_class: values.cabin_class });
    if (values.return_date) p.set("return_date", values.return_date);
    router.push(`/flights?${p.toString()}`);
  }

  const visiblePkgs = PACKAGES.slice(pkgIdx, pkgIdx + 4);

  return (
    <div className="relative min-h-screen bg-background">

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[780px]">
        {/* Full-bleed background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <img src="/figma-assets/aeb8925614c64123a69a4f9f6e8e185e9c8a104c.png" alt="Travel" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="page-container relative z-10 pt-36 pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[860px]">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(183,255,0,0.8)]" />
              <span className="font-mono text-[11px] tracking-[2px] text-primary">Travel The World</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-6xl font-bold leading-[1.0] tracking-tight text-white sm:text-7xl">
              Travel fully <br />
              <span className="text-primary">connected.</span>
            </h1>
            <p className="mt-5 max-w-[500px] text-base leading-relaxed text-white/70">
              Flights, stays and eSIM — all in one place.<br />
              Your journey. Simplified.
            </p>

            {/* ── Search panel ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-8 w-full max-w-[860px] overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl"
            >
              {/* Tabs */}
              <div className="flex border-b border-white/10 px-2 pt-2">
                {SEARCH_TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={cn(
                      "flex items-center gap-2 rounded-t-lg px-5 py-3 font-mono text-[12px] font-bold transition-all",
                      tab === id
                        ? "bg-primary text-primary-foreground shadow-[0_0_16px_rgba(183,255,0,0.4)]"
                        : "text-white/50 hover:text-white/80",
                    )}
                  >
                    <Icon className="size-3.5" />{label}
                  </button>
                ))}
              </div>

              {/* Fields */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="p-3"
                >
                  {tab === "flights" ? (
                    <form onSubmit={handleSubmit(onSearch)} noValidate>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_160px_160px_160px]">
                        {/* From */}
                        <div className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">From</p>
                            <Controller control={control} name="origin" render={({ field }) => (
                              <AirportInput value={field.value} onChange={field.onChange} label="" placeholder="City or airport" naked />
                            )} />
                          </div>
                          <button type="button" onClick={swapAirports} className="absolute -right-4 z-10 grid size-8 place-items-center rounded-full border border-white/20 bg-background text-muted-foreground shadow hover:border-primary/40">
                            <ArrowLeftRight className="size-3.5" />
                          </button>
                        </div>
                        {/* To */}
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">To</p>
                          <Controller control={control} name="destination" render={({ field }) => (
                            <AirportInput value={field.value} onChange={field.onChange} label="" placeholder="City or airport" naked />
                          )} />
                        </div>
                        {/* Departure */}
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">Departure</p>
                          <Controller control={control} name="departure_date" render={({ field }) => (
                            <input type="date" value={field.value} onChange={field.onChange} min={todayISO()} className="w-full bg-transparent text-[13px] font-medium text-white outline-none" />
                          )} />
                        </div>
                        {/* Return */}
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">Return</p>
                          <Controller control={control} name="return_date" render={({ field }) => (
                            <input type="date" value={field.value ?? ""} onChange={field.onChange} min={watch("departure_date") || todayISO()} className="w-full bg-transparent text-[13px] font-medium text-white outline-none" />
                          )} />
                        </div>
                        {/* Passengers */}
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">Passengers</p>
                          <Controller control={control} name="adults" render={({ field }) => (
                            <select value={field.value} onChange={e => field.onChange(Number(e.target.value))} className="w-full bg-transparent text-[13px] font-medium text-white outline-none">
                              <option value={1} className="bg-background">1 Adult, Economy</option>
                              <option value={2} className="bg-background">2 Adults, Economy</option>
                            </select>
                          )} />
                        </div>
                      </div>
                      {(errors.origin || errors.destination || errors.departure_date) && (
                        <p className="mt-1.5 font-mono text-[10px] text-red-400">
                          {errors.origin?.message ?? errors.destination?.message ?? errors.departure_date?.message}
                        </p>
                      )}
                      <button type="submit" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_20px_rgba(183,255,0,0.45)] transition-all hover:shadow-[0_0_32px_rgba(183,255,0,0.65)]">
                        <Search className="size-4" /> Search Flights
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_160px_160px_160px]">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-2">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">{tab === "stays" ? "Destination" : "Country"}</p>
                          <input placeholder={tab === "stays" ? "City or hotel" : tab === "packages" ? "Where to?" : "Select country"} className="w-full bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/30" />
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">{tab === "stays" ? "Check-in" : tab === "packages" ? "Depart" : "Duration"}</p>
                          <input type={tab === "esim" ? "text" : "date"} placeholder={tab === "esim" ? "e.g. 30 days" : ""} className="w-full bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/30" />
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">{tab === "stays" ? "Check-out" : tab === "packages" ? "Return" : "Data"}</p>
                          <input type={tab === "esim" ? "text" : "date"} placeholder={tab === "esim" ? "e.g. 5 GB" : ""} className="w-full bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/30" />
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="font-mono text-[9px] tracking-[1.5px] text-white/40 uppercase">
                            {tab === "esim" ? "Network" : "Guests"}
                          </p>
                          <input placeholder={tab === "esim" ? "Any" : "2 Adults"} className="w-full bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/30" />
                        </div>
                      </div>
                      <Link href={tab === "stays" ? "/stays" : tab === "packages" ? "/offers" : "/esim"} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_20px_rgba(183,255,0,0.45)] transition-all hover:shadow-[0_0_32px_rgba(183,255,0,0.65)]">
                        <Search className="size-4" /> Search {SEARCH_TABS.find(s => s.id === tab)?.label}
                      </Link>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Popular chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-white/40">Popular:</span>
              {POPULAR_CHIPS.map(c => (
                <button key={c.label} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60 backdrop-blur transition-colors hover:border-primary/30 hover:text-primary">
                  {c.flag} {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ TRUST BAR ═════════════════════════════════════════════ */}
      <div className="border-y border-border bg-card/60 backdrop-blur">
        <div className="page-container py-0">
          <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
            {TRUST_BADGES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-center gap-3 px-6 py-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground">{title}</p>
                  <p className="text-[11px] text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FEATURED TRIPS ════════════════════════════════════════ */}
      <section className="page-container py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(183,255,0,0.7)]" />
              <span className="font-mono text-[11px] tracking-[2.5px] text-primary uppercase">Featured Trips</span>
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Handpicked packages for<br />your next adventure
            </h2>
          </div>
          <Link href="/offers" className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 sm:inline-flex">
            View All <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p) => (
              <motion.article
                key={p.id}
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Text body — top */}
                <div className="space-y-3 p-4 pb-3">
                  <div>
                    <p className="font-heading text-base font-bold leading-tight">{p.city}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{p.dates}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">From</span>
                    <span className="font-heading text-xl font-bold text-primary">€{p.price}</span>
                    <span className="font-mono text-[10px] text-muted-foreground line-through">€{p.was}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/flights" className="flex-1 rounded-full border border-border py-2 text-center font-mono text-[11px] font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                      View Trip
                    </Link>
                    <Link href="/flights" className="flex-1 rounded-full bg-primary py-2 text-center font-mono text-[11px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(183,255,0,0.3)]">
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Image — bottom */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={p.image} alt={p.city} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Badges */}
                  <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider text-white backdrop-blur">PACKAGE</span>
                  <span className="absolute right-10 top-3 rounded-full bg-primary px-2.5 py-1 font-mono text-[9px] font-bold text-primary-foreground">30% OFF</span>
                  <button
                    onClick={() => setLiked(l => ({ ...l, [p.id]: !l[p.id] }))}
                    className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-black/40 backdrop-blur"
                  >
                    <Heart className={cn("size-3.5", liked[p.id] ? "fill-red-500 text-red-500" : "text-white")} />
                  </button>
                  {/* Pills row */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {["Flight", "Hotel", "eSIM"].map(pill => (
                      <span key={pill} className="rounded-full bg-black/50 px-2 py-0.5 font-mono text-[9px] text-white/80 backdrop-blur">{pill}</span>
                    ))}
                  </div>
                  <span className="absolute bottom-3 right-3 text-base">{p.flag}</span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button onClick={() => setPkgIdx(Math.max(0, pkgIdx - 1))} className="grid size-8 place-items-center rounded-full border border-border hover:border-primary/40 disabled:opacity-30" disabled={pkgIdx === 0}>
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {PACKAGES.map((_, i) => (
                <button key={i} onClick={() => setPkgIdx(i)} className={cn("h-1.5 rounded-full transition-all", i === pkgIdx ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30")} />
              ))}
            </div>
            <button onClick={() => setPkgIdx(Math.min(PACKAGES.length - 4, pkgIdx + 1))} className="grid size-8 place-items-center rounded-full border border-border hover:border-primary/40 disabled:opacity-30" disabled={pkgIdx >= PACKAGES.length - 4}>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ eSIM ══════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-card/30">
        <div className="page-container py-16 sm:py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(183,255,0,0.7)]" />
                <span className="font-mono text-[11px] tracking-[2.5px] text-primary uppercase">Stay Connected Anywhere</span>
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                High-speed eSIM data plans<br />in <span className="text-primary">200+ countries</span>
              </h2>
            </div>
            <Link href="/esim" className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 sm:inline-flex">
              View All eSIM Plans <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {ESIM_PLANS.map(plan => (
              <motion.article
                key={plan.id}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl border border-border"
                style={{ minHeight: 360 }}
              >
                {/* Full-bleed background */}
                <img src={plan.image} alt={plan.country} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Content over image */}
                <div className="relative flex h-full min-h-[360px] flex-col justify-between p-5">
                  <div className="space-y-2">
                    {plan.popular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 font-mono text-[9px] font-bold text-primary-foreground">
                        <Star className="size-2.5 fill-primary-foreground" /> Popular
                      </span>
                    )}
                    <p className="text-3xl">{plan.flag}</p>
                    <p className="font-heading text-xl font-bold text-white">{plan.country}</p>
                    <p className="font-mono text-[10px] text-white/60">{plan.coverage}</p>
                    <div className="space-y-1 pt-1">
                      {[
                        { label: `${plan.data} Data` },
                        { label: `${plan.days} Validity` },
                        { label: `${plan.speed} Speed` },
                      ].map(s => (
                        <div key={s.label} className="flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-primary" />
                          <span className="font-mono text-[10px] text-white/70">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[10px] text-white/50">From</span>
                      <p className="font-heading text-2xl font-bold text-primary">€{plan.price.toFixed(2)}</p>
                    </div>
                    <Link href="/esim" className="block w-full rounded-xl bg-primary py-2.5 text-center font-mono text-[12px] font-bold text-primary-foreground shadow-[0_0_14px_rgba(183,255,0,0.35)] hover:shadow-[0_0_22px_rgba(183,255,0,0.55)]">
                      Get eSIM
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THREE COLUMNS ═════════════════════════════════════════ */}
      <section className="page-container py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Top Flight Deals */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Link href="/flights" className="flex items-center gap-1.5 font-mono text-[11px] text-primary hover:underline">
                View All <ArrowRight className="size-3" />
              </Link>
              <p className="font-heading text-base font-bold">Top Flight Deals</p>
            </div>
            <div className="divide-y divide-border">
              {FLIGHT_DEALS.map(d => (
                <Link key={d.code} href="/flights" className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="h-9 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
                    <img src={d.image} alt={d.from} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-foreground">{d.from} → {d.to}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{d.dates}</p>
                  </div>
                  <p className="shrink-0 font-mono text-[12px] font-bold text-primary">From €{d.price}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Stays */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Link href="/stays" className="flex items-center gap-1.5 font-mono text-[11px] text-primary hover:underline">
                View All <ArrowRight className="size-3" />
              </Link>
              <p className="font-heading text-base font-bold">Top Stays</p>
            </div>
            <div className="divide-y divide-border">
              {TOP_STAYS.map(s => (
                <Link key={s.name} href="/stays" className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-foreground">{s.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="size-2.5 fill-primary text-primary" />
                      <span className="font-mono text-[10px] text-muted-foreground">{s.rating} · {s.reviews.toLocaleString()} reviews</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[12px] font-bold text-primary">€{s.price}</p>
                    <p className="font-mono text-[9px] text-muted-foreground">/night</p>
                  </div>
                  <Heart className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobility */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-heading text-base font-bold">Mobility</p>
            </div>
            <div className="divide-y divide-border">
              {MOBILITY.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-foreground">{title}</p>
                    <p className="text-[11px] text-muted-foreground">{body}</p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BUILD YOUR TRIP ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-card/60 to-background/80" />
        <div className="page-container relative py-20 text-center sm:py-24">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(183,255,0,0.7)]" />
            <span className="font-mono text-[11px] tracking-[2.5px] text-primary uppercase">Build Your Trip</span>
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Build Your Trip in Seconds</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Plan, book and manage your entire trip in one place.
          </p>

          <div className="mt-12 flex flex-wrap items-start justify-center gap-4">
            {BUILD_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 w-[140px]">
                    <div className="grid size-14 place-items-center rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_20px_rgba(183,255,0,0.15)]">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <p className="font-heading text-[13px] font-bold text-foreground">{step.label}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{step.sub}</p>
                  </div>
                  {i < BUILD_STEPS.length - 1 && (
                    <div className="mt-6 h-px w-10 shrink-0 bg-border sm:w-16" />
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href="/flights"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_22px_rgba(183,255,0,0.45)] hover:shadow-[0_0_36px_rgba(183,255,0,0.65)]"
          >
            <Plane className="size-4" /> Start Planning
          </Link>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════════════════════ */}
      {/* <section className="bg-primary">
        <div className="page-container py-12 sm:py-14">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary-foreground/60" />
                <span className="font-mono text-[10px] tracking-[2px] text-primary-foreground/60 uppercase">Stay Connected</span>
              </div>
              <h2 className="font-heading text-2xl font-bold leading-tight text-primary-foreground sm:text-3xl">
                Exclusive trial windows,<br />offers &amp; football insights.
              </h2>
              <p className="text-sm text-primary-foreground/70">
                Join 2,400+ players, coaches, and brands receiving our monthly briefing.
              </p>
            </div>
            <div className="w-full space-y-2 sm:w-auto">
              <p className="font-mono text-[10px] text-primary-foreground/60">Get the Golafly briefing</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3 font-mono text-[13px] text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary-foreground/50 sm:w-60"
                />
                <button className="rounded-full bg-background px-6 py-3 font-mono text-[13px] font-bold text-foreground hover:bg-background/90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="font-mono text-[10px] text-center text-primary-foreground/50">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
}
