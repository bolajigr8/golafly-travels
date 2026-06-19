"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const PAYMENT_TABS = ["Credit Card", "Debit Card", "PayPal"] as const;

export function StaysCheckoutClient() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof PAYMENT_TABS)[number]>("Credit Card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const set = (k: string, v: string) => setCard(c => ({ ...c, [k]: v }));

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">

        {/* Step */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-[12px] font-bold text-primary-foreground">4</div>
          <span className="font-mono text-[12px] font-bold text-foreground">Your Stay</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">Payment Method</p>
                <p className="text-[12px] text-muted-foreground">Your payment is secured and encrypted</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-5 flex rounded-xl border border-border bg-muted/30 p-1">
              {PAYMENT_TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "flex-1 rounded-lg py-2 font-mono text-[12px] font-bold transition-colors",
                    tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Card form */}
            {tab !== "PayPal" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Card number</label>
                  <div className="relative">
                    <input
                      value={card.number}
                      onChange={e => set("number", e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none pr-10"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Cardholder name</label>
                  <input
                    value={card.name}
                    onChange={e => set("name", e.target.value)}
                    placeholder="As it appears on card"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Expiry MM/YY</label>
                    <input
                      value={card.expiry}
                      onChange={e => set("expiry", e.target.value)}
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-mono text-[11px] text-muted-foreground">CVV</label>
                    <input
                      value={card.cvv}
                      onChange={e => set("cvv", e.target.value)}
                      placeholder="•••"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order summary */}
            <div className="mt-5 rounded-xl border border-border bg-background p-4">
              <div className="mb-3 space-y-1 text-[12px] text-muted-foreground">
                <p className="font-bold text-foreground">Bairro Alto Hotel · Classic Room</p>
                <p>Thu, Jun 25 — Sun, Jun 28 · 3 nights</p>
              </div>
              <div className="space-y-1.5 border-t border-border pt-3 text-[12px]">
                <div className="flex justify-between text-muted-foreground"><span>$270 × 3 nights</span><span>$810.00</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Add-ons</span><span>$54.00</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Taxes &amp; fees</span><span>$104.00</span></div>
                <div className="flex justify-between border-t border-border pt-2 font-bold text-foreground">
                  <span>Total</span>
                  <span>$968.00</span>
                </div>
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
                  <div className="flex justify-between text-muted-foreground"><span>$270 × 3 nights</span><span>$810.00</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Breakfast × 3</span><span>$54.00</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Taxes &amp; fees</span><span>$104.00</span></div>
                  <div className="flex justify-between border-t border-primary/30 pt-2 font-bold text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">$968.00</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="flex items-center justify-between border-t border-border pt-6">
            <Link href="/stays/guest" className="font-mono text-[12px] text-muted-foreground hover:text-foreground">← Back</Link>
            <button
              onClick={() => router.push("/stays/confirmation")}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[0_0_14px_rgba(183,255,0,0.4)] hover:shadow-[0_0_24px_rgba(183,255,0,0.55)]"
            >
              <Lock className="size-4" /> Pay $968.00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
