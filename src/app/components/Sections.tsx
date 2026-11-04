import { useState, type ElementType } from 'react'
import { motion } from 'motion/react'
import { ChevronDown, Flame, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import { FAQS, REVIEWS, MEMBERS } from '@/config'

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
}

function SectionHead({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 text-center md:mb-10">
      {kicker && <span className="eyebrow mb-4">{kicker}</span>}
      <h2 className="font-display text-4xl leading-tight md:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-md text-sm font-medium text-muted md:text-base">{sub}</p>}
    </div>
  )
}

/* ─────────────── Proof strip ─────────────── */
export function ProofStrip() {
  const items = [
    { v: MEMBERS, l: 'Members' },
    { v: '2021', l: 'Running since' },
    { v: '100%', l: 'Verified' },
  ]
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-5 pb-14">
      <div className="card grid grid-cols-3 divide-x divide-[var(--line)] rounded-2xl py-5">
        {items.map((s) => (
          <div key={s.l} className="px-2 text-center">
            <div className="font-display text-3xl text-gradient md:text-4xl">{s.v}</div>
            <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-muted">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────── Features ─────────────── */
const FEATURES: { icon: ElementType; title: string; desc: string; badge?: string }[] = [
  { icon: MessageCircle, title: 'Group Chat', desc: 'Daily active members' },
  { icon: Phone, title: 'Voice Calls', desc: 'Talk before you meet' },
  { icon: MapPin, title: 'Direct Meets', desc: 'Arrange real-life meetups' },
  { icon: Flame, title: '18+ Exclusive', desc: 'Photos, videos & more', badge: '18+' },
]

export function Features() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-5 pb-16 md:pb-24">
      <SectionHead title="What you get" sub="Everything inside the group, from day one" />
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            {...reveal}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="card relative rounded-2xl p-4 md:p-6"
          >
            {f.badge && (
              <span className="absolute right-3 top-3 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-extrabold text-accent">
                {f.badge}
              </span>
            )}
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 text-accent md:h-11 md:w-11">
              <f.icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="text-[15px] font-bold md:text-base">{f.title}</h3>
            <p className="mt-0.5 text-xs font-medium text-muted md:text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────── How it works ─────────────── */
export function HowItWorks() {
  const steps = [
    { t: 'Pay via UPI', d: 'Scan the QR or copy the UPI ID. One payment, no subscription.' },
    { t: 'Upload screenshot', d: 'Share your payment screenshot right inside the page.' },
    { t: 'Get your invite', d: 'Receive the private Telegram link in under 2 minutes.' },
  ]
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-5 pb-16 md:pb-24">
      <SectionHead title="Join in 3 steps" sub="Takes under 2 minutes" />
      <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            {...reveal}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="card flex items-start gap-4 rounded-2xl p-5 md:block"
          >
            <span className="font-display text-gradient text-4xl leading-none md:mb-4 md:block md:text-5xl">
              0{i + 1}
            </span>
            <div>
              <h3 className="text-[15px] font-bold">{s.t}</h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-muted">{s.d}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

/* ─────────────── Reviews (desktop) ─────────────── */
export function Reviews() {
  const initials = (n: string) =>
    n
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  return (
    <section className="relative z-10 mx-auto hidden max-w-5xl px-5 pb-24 md:block">
      <SectionHead title="What members say" sub="Real reviews from Bangalore" />
      <div className="grid grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name}
            {...reveal}
            transition={{ delay: (i % 3) * 0.07, duration: 0.5 }}
            className="card flex flex-col rounded-2xl p-5"
          >
            <div className="mb-3 flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, n) => (
                <Star key={n} className="h-3 w-3 fill-current" aria-hidden />
              ))}
            </div>
            <blockquote className="flex-1 text-sm font-medium leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-[10px] font-extrabold text-white">
                {initials(r.name)}
              </span>
              <span>
                <span className="block text-xs font-bold">{r.name}</span>
                <span className="flex items-center gap-0.5 text-[11px] font-semibold text-muted">
                  <MapPin className="h-2.5 w-2.5" aria-hidden />
                  {r.area}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

/* ─────────────── FAQ ─────────────── */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="relative z-10 mx-auto max-w-2xl px-5 pb-16 md:pb-24" aria-labelledby="faq-h">
      <div className="mb-8 text-center md:mb-10">
        <h2 id="faq-h" className="font-display text-4xl md:text-5xl">
          Good to know
        </h2>
      </div>
      <div className="card divide-y divide-[var(--line)] overflow-hidden rounded-2xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-bold">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
                  aria-hidden
                />
              </button>
              <div
                id={`faq-${i}`}
                role="region"
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm font-medium leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
