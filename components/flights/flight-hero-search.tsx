"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Search, ArrowLeftRight, Loader2, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AirportInput } from "@/components/flights/airport-input";
import { flightSearchSchema, todayISO, type FlightSearchValues } from "@/features/flights/schema";

interface Props {
  onSearch: (values: FlightSearchValues) => void;
  isSearching?: boolean;
  initialValues?: Partial<FlightSearchValues>;
}

/**
 * Centered flights landing hero + search panel — matches Figma 279:6897.
 * Wraps the live search form so the Duffel API hand-off keeps working.
 */
export function FlightHeroSearch({ onSearch, isSearching, initialValues }: Props) {
  const [trip, setTrip] = useState<"round" | "oneway">("round");

  const { control, handleSubmit, getValues, setValue, watch, formState: { errors } } =
    useForm<FlightSearchValues>({
      resolver: zodResolver(flightSearchSchema),
      defaultValues: {
        origin: "LHR", destination: "DXB", departure_date: "", return_date: "",
        adults: 1, cabin_class: "economy", ...initialValues,
      },
    });

  function swap() {
    const { origin, destination } = getValues();
    setValue("origin", destination, { shouldValidate: true });
    setValue("destination", origin, { shouldValidate: true });
  }

  function submit(values: FlightSearchValues) {
    onSearch(trip === "oneway" ? { ...values, return_date: "" } : values);
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* subtle backdrop glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="page-container relative z-10 flex flex-col items-center py-14 text-center sm:py-20">
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-2"
        >
          <span className="h-px w-6 bg-primary/60" />
          <span className="font-mono text-[10px] tracking-[3px] text-primary">GOLAFLY · FLIGHTS</span>
        </motion.div>

        {/* title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.5 }}
          className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        >
          Find Your <span className="text-primary">Perfect</span> Flight
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18, duration: 0.5 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          Search hundreds of airlines · Compare prices instantly · Book with confidence
        </motion.p>

        {/* panel */}
        <motion.form
          onSubmit={handleSubmit(submit)} noValidate
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.5 }}
          className="mt-8 w-full max-w-[880px] rounded-2xl border border-border bg-card/80 p-3 text-left shadow-xl backdrop-blur sm:p-4"
        >
          {/* trip toggle */}
          <div className="mb-3 flex gap-1 rounded-full bg-muted/50 p-1 w-fit">
            {(["round", "oneway"] as const).map(t => (
              <button
                key={t} type="button" onClick={() => setTrip(t)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-mono text-[11px] font-bold transition-colors",
                  trip === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t === "round" ? "Round trip" : "One way"}
              </button>
            ))}
          </div>

          {/* fields */}
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_auto_1fr_150px_150px_130px]">
            {/* From */}
            <div className="rounded-xl border border-border bg-background/60 px-4 py-2.5">
              <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase">From</p>
              <Controller control={control} name="origin" render={({ field }) => (
                <AirportInput value={field.value} onChange={field.onChange} label="" placeholder="City or airport" naked />
              )} />
            </div>

            {/* swap */}
            <motion.button
              type="button" onClick={swap} whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}
              className="hidden shrink-0 place-items-center self-center rounded-full border border-border bg-background px-2.5 py-2.5 text-muted-foreground hover:border-primary/40 hover:text-primary lg:grid"
              aria-label="Swap"
            >
              <ArrowLeftRight className="size-3.5" />
            </motion.button>

            {/* To */}
            <div className="rounded-xl border border-border bg-background/60 px-4 py-2.5">
              <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase">To</p>
              <Controller control={control} name="destination" render={({ field }) => (
                <AirportInput value={field.value} onChange={field.onChange} label="" placeholder="City or airport" naked />
              )} />
            </div>

            {/* Departure */}
            <div className="rounded-xl border border-border bg-background/60 px-4 py-2.5">
              <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase">Departure</p>
              <Controller control={control} name="departure_date" render={({ field }) => (
                <input type="date" value={field.value} onChange={field.onChange} min={todayISO()}
                  className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none" />
              )} />
            </div>

            {/* Return */}
            <div className={cn("rounded-xl border border-border bg-background/60 px-4 py-2.5", trip === "oneway" && "opacity-40")}>
              <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase">Return</p>
              <Controller control={control} name="return_date" render={({ field }) => (
                <input type="date" value={field.value ?? ""} onChange={field.onChange} disabled={trip === "oneway"}
                  min={watch("departure_date") || todayISO()}
                  className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none disabled:cursor-not-allowed" />
              )} />
            </div>

            {/* Passengers */}
            <div className="rounded-xl border border-border bg-background/60 px-4 py-2.5">
              <p className="font-mono text-[9px] tracking-[1.5px] text-muted-foreground uppercase">Passengers</p>
              <Controller control={control} name="adults" render={({ field }) => (
                <select value={field.value} onChange={e => field.onChange(Number(e.target.value))}
                  className="w-full cursor-pointer bg-transparent text-[13px] font-medium text-foreground outline-none [&>option]:bg-card">
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>)}
                </select>
              )} />
            </div>
          </div>

          {(errors.origin || errors.destination || errors.departure_date) && (
            <p className="mt-2 font-mono text-[10px] text-red-500">
              {errors.origin?.message ?? errors.destination?.message ?? errors.departure_date?.message}
            </p>
          )}

          <motion.button
            type="submit" disabled={isSearching}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_30px_rgba(183,255,0,0.6)] disabled:opacity-60"
          >
            {isSearching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
            {isSearching ? "Searching…" : "Search Flights"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
