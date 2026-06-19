"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import type { FlightOffer, FlightSlice } from "@/features/flights/types";

/* ── helpers ───────────────────────────────────────────────── */
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}
function fmtDuration(iso: string) {
  const h = iso.match(/(\d+)H/)?.[1];
  const m = iso.match(/(\d+)M/)?.[1];
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  if (m) return `${m}m`;
  return iso;
}
function stopLabel(n: number) {
  if (n === 0) return "Nonstop";
  if (n === 1) return "1 stop";
  return `${n} stops`;
}

const CUR: Record<string, string> = { EUR: "€", USD: "$", GBP: "£", AED: "د.إ" };

/* ── single leg row ────────────────────────────────────────── */
function LegRow({ slice }: { slice: FlightSlice }) {
  const first = slice.segments[0];
  const last  = slice.segments[slice.segments.length - 1];
  const stops = slice.segments.length - 1;
  const carrier = first.marketing_carrier;

  return (
    <div className="flex items-center gap-3 py-2.5">
      {/* airline */}
      <div className="flex w-10 shrink-0 justify-center">
        {carrier.logo_symbol_url ? (
          <img src={carrier.logo_symbol_url} alt={carrier.name} className="size-7 rounded object-contain" />
        ) : (
          <span className="grid size-7 place-items-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
            {carrier.iata_code ?? carrier.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* departure */}
      <div className="w-14 shrink-0 text-left">
        <p className="font-heading text-lg font-bold leading-none text-foreground">{fmtTime(first.departing_at)}</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">{slice.origin.iata_code}</p>
      </div>

      {/* route */}
      <div className="flex flex-1 flex-col items-center px-2">
        <p className="font-mono text-[10px] text-muted-foreground">{fmtDuration(slice.duration)}</p>
        <div className="flex w-full items-center gap-1 py-1">
          <span className="size-1.5 rounded-full border border-muted-foreground/50" />
          <div className="h-px flex-1 bg-border" />
          <Plane className="size-3 -rotate-45 text-primary" />
          <div className="h-px flex-1 bg-border" />
          <span className="size-1.5 rounded-full border border-muted-foreground/50" />
        </div>
        <p className={`font-mono text-[9px] ${stops === 0 ? "text-primary" : "text-muted-foreground"}`}>
          {stopLabel(stops)}{stops > 0 ? ` · via ${slice.segments[0].destination.iata_code}` : ""}
        </p>
      </div>

      {/* arrival */}
      <div className="w-14 shrink-0 text-right">
        <p className="font-heading text-lg font-bold leading-none text-foreground">{fmtTime(last.arriving_at)}</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">{slice.destination.iata_code}</p>
      </div>
    </div>
  );
}

/* ── card ──────────────────────────────────────────────────── */
export function FlightCard({ offer, index }: { offer: FlightOffer; index: number }) {
  const price  = parseFloat(offer.total_amount);
  const symbol = CUR[offer.total_currency] ?? offer.total_currency + " ";
  const cabin  = offer.passengers?.[0]?.fare_brand_name
    ?? offer.slices[0]?.fare_brand_name
    ?? "Economy";
  const multi  = offer.slices.length > 1;

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 + index * 0.05, duration: 0.36 }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* legs */}
        <div className="flex-1 divide-y divide-border px-4 sm:px-5">
          {offer.slices.map((slice) => (
            <LegRow key={slice.id} slice={slice} />
          ))}
        </div>

        {/* price + select */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-3 sm:w-44 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="order-2 sm:order-1 sm:w-full">
            <Link
              href={`/flights/select?offerId=${offer.id}`}
              className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2 font-mono text-[12px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(183,255,0,0.35)] transition-all hover:shadow-[0_0_20px_rgba(183,255,0,0.55)]"
            >
              Select
            </Link>
          </motion.div>
          <div className="order-1 text-left sm:order-2 sm:mt-2 sm:text-right">
            <p className="font-heading text-xl font-bold leading-none text-foreground">
              {symbol}{price.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 font-mono text-[9px] text-muted-foreground">
              {multi ? "round trip" : "per person"} · {cabin}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── skeleton ──────────────────────────────────────────────── */
export function FlightCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-full bg-muted" />
            <div className="h-4 w-14 rounded bg-muted" />
            <div className="h-px flex-1 bg-muted" />
            <div className="h-4 w-14 rounded bg-muted" />
          </div>
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-full bg-muted" />
            <div className="h-4 w-14 rounded bg-muted" />
            <div className="h-px flex-1 bg-muted" />
            <div className="h-4 w-14 rounded bg-muted" />
          </div>
        </div>
        <div className="flex items-center justify-end border-t border-border p-4 sm:w-44 sm:border-l sm:border-t-0">
          <div className="h-9 w-24 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
