"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STOPS_OPTIONS = ["Direct", "1 Stop", "2+ Stops"] as const;

interface Props {
  selectedStops: string[];
  toggleStop: (s: string) => void;
  /** Airlines present in the current results, with their lowest total price */
  airlines: { name: string; minPrice: number }[];
  activeAirlines: string[];
  toggleAirline: (a: string) => void;
  /** Min/max total price across the current results */
  priceBounds?: { min: number; max: number };
  /** Current "up to" price — null means no cap */
  maxPrice: number | null;
  onMaxPriceChange: (v: number) => void;
  currencySymbol?: string;
  onReset?: () => void;
}

export function FlightFiltersSidebar({
  selectedStops,
  toggleStop,
  airlines,
  activeAirlines,
  toggleAirline,
  priceBounds,
  maxPrice,
  onMaxPriceChange,
  currencySymbol = "€",
  onReset,
}: Props) {
  const priceValue = maxPrice ?? priceBounds?.max ?? 0;

  return (
    <aside className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="font-heading text-sm font-bold text-foreground">Filters</p>
        {onReset && (
          <button onClick={onReset} className="font-mono text-[10px] text-primary hover:underline">
            Reset all
          </button>
        )}
      </div>

      <div className="space-y-6 p-4">
        {/* Stops */}
        <div>
          <h3 className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground">Stops</h3>
          <div className="flex flex-wrap gap-2">
            {STOPS_OPTIONS.map(stop => {
              const on = selectedStops.includes(stop);
              return (
                <motion.button
                  key={stop}
                  onClick={() => toggleStop(stop)}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-mono text-[11px] font-bold transition-colors",
                    on ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30",
                  )}
                >
                  {stop}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Max Price */}
        <div>
          <h3 className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground">Max Price</h3>
          {priceBounds ? (
            <>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">{currencySymbol}{priceBounds.min}</span>
                <span className="font-bold text-primary">up to {currencySymbol}{priceValue}</span>
              </div>
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceValue}
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </>
          ) : (
            <p className="text-[11px] text-muted-foreground">Search to filter by price.</p>
          )}
        </div>

        {/* Airlines */}
        <div>
          <h3 className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground">Airlines</h3>
          {airlines.length > 0 ? (
            <div className="space-y-1">
              {airlines.map(a => {
                const on = activeAirlines.includes(a.name);
                return (
                  <label
                    key={a.name}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors",
                      on ? "bg-primary/5" : "hover:bg-muted/40",
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className={cn(
                        "grid size-4 shrink-0 place-items-center rounded border text-[9px] font-bold transition-colors",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
                      )}>
                        {on && "✓"}
                      </span>
                      <input type="checkbox" checked={on} onChange={() => toggleAirline(a.name)} className="sr-only" />
                      <span className="truncate text-[13px] text-foreground">{a.name}</span>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">from {currencySymbol}{a.minPrice}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-[11px] text-muted-foreground">Search to filter by airline.</p>
          )}
        </div>
      </div>
    </aside>
  );
}
