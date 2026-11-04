import { useEffect, useState } from 'react'
import { Heart, Moon, Sun, Zap } from 'lucide-react'
import { useTheme } from '@/lib/theme'

const CYCLE = 6 * 3600 // looping 6-hour countdown

const remaining = () => {
  const now = Math.floor(Date.now() / 1000)
  return CYCLE - (now % CYCLE)
}

function FlashBar() {
  const [t, setT] = useState(remaining)
  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])
  const p = (n: number) => String(n).padStart(2, '0')
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60

  return (
    <div className="relative z-20 border-b border-line bg-surface/60 backdrop-blur-md">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-center gap-2.5 px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        <Zap className="h-3 w-3 text-accent2" aria-hidden />
        <span>Flash sale ends in</span>
        <span className="tabular-nums text-fg" role="timer" aria-live="off">
          {p(h)}:{p(m)}:{p(s)}
        </span>
      </div>
    </div>
  )
}

export function Header() {
  const { isDark, toggle } = useTheme()
  return (
    <>
      <FlashBar />
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Datespot home">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[var(--btn-from)] to-[var(--btn-to)] shadow-[0_6px_18px_-6px_var(--btn-glow)]">
            <Heart className="h-4 w-4 fill-white text-white" aria-hidden />
          </span>
          <span className="text-[17px] font-extrabold tracking-tight">Datespot</span>
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/70 text-muted backdrop-blur transition hover:text-fg"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>
    </>
  )
}
