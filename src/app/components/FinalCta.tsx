import { ArrowRight, Sparkles } from 'lucide-react'
import { ORIGINAL_PRICE, PRICE } from '@/config'

export function FinalCta({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="relative z-10 mx-auto max-w-2xl px-5 pb-24 md:pb-20">
      <div className="card relative overflow-hidden rounded-[28px] px-6 py-10 text-center md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 0%, var(--aurora-a), transparent 70%), radial-gradient(50% 60% at 100% 100%, var(--aurora-b), transparent 70%)',
          }}
        />
        <div className="relative">
          <span className="eyebrow">
            <Sparkles className="h-3 w-3 text-accent2" aria-hidden /> Biggest discount of the year
          </span>
          <h2 className="font-display mt-5 text-4xl md:text-5xl">Ready to join?</h2>
          <div className="mt-4 flex items-baseline justify-center gap-3">
            <span className="text-base font-semibold text-muted line-through">₹{ORIGINAL_PRICE}</span>
            <span className="font-display text-gradient text-6xl leading-none md:text-7xl">₹{PRICE}</span>
          </div>
          <p className="mt-2 text-xs font-semibold text-muted">One-time · Lifetime access</p>
          <button type="button" onClick={onJoin} className="btn-primary mt-7 h-14 w-full max-w-xs rounded-2xl text-base">
            Join Datespot now <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl border-t border-line px-5 py-8 pb-28 text-center md:pb-8">
      <p className="text-xs font-semibold leading-relaxed text-muted">
        © 2026 Datespot Bangalore · One-time payment · Lifetime access · No hidden fees
        <br />
        For adults 18+ only.
      </p>
    </footer>
  )
}
