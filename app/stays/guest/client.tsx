"use client";

import Link from "next/link";
import { useState } from "react";
import { User, MessageCircle } from "lucide-react";

const COUNTRY_CODES = ["+54 AR", "+55 BR", "+44 UK", "+1 US", "+49 DE", "+34 ES", "+351 PT"];

export function StaysGuestClient() {
  const [form, setForm] = useState({
    firstName: "Jennifer Marcela",
    lastName: "Hurtado Coronado",
    email: "jennimar177@gmail.com",
    countryCode: "+57",
    phone: "3146468655",
    arrival: "I'm not sure",
    requests: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const BOOKING_SUMMARY = {
    price: 810,
    breakfast: 54,
    taxes: 104,
    total: 968,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">

        {/* Step */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-[12px] font-bold text-primary-foreground">3</div>
          <span className="font-mono text-[12px] font-bold text-foreground">Your Stay</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10">
                <User className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">Guest Details</p>
                <p className="text-[12px] text-muted-foreground">Who&apos;s the lead guest for this booking?</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-muted-foreground">First name *</label>
                  <input
                    value={form.firstName}
                    onChange={e => set("firstName", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Last name *</label>
                  <input
                    value={form.lastName}
                    onChange={e => set("lastName", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Country code *</label>
                  <input
                    value={form.countryCode}
                    onChange={e => set("countryCode", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Phone number *</label>
                  <input
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Arrival */}
              <div>
                <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Estimated arrival time</label>
                <select
                  value={form.arrival}
                  onChange={e => set("arrival", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                >
                  {["I'm not sure", "Before 12:00", "12:00 – 14:00", "14:00 – 16:00", "16:00 – 18:00", "After 18:00"].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Special requests */}
              <div>
                <label className="mb-1 block font-mono text-[11px] text-muted-foreground">Special requests (optional)</label>
                <textarea
                  value={form.requests}
                  onChange={e => set("requests", e.target.value)}
                  rows={3}
                  placeholder="Let the property know if you have any requests — e.g. high floor, late arrival, quiet room..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                />
                <div className="mt-1.5 flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-2">
                  <MessageCircle className="size-3.5 shrink-0 text-muted-foreground" />
                  <p className="text-[11px] text-muted-foreground">Requests can&apos;t be guaranteed but the property will do its best to meet them.</p>
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
                  <div className="flex justify-between text-muted-foreground"><span>Breakfast included × 3</span><span>$54.00</span></div>
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
            <Link href="/stays/extras" className="font-mono text-[12px] text-muted-foreground hover:text-foreground">← Back</Link>
            <Link href="/stays/checkout" className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[0_0_14px_rgba(183,255,0,0.4)] hover:shadow-[0_0_24px_rgba(183,255,0,0.55)]">
              Continue →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
