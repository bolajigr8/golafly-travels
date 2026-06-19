"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane, Bed, Wifi, CreditCard, User, Search,
  ChevronDown, MessageCircle, Mail, MessageSquare,
  ShieldCheck, Zap, Headphones, Tag, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    icon: Plane,
    title: "Flights",
    links: ["Booking issues", "Changes & cancellations", "Refunds & compensation"],
  },
  {
    icon: Bed,
    title: "Stays",
    links: ["Reservation details", "Check-in / check-out", "Property issues"],
  },
  {
    icon: Wifi,
    title: "eSIM",
    links: ["Installation guide", "Activation & usage", "Troubleshooting"],
  },
  {
    icon: CreditCard,
    title: "Payments",
    links: ["Payment methods", "Failed payments", "Refund timelines"],
  },
  {
    icon: User,
    title: "Account",
    links: ["Login & security", "Profile settings", "Manage bookings"],
  },
];

const FAQS = [
  "How do I install my eSIM?",
  "Can I cancel or change my flight after booking?",
  "When will I receive my booking confirmation?",
  "What happens if my hotel cancels my reservation?",
  "How do refunds work?",
  "Why is my eSIM not connecting to the network?",
];

const STATUS = [
  { name: "Flights",       state: "Operational" },
  { name: "Stays",         state: "Operational" },
  { name: "eSIM Delivery", state: "Operational" },
  { name: "Payments",      state: "Operational" },
];

const ESIM_STEPS = [
  "Buy your eSIM plan",
  "Scan the QR code",
  "Activate & enjoy data",
];

const SUPPORT = [
  { icon: MessageCircle, title: "Live Chat",      body: "Chat with our agents in real time", cta: "Chat now" },
  { icon: Mail,          title: "Email Support",  body: "We'll get back to you via email",   cta: "Email us" },
  { icon: MessageSquare, title: "WhatsApp",       body: "Message us on WhatsApp",            cta: "Message us" },
];

const ARTICLES = [
  {
    title: "Travel planning",
    body: "Everything you need to plan your trip",
    count: "12 articles",
    image: "/figma-assets/3ad594c6da88e4b29912e6978ea132adb8c504aa.png",
  },
  {
    title: "Connectivity (eSIM)",
    body: "Setup, activation and troubleshooting",
    count: "18 articles",
    image: "/figma-assets/48b4a7fa8ce0eccc41a651c47803b755945169fb.png",
  },
  {
    title: "Booking management",
    body: "Manage your bookings with ease",
    count: "15 articles",
    image: "/figma-assets/c9a93a023c03bc7b608f0649f7261cc47b2cf203.png",
  },
  {
    title: "Airport & arrival",
    body: "Information for a smooth travel experience",
    count: "10 articles",
    image: "/figma-assets/9182e18be3a2babc74e507e069a43161a1bd40b8.png",
  },
];

const CHIPS = ["Change flight", "eSIM installation", "Refund status", "Cancel booking"];

const TRUST_BAR = [
  { icon: ShieldCheck, title: "Secure Payments",  body: "Your payment is 100% secure" },
  { icon: Zap,         title: "Flexible Booking", body: "Change or cancel easily" },
  { icon: Headphones,  title: "24/7 Support",     body: "We're here to help anytime" },
  { icon: Tag,         title: "No Hidden Fees",   body: "What you see is what you pay" },
];

export function HelpClient() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#050606]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(183,255,0,0.10) 0%, transparent 65%)" }}
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-[60px] py-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_420px]">
            {/* Left */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <span className="font-mono text-[11px] font-bold tracking-widest text-primary">Help Center</span>
              </div>
              <h1 className="font-heading text-[56px] font-bold leading-[1.1] text-foreground sm:text-[64px]">
                How can we{" "}
                <span
                  className="text-primary"
                  style={{ textShadow: "0 0 24px rgba(183,255,0,0.5)" }}
                >
                  help
                </span>{" "}
                <br />
                you?
              </h1>
              <p className="max-w-lg text-[16px] text-[#a6b0a3]">
                Find answers, get support and manage your bookings
                <br />across flights, stays and eSIM.
              </p>

              {/* Search */}
              <div className="flex items-center gap-3 rounded-full border border-[#1e221e] bg-[#121513] px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <Search className="size-4 shrink-0 text-[#6c7668]" />
                <input
                  className="flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-[#6c7668]"
                  placeholder="Search flights, stays, eSIM, bookings…"
                />
              </div>

              {/* Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-[#6c7668]">Popular searches:</span>
                {CHIPS.map(chip => (
                  <button
                    key={chip}
                    className="rounded-full border border-[#1e221e] px-3 py-1 font-mono text-[11px] text-[#a6b0a3] transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="hidden overflow-hidden rounded-2xl lg:block">
              <img
                src="/figma-assets/88b1efd228fcbe1a25653ab281e19304e04507b1.png"
                alt="Help center"
                className="h-[320px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Browse by category */}
      <div className="mx-auto w-full max-w-[1280px] px-[60px] py-10">
        <h2 className="mb-5 font-bold text-[17px] text-foreground">Browse help by category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ icon: Icon, title, links }) => (
            <motion.button
              key={title}
              whileHover={{ y: -2 }}
              className="flex flex-col gap-3 rounded-[18px] bg-[#0b0d0c] p-4 text-left"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/[0.08]">
                <Icon className="size-5 text-primary" />
              </div>
              <p className="font-bold text-[15px] text-foreground">{title}</p>
              <ul className="space-y-1">
                {links.map(l => (
                  <li key={l} className="font-mono text-[11px] text-[#a6b0a3]">{l}</li>
                ))}
              </ul>
              <div className="ml-auto flex size-7 items-center justify-center rounded-full border border-[#1e221e]">
                <ArrowRight className="size-3 text-[#a6b0a3]" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* FAQ + Sidebar */}
      <div className="mx-auto w-full max-w-[1280px] px-[60px] pb-10">
        <div className="flex gap-6 items-start">
          {/* FAQ + Status */}
          <div className="flex-1 space-y-4">
            <div className="overflow-hidden rounded-[18px] bg-[#0b0d0c] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-[17px] text-foreground">Top questions</h2>
                <Link href="/help" className="flex items-center gap-1 font-mono text-[11px] text-primary hover:underline">
                  View all FAQs <ArrowRight className="size-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {FAQS.map((q, i) => (
                  <div key={q} className="overflow-hidden rounded-xl border border-[#1e221e]">
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors",
                        open === i ? "bg-primary/[0.04]" : "hover:bg-white/[0.02]",
                      )}
                    >
                      <span className="text-[13px] font-medium text-foreground">{q}</span>
                      <ChevronDown className={cn("size-4 shrink-0 text-[#6c7668] transition-transform", open === i && "rotate-180")} />
                    </button>
                    {open === i && (
                      <div className="border-t border-[#1e221e] px-4 pb-4 pt-3">
                        <p className="text-[12px] leading-relaxed text-[#a6b0a3]">
                          Our support team is available 24/7 to help you. Please contact us via live chat or email for detailed assistance with this query.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* System status */}
            <div className="rounded-[18px] bg-[#0b0d0c] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center gap-2 font-bold text-[15px] text-foreground">
                  <span className="size-2.5 rounded-full bg-[#7cf46b]" />
                  All systems are operational
                </p>
                <Link href="/help" className="font-mono text-[11px] text-primary hover:underline">
                  View status page
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STATUS.map(s => (
                  <div key={s.name} className="flex items-center gap-2 rounded-xl border border-[#1e221e] bg-[#121513]/40 px-3 py-2.5">
                    <span className="size-2 shrink-0 rounded-full bg-[#7cf46b]" />
                    <div>
                      <p className="text-[12px] font-medium text-foreground">{s.name}</p>
                      <p className="font-mono text-[10px] text-[#7cf46b]">{s.state}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-[360px] shrink-0 space-y-4">
            {/* eSIM steps card */}
            <div className="rounded-[18px] bg-[#0b0d0c] p-5">
              <p className="font-bold text-[15px] text-foreground">Get connected in 3 simple steps</p>
              <p className="mt-1 text-[13px] text-[#a6b0a3]">Setting up your eSIM is quick and easy.</p>
              <div className="my-5 flex items-center justify-between">
                {ESIM_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    {i > 0 && <div className="h-px w-6 bg-[#1e221e]" />}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-bold text-black">
                        {i + 1}
                      </div>
                      <p className="max-w-[80px] text-center font-mono text-[10px] text-[#a6b0a3]">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/esim"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 font-bold text-[13px] text-black shadow-[0_0_14px_rgba(183,255,0,0.35)] hover:shadow-[0_0_24px_rgba(183,255,0,0.5)] transition-shadow"
              >
                View full eSIM guide
              </Link>
            </div>

            {/* Contact card */}
            <div className="rounded-[18px] bg-[#0b0d0c] p-5">
              <p className="font-bold text-[15px] text-foreground">Still need help?</p>
              <p className="mt-1 text-[13px] text-[#a6b0a3]">Our support team is here for you 24/7.</p>
              <div className="mt-4 space-y-3">
                {SUPPORT.map(({ icon: Icon, title, body, cta }) => (
                  <div key={title} className="flex items-start gap-3 rounded-xl border border-[#1e221e] bg-[#121513]/40 p-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[13px] text-foreground">{title}</p>
                      <p className="font-mono text-[10px] text-[#a6b0a3]">{body}</p>
                    </div>
                    <button className="shrink-0 rounded-full border border-primary/30 px-2.5 py-1 font-mono text-[10px] font-bold text-primary hover:bg-primary/10 transition-colors">
                      {cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto w-full max-w-[1280px] px-[60px] pb-10">
        <h2 className="mb-5 font-bold text-[17px] text-foreground">Help articles &amp; guides</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map(a => (
            <Link key={a.title} href="/help" className="group overflow-hidden rounded-[18px] bg-[#0b0d0c] transition-all hover:-translate-y-1">
              <div className="relative h-[140px]">
                <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="space-y-1 p-4">
                <p className="font-semibold text-[15px] text-foreground">{a.title}</p>
                <p className="text-[12px] text-[#a6b0a3]">{a.body}</p>
                <p className="font-mono text-[10px] font-bold text-primary">{a.count}</p>
              </div>
            </Link>
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
