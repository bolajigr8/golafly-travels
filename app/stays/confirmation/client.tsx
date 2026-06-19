"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function StaysConfirmationClient() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center bg-background">

      {/* Success badge */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className="flex size-20 items-center justify-center rounded-full border-4 border-primary bg-background shadow-[0_0_40px_rgba(183,255,0,0.4)]">
          <Check className="size-10 text-primary" strokeWidth={3} />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="max-w-sm space-y-2"
      >
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Booking Confirmed</h1>
        <p className="font-bold text-foreground">Bairro Alto Hotel · Classic Room</p>
        <p className="text-sm text-muted-foreground">Thu, Jun 25 — Sun, Jun 28 · 3 nights · 2 Guests · 1 Room</p>
        <p className="text-sm text-muted-foreground">
          A confirmation will be sent to <span className="font-bold text-foreground">jennimar177@gmail.com</span>.
        </p>
      </motion.div>

      {/* Reference */}
      <motion.div
        className="my-6 rounded-xl border border-primary/40 bg-primary/5 px-8 py-4 shadow-[0_0_20px_rgba(183,255,0,0.15)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <p className="font-mono text-2xl font-bold tracking-widest text-primary">GFXHPYF4</p>
      </motion.div>

      <motion.p
        className="mb-8 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Total charged: <span className="font-bold text-foreground">$968.00</span>
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link
          href="/stays"
          className="rounded-full border border-border px-6 py-3 font-mono text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          ← Back to Stays
        </Link>
        <Link
          href="/stays/search"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_16px_rgba(183,255,0,0.4)] hover:shadow-[0_0_28px_rgba(183,255,0,0.55)]"
        >
          Explore more destinations →
        </Link>
      </motion.div>
    </div>
  );
}
