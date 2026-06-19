'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  POPULAR_CHIPS,
  ESIM_COUNTRIES,
  type EsimCountry,
} from '@/lib/esim-countries'

interface EsimModifySearchProps {
  show: boolean
  activeTab: 'local' | 'global'
  activeChip: { label: string; code: string }
  searchInput: string
  setSearchInput: (v: string) => void
  setParam: (params: Record<string, string | null>) => void
}

export function EsimModifySearch({
  show,
  activeTab,
  activeChip,
  searchInput,
  setSearchInput,
  setParam,
}: EsimModifySearchProps) {
  const [query, setQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showAllChips, setShowAllChips] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  useEffect(() => {
    if (!show) {
      setQuery('')
      setDropdownOpen(false)
      setShowAllChips(false)
    }
  }, [show])

  // ✅ Search ALL countries — not just popular ones
  // Only show dropdown when user is typing
  const filteredCountries: EsimCountry[] = query.trim()
    ? ESIM_COUNTRIES.filter(
        (c) =>
          c.type === 'country' &&
          c.label.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 40)
    : []

  const visibleChips = showAllChips ? POPULAR_CHIPS : POPULAR_CHIPS.slice(0, 10)

  function selectCountry(code: string) {
    // ✅ Sets the country URL param — activeChip in client.tsx
    // now reads from ESIM_COUNTRIES so every code resolves correctly
    setParam({
      country: code,
      data: null,
      validity: null,
      unlimited: null,
      minPrice: null,
      maxPrice: null,
    })
    setQuery('')
    setDropdownOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setDropdownOpen(false)
      setQuery('')
    }
    if (e.key === 'Enter' && query.trim() && filteredCountries.length > 0) {
      selectCountry(filteredCountries[0].code)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className='mb-4 overflow-hidden'
        >
          <div className='space-y-4 rounded-2xl border border-border bg-card p-4'>
            {/* Tab switcher */}
            <div className='flex flex-wrap items-center gap-2'>
              {(['local', 'global'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setParam({
                      tab,
                      country: tab === 'local' ? 'NG' : null,
                      data: null,
                      validity: null,
                      unlimited: null,
                      minPrice: null,
                      maxPrice: null,
                      operators: null,
                      regions: null,
                    })
                  }
                  className={cn(
                    'rounded-full border px-5 py-2 text-sm font-bold capitalize transition-colors',
                    activeTab === tab
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30',
                  )}
                >
                  {tab} Plans
                </button>
              ))}
            </div>

            {/* Country section — local tab only */}
            {activeTab === 'local' && (
              <div className='space-y-3'>
                {/* Chips header */}
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-[10px] tracking-wider text-muted-foreground'>
                    Popular:
                  </span>
                  <button
                    onClick={() => setShowAllChips((o) => !o)}
                    className='font-mono text-[10px] text-primary underline underline-offset-2 hover:text-primary/70 transition-colors'
                  >
                    {showAllChips
                      ? 'Show less'
                      : `See all (${POPULAR_CHIPS.length})`}
                  </button>
                </div>

                {/* Popular chips */}
                <div className='flex flex-wrap gap-2'>
                  {visibleChips.map((chip) => (
                    <button
                      key={chip.code}
                      onClick={() => selectCountry(chip.code)}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        activeChip.code === chip.code
                          ? 'border-primary bg-primary/15 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/30',
                      )}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* ✅ Single search input — searches ALL countries, switches country param */}
                <div ref={containerRef} className='relative'>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-colors',
                      dropdownOpen && query
                        ? 'border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]'
                        : 'border-border',
                    )}
                  >
                    <Search className='size-4 shrink-0 text-muted-foreground' />
                    <input
                      ref={inputRef}
                      type='text'
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setDropdownOpen(true)
                      }}
                      onFocus={() => {
                        if (query.trim()) setDropdownOpen(true)
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder='Search any country… e.g. Cameroon, Brazil, India'
                      className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
                    />
                    {query && (
                      <button
                        onClick={() => {
                          setQuery('')
                          setDropdownOpen(false)
                          inputRef.current?.focus()
                        }}
                        className='grid size-5 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground'
                      >
                        <X className='size-3' />
                      </button>
                    )}
                  </div>

                  {/* ✅ z-[200] — same fix as landing page, floats above everything */}
                  <AnimatePresence>
                    {dropdownOpen && filteredCountries.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className='absolute left-0 top-full z-[200] mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
                      >
                        <div className='max-h-52 overflow-y-auto py-1'>
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => selectCountry(c.code)}
                              className={cn(
                                'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted',
                                activeChip.code === c.code
                                  ? 'bg-primary/5 font-bold text-primary'
                                  : 'text-foreground',
                              )}
                            >
                              <MapPin className='size-3.5 shrink-0 text-muted-foreground' />
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Package search — filters plans within selected country (local) or globally */}
            <div
              className={cn(
                'flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-colors',
                searchInput
                  ? 'border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]'
                  : 'border-border',
              )}
            >
              <Search className='size-4 shrink-0 text-muted-foreground' />
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  activeTab === 'local'
                    ? `Filter plans in ${activeChip.label}…`
                    : 'Search countries or operators…'
                }
                className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput('')
                    setParam({ q: null })
                  }}
                  className='grid size-5 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground'
                >
                  <X className='size-3' />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
