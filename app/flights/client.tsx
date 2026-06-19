"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, AlertCircle, Plane, Tag, ShieldCheck, Headphones, ArrowRight, MapPin } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FLIGHT_TRUST = [
  { icon: Tag,         t: "Hot Deals",    b: "Best fares this week" },
  { icon: Plane,       t: "Airlines",     b: "All major carriers" },
  { icon: ShieldCheck, t: "Baggage",      b: "Rules & allowances" },
  { icon: Headphones,  t: "24/7 Support", b: "We're always here" },
];
const FLIGHT_CATS = [
  { id: "europe", label: "Fly to Europe",       body: "From $389 per person — direct & connecting routes.", cta: "See flights", image: "/figma-assets/316dcb01b5f55628ad220988d0b4ddfbfd8ebb02.png", chip: "Starter trip" },
  { id: "flex",   label: "Flexible Booking",    body: "Change your dates for free on selected fares.",      cta: "Learn more",  image: "/figma-assets/0d1748da0ac292ba8cebffb6803d9f0c4986948a.png", chip: "Travel smarter" },
];
const TOP_DEALS = [
  { name: "Madrid",    country: "Spain",  from: 389, origin: "LHR", iata: "MAD", image: "/figma-assets/784825a64a0b3a5dfe0484dd0d090c96262d3946.png" },
  { name: "Barcelona", country: "Spain",  from: 412, origin: "LHR", iata: "BCN", image: "/figma-assets/49d45ef8c87c785cd31b7aa3b93db461dc6ae6e5.png" },
  { name: "Paris",     country: "France", from: 445, origin: "LHR", iata: "CDG", image: "/figma-assets/9e7afcda4579d21255ce64e7a7cb8e9c326d9ecf.png" },
  { name: "London",    country: "UK",     from: 467, origin: "CDG", iata: "LHR", image: "/figma-assets/b841eefb5a8042e1723d1d45e652a02a748cefaf.png" },
  { name: "Miami",     country: "USA",    from: 318, origin: "JFK", iata: "MIA", image: "/figma-assets/a4769d226f1aaea194ea9d60fc4304a50ba26d96.png" },
  { name: "New York",  country: "USA",    from: 396, origin: "LHR", iata: "JFK", image: "/figma-assets/86fe4d5b2b68414a05f9da05648d2541664383d0.png" },
  { name: "Dubai",     country: "UAE",    from: 529, origin: "LHR", iata: "DXB", image: "/figma-assets/017a5ab88a2010e866d16bd4b9350bb6cf0e68fd.png" },
];

/* date ~14 days out, for quick deal searches */
function dealDate() {
  const d = new Date(); d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
}

import { FlightSearchBar }      from "@/components/flights/search-bar";
import { FlightHeroSearch }     from "@/components/flights/flight-hero-search";
import { FlightFiltersSidebar } from "@/components/flights/filters-sidebar";
import { FlightCard, FlightCardSkeleton } from "@/components/flights/flight-card";

import { useSearchFlights, useFlightOfferRequest } from "@/features/flights/hooks";
import type { FlightSearchValues } from "@/features/flights/schema";
import type { FlightOffer } from "@/features/flights/types";

const CABIN_CLASSES = ["economy", "premium_economy", "business", "first"] as const;

function currencySymbol(code: string) {
  return ({ EUR: "€", USD: "$", GBP: "£", AED: "د.إ" } as Record<string, string>)[code] ?? code + " ";
}

export function FlightsClient() {
  const [activeSort,     setActiveSort]     = useState("cheapest");
  const [selectedStops,  setSelectedStops]  = useState<string[]>(["Direct", "1 Stop", "2+ Stops"]);
  const [activeAirlines, setActiveAirlines] = useState<string[]>([]);
  const [maxPrice,       setMaxPrice]       = useState<number | null>(null);
  const [showFilters,    setShowFilters]    = useState(false);
  const [showModify,     setShowModify]     = useState(false);

  /* ── Seed from query params (homepage hand-off) ── */
  const params = useSearchParams();
  const initialValues = useMemo<FlightSearchValues | undefined>(() => {
    const origin         = params.get("origin");
    const destination    = params.get("destination");
    const departure_date = params.get("departure_date");
    if (!origin || !destination || !departure_date) return undefined;
    const cabin = params.get("cabin_class") ?? "";
    return {
      origin,
      destination,
      departure_date,
      return_date: params.get("return_date") ?? "",
      adults: Math.min(9, Math.max(1, Number(params.get("adults")) || 1)),
      cabin_class: (CABIN_CLASSES as readonly string[]).includes(cabin)
        ? (cabin as FlightSearchValues["cabin_class"])
        : "economy",
    };
  }, [params]);

  /* ── Search mutation ── */
  const {
    mutate: search,
    isPending: isSearching,
    data: searchResult,
  } = useSearchFlights();

  /* offer_request_id from the first search response */
  const offerRequestId = searchResult?.data?.id;

  /* ── Poll / fetch the offers list ── */
  const {
    data: offerRequestData,
    isLoading: isLoadingOffers,
  } = useFlightOfferRequest(offerRequestId);

  const rawOffers: FlightOffer[] = offerRequestData?.data?.offers ?? [];

  /* ── Client-side stop filter ── */
  function stopCount(offer: FlightOffer): string {
    const stops = (offer.slices[0]?.segments.length ?? 1) - 1;
    if (stops === 0) return "Direct";
    if (stops === 1) return "1 Stop";
    return "2+ Stops";
  }

  function offerAirline(offer: FlightOffer): string | undefined {
    return offer.slices[0]?.segments[0]?.marketing_carrier?.name;
  }

  /* ── Filter options derived from the actual results ── */
  const airlines = useMemo(() => {
    const minByName = new Map<string, number>();
    for (const o of rawOffers) {
      const name = offerAirline(o);
      if (!name) continue;
      const price = parseFloat(o.total_amount);
      minByName.set(name, Math.min(minByName.get(name) ?? Infinity, price));
    }
    return [...minByName.entries()]
      .map(([name, minPrice]) => ({ name, minPrice: Math.round(minPrice) }))
      .sort((a, b) => a.minPrice - b.minPrice);
  }, [rawOffers]);

  const priceBounds = useMemo(() => {
    if (rawOffers.length === 0) return undefined;
    const prices = rawOffers.map(o => parseFloat(o.total_amount));
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [rawOffers]);

  const symbol = rawOffers[0] ? currencySymbol(rawOffers[0].total_currency) : "€";

  /* Reset result-specific filters when a new search starts */
  const [lastRequestId, setLastRequestId] = useState(offerRequestId);
  if (offerRequestId !== lastRequestId) {
    setLastRequestId(offerRequestId);
    setMaxPrice(null);
    setActiveAirlines([]);
  }

  const filtered = rawOffers.filter(o => {
    if (selectedStops.length > 0 && !selectedStops.includes(stopCount(o))) return false;
    if (activeAirlines.length > 0 && !activeAirlines.includes(offerAirline(o) ?? "")) return false;
    if (maxPrice !== null && parseFloat(o.total_amount) > maxPrice) return false;
    return true;
  });

  /* ── Sorting (actually applied) ── */
  function durationMins(o: FlightOffer): number {
    return o.slices.reduce((sum, sl) => {
      const h = Number(sl.duration.match(/(\d+)H/)?.[1] ?? 0);
      const m = Number(sl.duration.match(/(\d+)M/)?.[1] ?? 0);
      return sum + h * 60 + m;
    }, 0);
  }
  const sorted = [...filtered].sort((a, b) => {
    const pa = parseFloat(a.total_amount), pb = parseFloat(b.total_amount);
    switch (activeSort) {
      case "cheapest":   return pa - pb;
      case "fastest":    return durationMins(a) - durationMins(b);
      case "best_value": return pa / Math.max(1, durationMins(a)) - pb / Math.max(1, durationMins(b));
      default:           return pa + durationMins(a) * 0.5 - (pb + durationMins(b) * 0.5); // "best" = price + time blend
    }
  });

  /* values shown on the sort chips */
  function fmtMins(total: number) {
    const h = Math.floor(total / 60), m = total % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }
  const cheapestPrice  = filtered.length ? Math.min(...filtered.map(o => parseFloat(o.total_amount))) : 0;
  const fastestMins    = filtered.length ? Math.min(...filtered.map(durationMins)) : 0;
  const SORT_CHIPS = [
    { id: "cheapest", label: "Cheapest", value: filtered.length ? `${symbol}${Math.round(cheapestPrice)}` : "—" },
    { id: "best",     label: "Best",     value: "Recommended" },
    { id: "fastest",  label: "Fastest",  value: filtered.length ? fmtMins(fastestMins) : "—" },
  ] as const;

  /* route recap for the modify bar */
  const routeFrom = offerRequestData?.data?.slices?.[0]?.origin?.iata_code ?? initialValues?.origin ?? "";
  const routeTo   = offerRequestData?.data?.slices?.[0]?.destination?.iata_code ?? initialValues?.destination ?? "";

  const toggleStop    = (s: string) =>
    setSelectedStops(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleAirline = (a: string) =>
    setActiveAirlines(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  const resetFilters  = () => {
    setSelectedStops(["Direct", "1 Stop", "2+ Stops"]);
    setActiveAirlines([]);
    setMaxPrice(null);
  };

  /* ── Handle search submit ── */
  function handleSearch(values: FlightSearchValues) {
    const slices = [
      { origin: values.origin.toUpperCase(), destination: values.destination.toUpperCase(), departure_date: values.departure_date },
    ];

    if (values.return_date) {
      slices.push({
        origin: values.destination.toUpperCase(),
        destination: values.origin.toUpperCase(),
        departure_date: values.return_date,
      });
    }

    const passengers = Array.from({ length: values.adults }, () => ({
      age: 25,
    }));

    search(
      { data: { slices, passengers, cabin_class: values.cabin_class } },
      {
        onError: (err) => {
          toast.error(
            err.response?.data?.message ?? err.message ?? "Search failed. Please try again.",
          );
        },
      },
    );
  }

  /* Auto-run the search once when arriving with params from the homepage */
  const autoSearched = useRef(false);
  useEffect(() => {
    if (!initialValues || autoSearched.current) return;
    autoSearched.current = true;
    handleSearch(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const isLoading = isSearching || isLoadingOffers;
  const hasSearched = !!offerRequestId;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Landing hero with search (only before first search) ── */}
      {!hasSearched && !isLoading && (
        <FlightHeroSearch onSearch={handleSearch} isSearching={isSearching} initialValues={initialValues} />
      )}

      {/* ── Modify-search recap + sort tabs (contained, after a search) ── */}
      {(hasSearched || isLoading) && (
        <div className="page-container pt-5">
          {/* recap row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
              {routeFrom || "—"} <span className="text-primary">→</span> {routeTo || "—"}
            </p>
            <button
              onClick={() => setShowModify(v => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-bold transition-colors",
                showModify ? "border-primary bg-primary/10 text-primary" : "border-primary/50 bg-primary/10 text-primary hover:bg-primary/15",
              )}
            >
              <SlidersHorizontal className="size-3" />
              {showModify ? "Close" : "Modify search"}
            </button>
            <span className="font-mono text-[11px] text-muted-foreground">
              {initialValues?.return_date ? "Round trip" : "One way"}
            </span>
          </div>

          {/* collapsible modify form */}
          {showModify && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="mt-3 overflow-hidden rounded-2xl border border-border"
            >
              <FlightSearchBar onSearch={(v) => { setShowModify(false); handleSearch(v); }} isSearching={isSearching} initialValues={initialValues} />
            </motion.div>
          )}

          {/* sort chips — compact group, hugs content, left-aligned */}
          <div className="mt-4 inline-flex w-fit gap-1 rounded-2xl border border-border bg-card/40 p-1.5">
            {SORT_CHIPS.map(chip => {
              const active = activeSort === chip.id;
              return (
                <motion.button
                  key={chip.id}
                  onClick={() => setActiveSort(chip.id)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-xl px-4 py-2 text-left transition-colors",
                    active
                      ? "bg-primary/15 shadow-[0_0_12px_rgba(183,255,0,0.2)] ring-1 ring-primary/50"
                      : "hover:bg-muted/40",
                  )}
                >
                  <p className={cn("font-mono text-[10px] tracking-wider", active ? "text-primary" : "text-muted-foreground")}>{chip.label}</p>
                  <p className={cn("font-heading text-[13px] font-bold", active ? "text-primary" : "text-foreground")}>{chip.value}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Trust badges */}
      {!hasSearched && !isLoading && (
        <section className="border-y border-border bg-muted/30">
          <div className="page-container grid grid-cols-2 gap-px sm:grid-cols-4">
            {FLIGHT_TRUST.map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex items-center gap-3 px-4 py-4 sm:py-5">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-foreground">{t}</p>
                  <p className="text-[11px] text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category cards */}
      {!hasSearched && !isLoading && (
        <section className="page-container py-8 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {FLIGHT_CATS.map(cat => (
              <motion.div key={cat.id} className="group relative h-52 overflow-hidden rounded-2xl" whileHover={{ scale: 1.01 }}>
                <img src={cat.image} alt={cat.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-mono text-[10px] tracking-widest text-primary">{cat.chip}</p>
                  <h2 className="font-heading text-xl font-bold text-white">{cat.label}</h2>
                  <p className="mt-1 text-[12px] text-white/80">{cat.body}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary">
                    <ArrowRight className="size-3" /> {cat.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Top deals */}
      {!hasSearched && !isLoading && (
        <section className="page-container pb-14">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[2.5px] text-primary">Top Deals</p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">Best Prices Right Now</h2>
            </div>
            <Link href="/flights" className="font-mono text-[11px] text-primary hover:underline">View all deals →</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {TOP_DEALS.map((dest, i) => (
              <motion.button
                key={dest.name}
                onClick={() => handleSearch({ origin: dest.origin, destination: dest.iata, departure_date: dealDate(), return_date: "", adults: 1, cabin_class: "economy" })}
                className="group min-w-[180px] flex-shrink-0 cursor-pointer text-left"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                {/* image with overlaid caption + price */}
                <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                  <img src={dest.image} alt={dest.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-heading text-[15px] font-bold text-white">{dest.name}</p>
                    <p className="font-mono text-[10px] text-white/70">{dest.country}</p>
                    <span className="mt-2 inline-block rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(183,255,0,0.3)]">
                      from ${dest.from}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      <div className={cn("page-container py-5 sm:py-8", !hasSearched && "hidden")}>

        {/* ── Mobile toolbar ── */}
        <div className="mb-4 flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setShowFilters(o => !o)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[11px] font-bold transition-colors",
              showFilters ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>

          <div className="flex flex-1 gap-1.5 overflow-x-auto scrollbar-hide">
            {["Direct", "1 Stop", "2+ Stops"].map(s => (
              <button
                key={s}
                onClick={() => toggleStop(s)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-2 font-mono text-[11px] font-bold transition-colors",
                  selectedStops.includes(s)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Mobile expandable filters ── */}
        {showFilters && (
          <motion.div
            className="mb-4 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FlightFiltersSidebar
              selectedStops={selectedStops}
              toggleStop={toggleStop}
              airlines={airlines}
              activeAirlines={activeAirlines}
              toggleAirline={toggleAirline}
              priceBounds={priceBounds}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              currencySymbol={symbol}
              onReset={resetFilters}
            />
          </motion.div>
        )}

        {/* ── 2-col grid (filters + results) ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">

          {/* Desktop filters */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            <FlightFiltersSidebar
              selectedStops={selectedStops}
              toggleStop={toggleStop}
              airlines={airlines}
              activeAirlines={activeAirlines}
              toggleAirline={toggleAirline}
              priceBounds={priceBounds}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              currencySymbol={symbol}
              onReset={resetFilters}
            />
          </motion.div>

          {/* Results column */}
          <div className="space-y-4">
            {/* Count + tax note */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.38 }}
            >
              <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {isLoading
                  ? "Searching…"
                  : <><span className="font-bold text-foreground">{filtered.length}</span> flights found</>
                }
              </p>
              <p className="hidden font-mono text-[10px] text-muted-foreground sm:block">Prices include taxes &amp; fees</p>
            </motion.div>

            {/* ── States ── */}

            {/* Loading skeletons */}
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <FlightCardSkeleton key={i} />)}
              </div>
            )}

            {/* Empty — no search yet */}
            {!isLoading && !hasSearched && (
              <motion.div
                className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid size-14 place-items-center rounded-full bg-primary/10">
                  <Plane className="size-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold">Find your flight</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter origin, destination, and dates above then hit Search.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Empty — searched but no results */}
            {!isLoading && hasSearched && filtered.length === 0 && (
              <motion.div
                className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="size-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No flights found for your search. Try adjusting the filters or dates.
                </p>
              </motion.div>
            )}

            {/* Flight cards */}
            {!isLoading && sorted.length > 0 && (
              <div className="space-y-3">
                {sorted.map((offer, i) => (
                  <FlightCard key={offer.id} offer={offer} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
