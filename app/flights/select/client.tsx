"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane, Calendar, User, Check, X,
  RefreshCw, XCircle, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProgress } from "@/components/checkout/step-progress";
import { BookingSummary, offerToBookingData } from "@/components/checkout/booking-summary";
import { useFlightOffer } from "@/features/flights/hooks";
import type { FlightOffer, FlightSlice } from "@/features/flights/types";

/* ── helpers ───────────────────────────────────────────────── */
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const fmtDur  = (iso: string) => {
  const h = iso.match(/(\d+)H/)?.[1]; const m = iso.match(/(\d+)M/)?.[1];
  return [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ") || iso;
};
const sym = (c: string) => ({ EUR: "€", USD: "$", GBP: "£", AED: "د.إ" } as Record<string, string>)[c] ?? c + " ";

/* ── fare tiers (presentational, BASIC = the live fare) ─────── */
const FARE_FEATURES = ["Personal item (10 kg)", "Carry-on bag", "Checked bag (23 kg)", "Standard seat", "Airport check-in", "Priority boarding", "Flight changes", "100% refund"] as const;
const FARE_TIERS = [
  { id: "basic", name: "BASIC",     delta: 0,      feats: [1, 0, 0, 0, 1, 0, 0, 0] },
  { id: "light", name: "LIGHT",     delta: 84.30,  feats: [1, 1, 0, 1, 1, 0, 0, 0] },
  { id: "smart", name: "SMART",     delta: 120.00, feats: [1, 1, 1, 1, 1, 1, 1, 0] },
  { id: "flex",  name: "FULL FLEX", delta: 163.82, feats: [1, 1, 1, 1, 1, 1, 1, 1] },
] as const;

export function SelectFlightClient() {
  const offerId = useSearchParams().get("offerId");
  const { data, isLoading, error } = useFlightOffer(offerId);
  const offer = data?.data;

  const [fare, setFare] = useState<string>("basic");

  if (!offerId) return <Empty title="No flight selected" body="Go back and pick a flight from the results." />;
  if (isLoading) return <LoadingState />;
  if (error || !offer) return <Empty title="Offer not found" body="This offer may have expired." error />;

  const s = sym(offer.total_currency);
  const isRound = offer.slices.length > 1;
  const out = offer.slices[0];
  const ret = offer.slices[1];
  const selectedTier = FARE_TIERS.find(t => t.id === fare)!;

  const summary = {
    ...offerToBookingData(offer),
    extras: selectedTier.delta > 0 ? [{ label: `Fare: ${selectedTier.name}`, amount: selectedTier.delta }] : [],
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">
        <StepProgress currentStep={1} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          <section className="space-y-5">

            {/* Trip recap */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-primary">
                  {isRound ? "Round Trip" : "One Way"}
                </span>
                <Link href="/flights" className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-primary">
                  <RefreshCw className="size-3" /> Change Flight
                </Link>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {fmtDate(out.departure_date)}{isRound && ret ? ` → ${fmtDate(ret.departure_date)}` : ""}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <User className="size-3.5" /> {offer.passengers.length} passenger{offer.passengers.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* selected offer row */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3">
                {out.segments[0].marketing_carrier.logo_symbol_url ? (
                  <img src={out.segments[0].marketing_carrier.logo_symbol_url} alt="" className="size-7 rounded object-contain" />
                ) : (
                  <span className="grid size-7 place-items-center rounded bg-primary/15 text-[10px] font-bold text-primary">
                    {out.segments[0].marketing_carrier.iata_code}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-foreground">
                    {out.segments[0].marketing_carrier.name} — {out.origin.iata_code}→{out.destination.iata_code}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Departure {fmtTime(out.segments[0].departing_at)} · Arrival {fmtTime(out.segments[out.segments.length - 1].arriving_at)} · Economy
                  </p>
                </div>
                <p className="font-heading text-lg font-bold text-primary">{s}{parseFloat(offer.total_amount).toLocaleString("en-GB")}</p>
              </div>
            </motion.div>

            {/* Fare class */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              <div className="flex items-baseline gap-2">
                <p className="font-heading text-base font-bold">{out.origin.iata_code} → {out.destination.iata_code}</p>
                <p className="text-xs text-muted-foreground">Choose your fare class</p>
              </div>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">Applies to both legs · per person</p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {FARE_TIERS.map(tier => {
                  const active = fare === tier.id;
                  return (
                    <motion.button
                      key={tier.id}
                      onClick={() => setFare(tier.id)}
                      whileHover={{ y: -2 }}
                      className={cn(
                        "flex flex-col rounded-xl border p-3 text-left transition-colors",
                        active ? "border-primary bg-primary/10 shadow-[0_0_14px_rgba(183,255,0,0.2)]" : "border-border hover:border-primary/30",
                      )}
                    >
                      <ul className="space-y-1.5">
                        {FARE_FEATURES.map((f, i) => (
                          <li key={f} className="flex items-center gap-1.5">
                            {tier.feats[i]
                              ? <Check className="size-3 shrink-0 text-primary" />
                              : <X className="size-3 shrink-0 text-muted-foreground/50" />}
                            <span className={cn("text-[10px]", tier.feats[i] ? "text-foreground" : "text-muted-foreground/50 line-through")}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 border-t border-border pt-2">
                        {tier.delta === 0
                          ? <p className="font-mono text-[10px] text-muted-foreground">Included<br />both legs · per person</p>
                          : <p className="font-mono text-[10px] text-foreground">+{s}{tier.delta.toFixed(2)}<br /><span className="text-muted-foreground">both legs · per person</span></p>}
                        <p className="mt-2 font-heading text-sm font-bold">{tier.name}</p>
                        <span className={cn(
                          "mt-2 block rounded-full py-1.5 text-center font-mono text-[10px] font-bold",
                          active ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground",
                        )}>
                          {active ? "✓ Selected" : "Select"}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Return flight (round trip only) */}
            {isRound && ret && (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <div className="flex items-baseline gap-2">
                  <p className="font-heading text-base font-bold">{ret.origin.iata_code} → {ret.destination.iata_code}</p>
                  <p className="text-xs text-muted-foreground">Your return flight</p>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-primary/30 bg-primary/5">
                  <ReturnRow slice={ret} symbol={s} />
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link href="/flights" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">‹ Back</Link>
              <Link
                href={`/flights/bags?offerId=${offerId}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_28px_rgba(183,255,0,0.6)]"
              >
                Continue ›
              </Link>
            </div>
          </section>

          <BookingSummary data={summary} />
        </div>
      </div>
    </div>
  );
}

/* ── return flight row ─────────────────────────────────────── */
function ReturnRow({ slice, symbol }: { slice: FlightSlice; symbol: string }) {
  const first = slice.segments[0];
  const last  = slice.segments[slice.segments.length - 1];
  const stops = slice.segments.length - 1;
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="grid size-5 place-items-center rounded-full border-2 border-primary bg-primary text-[9px] font-bold text-primary-foreground">✓</span>
      <div className="w-14">
        <p className="font-heading text-base font-bold leading-none">{fmtTime(first.departing_at)}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{slice.origin.iata_code}</p>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <p className="font-mono text-[10px] text-muted-foreground">{fmtDur(slice.duration)}</p>
        <div className="flex w-full items-center gap-1 py-0.5">
          <div className="h-px flex-1 bg-border" /><Plane className="size-3 -rotate-45 text-primary" /><div className="h-px flex-1 bg-border" />
        </div>
        <p className={cn("font-mono text-[9px]", stops === 0 ? "text-primary" : "text-muted-foreground")}>{stops === 0 ? "Direct" : `${stops} stop`}</p>
      </div>
      <div className="w-14 text-right">
        <p className="font-heading text-base font-bold leading-none">{fmtTime(last.arriving_at)}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{slice.destination.iata_code}</p>
      </div>
    </div>
  );
}

/* ── states ────────────────────────────────────────────────── */
function LoadingState() {
  return (
    <div className="page-container py-6 sm:py-10">
      <StepProgress currentStep={1} />
      <div className="mt-6 animate-pulse space-y-4">
        <div className="h-20 rounded-2xl bg-muted" />
        <div className="h-64 rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
function Empty({ title, body, error }: { title: string; body: string; error?: boolean }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      {error ? <XCircle className="size-10 text-red-500" /> : <AlertCircle className="size-10 text-muted-foreground" />}
      <p className="font-heading text-lg font-bold">{title}</p>
      <p className="text-sm text-muted-foreground">{body}</p>
      <Link href="/flights" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Back to search</Link>
    </div>
  );
}
