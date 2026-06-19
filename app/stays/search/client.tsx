"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Heart, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_TABS = [
  { id: "lowest",    label: "Lowest Price",  value: "$270 / night" },
  { id: "best",      label: "Best Match",    value: "Recommended",  active: true },
  { id: "top_rated", label: "Top Rated",     value: "9.1 / 10" },
] as const;

const AMENITY_FILTERS = ["WiFi", "Spa", "Restaurant", "Bar", "Rooftop"];
const STAR_FILTERS    = [5, 4, 3];
const GUEST_FILTERS   = [
  { label: "Wonderful", min: 9 },
  { label: "Very good", min: 8 },
  { label: "Good",      min: 7 },
];

const HOTELS = [
  {
    id: "ba003",
    badge: "-21%",
    type: "Hotel",
    name: "Bairro Alto Hotel",
    rating: 9.1,
    ratingLabel: "Exceptional",
    reviews: 967,
    location: "Bairro Alto, Lisbon",
    price: 270,
    oldPrice: 340,
    amenities: ["Spa", "WiFi", "Rooftop", "Bar", "Restaurant"],
    image: "/figma-assets/56e62d381b79e9f0f42965c2bfaddb38c5107fb2.png",
    stars: 5,
  },
];

export function StaysSearchClient() {
  const [activeSort, setActiveSort] = useState<string>("best");
  const [showFilters, setShowFilters] = useState(false);
  const [starFilter, setStarFilter]   = useState<number[]>([5]);
  const [amenities,  setAmenities]    = useState<string[]>([]);

  const toggleAmenity = (a: string) =>
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  const toggleStar = (s: number) =>
    setStarFilter(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-5 sm:py-8">

        {/* Location + search bar */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-full bg-primary/15">
              <MapPin className="size-3.5 text-primary" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">Lisbon</span>
            <span className="text-sm text-muted-foreground">· 2 Guests · 1 Room</span>
          </div>
          <button className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] font-bold text-primary transition-colors hover:bg-primary/20">
            Modify search
          </button>
        </div>

        {/* Sort tabs */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit gap-1 overflow-x-auto rounded-2xl border border-border bg-card/40 p-1.5 scrollbar-hide">
            {SORT_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSort(tab.id)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-left transition-colors",
                  activeSort === tab.id
                    ? "bg-primary/15 ring-1 ring-primary/50 shadow-[0_0_12px_rgba(183,255,0,0.2)]"
                    : "hover:bg-muted/40",
                )}
              >
                <p className={cn("font-mono text-[10px] tracking-wider", activeSort === tab.id ? "text-primary" : "text-muted-foreground")}>{tab.label}</p>
                <p className={cn("mt-0.5 font-heading text-[13px] font-bold", activeSort === tab.id ? "text-primary" : "text-foreground")}>{tab.value}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className="flex items-center gap-1.5 font-mono text-[11px] text-primary lg:hidden"
          >
            <SlidersHorizontal className="size-3.5" /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">

          {/* Sidebar filters */}
          <aside className={cn("space-y-6 text-sm", showFilters ? "block" : "hidden lg:block")}>
            {/* Price */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-bold text-foreground">Price / night</p>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>$270</span>
                <span className="text-primary font-bold">$270</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-primary/20">
                <div className="h-1 rounded-full bg-primary" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Star rating */}
            <div>
              <p className="mb-2 font-bold text-foreground">Star rating</p>
              <div className="space-y-2">
                {STAR_FILTERS.map(s => (
                  <label key={s} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={starFilter.includes(s)}
                      onChange={() => toggleStar(s)}
                      className="accent-primary"
                    />
                    <span className="flex items-center gap-1 text-muted-foreground">
                      {"★".repeat(s)}
                      <span className="text-[10px]">{s}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guest rating */}
            <div>
              <p className="mb-2 font-bold text-foreground">Guest rating</p>
              <div className="space-y-2">
                {GUEST_FILTERS.map(g => (
                  <div key={g.label} className="flex items-center justify-between text-muted-foreground">
                    <span>{g.label}</span>
                    <span className="font-mono text-[10px]">{g.min}+</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <p className="mb-2 font-bold text-foreground">Amenities</p>
              <div className="space-y-2">
                {AMENITY_FILTERS.map(a => (
                  <label key={a} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={amenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                      className="accent-primary"
                    />
                    <span className="text-muted-foreground">{a}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property type */}
            <div>
              <p className="mb-2 font-bold text-foreground">Property type</p>
            </div>

            {/* Map view */}
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="relative h-36 bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 font-mono text-[11px] text-foreground backdrop-blur">
                    <MapPin className="size-3.5 text-primary" /> View on map
                  </button>
                </div>
              </div>
            </div>

            <button className="font-mono text-[11px] text-primary hover:underline">Reset all filters</button>
          </aside>

          {/* Results */}
          <div className="space-y-4">
            <p className="font-mono text-[11px] text-muted-foreground">
              <span className="font-bold text-foreground">{HOTELS.length}</span> stay found in Lisbon
            </p>

            {HOTELS.map((hotel, i) => (
              <motion.div
                key={hotel.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-60">
                    {hotel.badge && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                        {hotel.badge}
                      </span>
                    )}
                    <button className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur">
                      <Heart className="size-4" />
                    </button>
                    <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{hotel.type}</p>
                        <h3 className="mt-0.5 font-heading text-lg font-bold text-foreground">{hotel.name}</h3>
                        <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                          <MapPin className="size-3" /> {hotel.location}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {hotel.amenities.map(a => (
                            <span key={a} className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <div className="flex items-center gap-2 sm:justify-end">
                          <span className="font-mono text-[11px] text-muted-foreground">{hotel.ratingLabel}</span>
                          <span className="flex h-7 w-9 items-center justify-center rounded-lg bg-primary font-mono text-[12px] font-bold text-primary-foreground">
                            {hotel.rating}
                          </span>
                        </div>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{hotel.reviews} reviews</p>
                        <div className="mt-2">
                          {hotel.oldPrice && (
                            <p className="font-mono text-[11px] text-muted-foreground line-through">${hotel.oldPrice}</p>
                          )}
                          <p className="font-heading text-2xl font-bold text-primary">${hotel.price}</p>
                          <p className="font-mono text-[10px] text-muted-foreground">per night</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                      <Link
                        href="/stays/ba003"
                        className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 font-mono text-[12px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(183,255,0,0.3)] transition-all hover:shadow-[0_0_20px_rgba(183,255,0,0.5)]"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
