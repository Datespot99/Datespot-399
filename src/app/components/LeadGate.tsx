import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Loader2, Lock } from 'lucide-react'
import { SHEET_URL } from '@/config'
import { Atmosphere } from './Atmosphere'

export function LeadGate({ onUnlock }: { onUnlock: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please enter your full name.')
    if (!/^[6-9]\d{9}$/.test(phone)) return setError('Enter a valid 10-digit Indian mobile number.')

    setLoading(true)
    try {
      await fetch(`${SHEET_URL}?${new URLSearchParams({ name: name.trim(), phone })}`, { mode: 'no-cors' })
      try {
        localStorage.setItem('ds_lead_submitted', '1')
        localStorage.setItem('ds_lead_name', name.trim())
        localStorage.setItem('ds_lead_phone', phone)
      } catch {
        /* storage blocked – continue without persisting */
      }
      onUnlock()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const field =
    'h-12 w-full rounded-xl border border-line bg-surface2 px-4 text-[15px] font-semibold outline-none transition placeholder:font-medium placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-[var(--ring)]'

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-bg px-5 py-8">
      <Atmosphere />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card relative z-10 w-full max-w-[360px] rounded-[28px] p-6"
      >
        <h2 id="gate-title" className="font-display text-[2rem] leading-tight">
          Before you continue
        </h2>
        <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
          Datespot is a <strong className="font-bold text-fg">paid group</strong>. Register only if you&apos;re
          comfortable with that.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3.5" noValidate>
          <div>
            <label htmlFor="g-name" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Name
            </label>
            <input
              id="g-name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="g-phone" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Phone
            </label>
            <div className="flex">
              <span className="grid h-12 shrink-0 place-items-center rounded-l-xl border border-r-0 border-line bg-surface2 px-3.5 text-[15px] font-bold text-muted">
                +91
              </span>
              <input
                id="g-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className={`${field} rounded-l-none`}
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-accent/10 px-3 py-2 text-xs font-semibold text-accent">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-1 h-12 w-full rounded-xl text-sm">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-label="Submitting" />
            ) : (
              <>
                Join now <ArrowRight className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
          <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-semibold text-muted">
            <Lock className="h-3 w-3" aria-hidden /> Your info is private &amp; never shared
          </p>
        </form>
      </motion.div>
    </div>
  )
}
