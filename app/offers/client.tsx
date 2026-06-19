"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Headphones, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  "All Offers", "Flight Deals", "Stay Deals", "eSIM Deals",
  "Bundle Deals", "Seasonal Offers", "Bank Offers", "Last Minute",
] as const;

const DEALS = [
  {
    id: "d1", tag: "FLIGHT DEAL",  saving: "UP TO", value: "€120", unit: "OFF",
    title: "Fly More, Pay Less",
    body: "Save up to €120 on selected international flights.",
    cta: "Explore Flights", href: "/flights", expiry: "Book by 25 Jun 2025",
    image: "/figma-assets/52ad3a5556b7163c2353c30bf9cd56d938480670.png",
  },
  {
    id: "d2", tag: "STAY DEAL",    saving: "UP TO", value: "25%",  unit: "OFF",
    title: "Stay Longer, Save More",
    body: "Get up to 25% off on stays worldwide.",
    cta: "Explore Stays", href: "/stays", expiry: "Book by 30 Jun 2025",
    image: "/figma-assets/1a5249ca27eead0da1fc0881b7ecae0b2c75338a.png",
  },
  {
    id: "d3", tag: "ESIM DEAL",    saving: "UP TO", value: "30%",  unit: "OFF",
    title: "Stay Connected, Anywhere",
    body: "Up to 30% off on global eSIM plans.",
    cta: "Explore eSIM", href: "/esim", expiry: "Book by 25 Jun 2025",
    image: "/figma-assets/e35680b887266745c53c63511ea9a447a407ad98.png",
  },
  {
    id: "d4", tag: "BUNDLE DEAL",  saving: "FROM",  value: "€399", unit: "",
    title: "Bundle & Save More",
    body: "Flight + Stay + eSIM starting from €399.",
    cta: "View Bundles", href: "/offers", expiry: "Book by 30 Jun 2025",
    image: "/figma-assets/15c953d462fcd62b95f38b720fd16fa1da5a2515.png",
  },
];

const TRENDING = [
  { id: "t1", chip: "LAST MINUTE",     chipBg: "#ff4e4e", chipText: "#fff", pct: "36% OFF", title: "Paris",        flag: "🇫🇷", sub: "Return from",           price: "€159", orig: "€249", expiry: "Book by 22 Jun 2025", image: "/figma-assets/52ad3a5556b7163c2353c30bf9cd56d938480670.png" },
  { id: "t2", chip: "WEEKEND GETAWAY", chipBg: "#7c3aed", chipText: "#fff", pct: "35% OFF", title: "Dubai",        flag: "🇦🇪", sub: "Return from",           price: "€189", orig: "€289", expiry: "Book by 22 Jun 2025", image: "/figma-assets/2df3b1b014ebe65dd2deb23bba6d7adabf68b0f1.png" },
  { id: "t3", chip: "BANK OFFER",      chipBg: "#1877f2", chipText: "#fff", pct: "10% OFF", title: "Extra 10% Off", flag: "",   sub: "With selected bank cards", price: "",    orig: "",     expiry: "Valid till 30 Jun 2025", image: "/figma-assets/0ea1b376b2cae03b5838a06ad4506ace1c1bc28e.png" },
  { id: "t4", chip: "EARLY BIRD",      chipBg: "#059669", chipText: "#fff", pct: "35% OFF", title: "Athens",       flag: "🇬🇷", sub: "Return from",           price: "€129", orig: "€199", expiry: "Book by 30 Jun 2025", image: "/figma-assets/a837be17dd8bf84ef291358ad1edeee44cf92fe3.png" },
  { id: "t5", chip: "eSIM FLASH SALE", chipBg: "#b7ff00", chipText: "#000", pct: "",        title: "Global eSIM",  flag: "",   sub: "Plans starting from",    price: "€6.99", orig: "",    expiry: "Valid for 24 hours only", image: "/figma-assets/1ab2d5bd7b3edcb60f297653e10926079b48ffdc.png" },
];

const HEADER_TRUST = [
  { title: "Best Price Guarantee", body: "We match or beat any price" },
  { title: "No Hidden Fees",       body: "What you see is what you pay" },
  { title: "Instant Confirmation", body: "Book now, travel worry-free" },
];

const TRUST_BAR = [
  { icon: ShieldCheck, title: "Secure Payments",  body: "Your payment is safe with us" },
  { icon: Zap,         title: "Flexible Booking", body: "Change or cancel easily" },
  { icon: Headphones,  title: "24/7 Support",     body: "We're here to help anytime" },
  { icon: Tag,         title: "No Hidden Fees",   body: "What you see is what you pay" },
];

export function OffersClient() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All Offers");

  return (
    <div className="min-h-screen bg-black">

      {/* Header band */}
      <div className="relative overflow-hidden bg-[#050606]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 65% at 50% 50%, rgba(183,255,0,0.10) 0%, transparent 65%)" }}
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-[60px] py-10">
          <div className="flex items-start justify-between gap-8">
            {/* Left */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/[0.12]">
                  <span className="font-mono text-[13px] font-bold text-primary">%</span>
                </div>
                <span className="font-mono text-[11px] font-bold tracking-widest text-primary">Offers</span>
              </div>
              <p className="max-w-md font-mono text-[15px] text-[#a6b0a3]">
                Exclusive deals and limited-time offers, only on Golafly.
              </p>
            </div>
            {/* Trust badges */}
            <div className="flex shrink-0 items-center gap-8">
              {HEADER_TRUST.map(({ title, body }) => (
                <div key={title} className="text-right">
                  <p className="font-bold text-[13px] text-foreground">{title}</p>
                  <p className="font-mono text-[11px] text-[#a6b0a3]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-8 flex items-center gap-1 overflow-x-auto">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={cn(
                  "shrink-0 border-b-2 px-4 pb-2 font-mono text-[11px] font-bold transition-colors",
                  activeTab === t
                    ? "border-primary bg-primary/[0.04] text-primary"
                    : "border-transparent text-[#a6b0a3] hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deals grid */}
      <div className="mx-auto w-full max-w-[1280px] px-[60px] py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DEALS.map(d => (
            <motion.article
              key={d.id}
              whileHover={{ y: -3 }}
              className="overflow-hidden rounded-[18px] bg-[#0b0d0c]"
            >
              <div className="relative h-48">
                <img src={d.image} alt={d.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* Tag */}
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[rgba(18,21,19,0.75)] px-3 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur-[5px]">
                  {d.tag}
                </span>
                {/* Savings badge */}
                <div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-[rgba(18,21,19,0.75)] px-3 py-2 text-center backdrop-blur-[5px]">
                  <p className="font-mono text-[9px] text-[#a6b0a3]">{d.saving}</p>
                  <p className="font-extrabold text-[18px] leading-tight text-primary">{d.value}</p>
                  {d.unit && <p className="font-mono text-[9px] text-[#a6b0a3]">{d.unit}</p>}
                </div>
              </div>
              <div className="p-5">
                <p className="font-heading text-[20px] font-bold text-foreground">{d.title}</p>
                <p className="mt-1 text-[13px] text-[#a6b0a3]">{d.body}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={d.href}
                    className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.04] px-4 py-2 font-mono text-[11px] font-bold text-primary hover:bg-primary/10 transition-colors"
                  >
                    {d.cta} <ArrowRight className="size-3" />
                  </Link>
                  <span className="font-mono text-[10px] text-[#6c7668]">{d.expiry}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Trending Offers */}
      <div className="mx-auto w-full max-w-[1280px] px-[60px] pb-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-[28px] font-bold text-foreground">🔥 Trending Offers</h2>
            <p className="mt-1 text-[13px] text-[#a6b0a3]">Hurry! These deals are popular and won&apos;t last long.</p>
          </div>
          <Link href="/offers" className="flex items-center gap-1 font-mono text-[11px] text-primary hover:underline">
            View all offers <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TRENDING.map(t => (
            <motion.div
              key={t.id}
              whileHover={{ y: -3 }}
              className="overflow-hidden rounded-[18px] bg-[#0b0d0c]"
            >
              <div className="relative h-[120px]">
                <img src={t.image} alt={t.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span
                  className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold"
                  style={{ background: t.chipBg, color: t.chipText }}
                >
                  {t.chip}
                </span>
                {t.pct && (
                  <span className="absolute right-2 top-2 rounded-full bg-[rgba(18,21,19,0.75)] px-2 py-0.5 font-mono text-[9px] font-bold text-primary backdrop-blur-[4px]">
                    {t.pct}
                  </span>
                )}
              </div>
              <div className="space-y-1 p-3">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-[14px] text-foreground">{t.title}</p>
                  {t.flag && <span className="text-sm">{t.flag}</span>}
                </div>
                <p className="font-mono text-[10px] text-[#a6b0a3]">{t.sub}</p>
                {t.price && (
                  <p className="flex items-baseline gap-1">
                    <span className="font-heading text-[16px] font-bold text-primary">{t.price}</span>
                    {t.orig && <span className="font-mono text-[10px] text-[#6c7668] line-through">{t.orig}</span>}
                  </p>
                )}
                <p className="font-mono text-[10px] text-[#6c7668]">{t.expiry}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#0b0d0c]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-[60px] py-6">
          {TRUST_BAR.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                <Icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="font-bold text-[13px] text-foreground">{title}</p>
                <p className="font-mono text-[11px] text-[#a6b0a3]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
