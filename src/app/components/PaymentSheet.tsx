import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'
import { AlertCircle, ArrowUpRight, Check, Copy, ImagePlus, Loader2, Lock, X } from 'lucide-react'
import { ORIGINAL_PRICE, PRICE, SHEET_URL, TELEGRAM_LINK, UPI_ID, upiUrl } from '@/config'

type Phase = 'idle' | 'sending' | 'done'

const MAX_BYTES = 12 * 1024 * 1024
const OFF = Math.round((1 - PRICE / ORIGINAL_PRICE) * 100)

/** Downscale to ≤900px JPEG and return base64 (keeps the upload small on mobile data). */
function compress(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, 900 / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * scale)
      c.height = Math.round(img.height * scale)
      c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      resolve(c.toDataURL('image/jpeg', 0.75).split(',')[1])
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('unreadable'))
    }
    img.src = url
  })
}

export function PaymentSheet({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [drag, setDrag] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const timers = useRef<number[]>([])
  const locked = phase !== 'idle'

  // lock page scroll, close on Esc, focus the dialog, clear timers on unmount
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const t = timers.current
    return () => {
      document.body.style.overflow = prev
      t.forEach(clearTimeout)
    }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !locked && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [locked, onClose])

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      timers.current.push(window.setTimeout(() => setCopied(false), 1600))
    } catch {
      toast.error('Copy failed — select the ID manually')
    }
  }

  const submit = useCallback(async (file: File | undefined) => {
    if (!file) return
    setError('')
    if (!file.type.startsWith('image/')) return setError('Please choose an image (PNG or JPG screenshot).')
    if (file.size > MAX_BYTES) return setError('That image is too large. Please use a screenshot under 12 MB.')

    setPhase('sending')
    try {
      const image = await compress(file)
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // opaque response; a thrown error means the network failed
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: 'screenshot',
          name: safeGet('ds_lead_name'),
          phone: safeGet('ds_lead_phone'),
          mimeType: 'image/jpeg',
          fileName: `payment_${Date.now()}.jpg`,
          image,
        }),
      })
    } catch (e) {
      setPhase('idle')
      setError(
        e instanceof Error && e.message === 'unreadable'
          ? "Couldn't read that image. Try a PNG or JPG screenshot."
          : 'Upload failed. Check your connection and try again.',
      )
      return
    }

    setPhase('done')
    void import('canvas-confetti').then(({ default: confetti }) =>
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ff5c7c', '#ff9a62', '#f3c98b', '#ffffff'],
      }),
    )
    // Browsers may block this popup (no direct user gesture) – the button below is the fallback.
    timers.current.push(window.setTimeout(() => window.open(TELEGRAM_LINK, '_blank', 'noopener'), 1400))
  }, [])

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={locked ? undefined : onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-h-[100dvh] overflow-y-auto rounded-t-[28px] border border-line bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.5)] sm:max-w-[380px] sm:rounded-[28px] sm:pb-5"
      >
        {/* thin accent line */}
        <div
          aria-hidden
          className="absolute inset-x-8 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />

        {/* Header: price + close */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="pay-title" className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Datespot · Lifetime access
            </h2>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[2.1rem] font-extrabold leading-none tracking-tight">₹{PRICE}</span>
              <span className="text-sm font-semibold text-muted line-through">₹{ORIGINAL_PRICE}</span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-extrabold text-accent">
                {OFF}% OFF
              </span>
            </div>
          </div>
          {!locked && (
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close payment"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface2 text-muted transition hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ───── idle ───── */}
        {phase === 'idle' && (
          <div className="mt-5 space-y-4">
            {/* 1 · Pay */}
            <div>
              <StepLabel n={1}>Pay via UPI</StepLabel>
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface2 p-3">
                <div className="shrink-0 rounded-xl bg-white p-2 shadow-sm">
                  <QRCodeSVG value={upiUrl} size={104} level="M" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">UPI ID</p>
                  <p className="mt-0.5 break-all font-mono text-[13px] font-bold leading-snug">{UPI_ID}</p>
                  <div className="mt-2.5 flex gap-1.5">
                    <button
                      type="button"
                      onClick={copyUpi}
                      className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line bg-surface text-xs font-bold transition active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-accent" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                    <a
                      href={upiUrl}
                      className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg bg-fg text-xs font-bold text-bg transition active:scale-95"
                    >
                      Pay in app <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 · Upload */}
            <div>
              <StepLabel n={2}>Upload your screenshot</StepLabel>
              <input
                id="ss-upload"
                type="file"
                accept="image/*"
                className="sr-only peer"
                onChange={(e) => {
                  void submit(e.target.files?.[0])
                  e.target.value = ''
                }}
              />
              <label
                htmlFor="ss-upload"
                onDragOver={(e) => {
                  e.preventDefault()
                  setDrag(true)
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDrag(false)
                  void submit(e.dataTransfer.files?.[0])
                }}
                className={`flex h-[60px] cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed text-sm font-bold transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)] ${
                  drag
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-[color-mix(in_oklab,var(--accent)_45%,var(--line))] bg-accent/[0.06] text-accent hover:bg-accent/10'
                }`}
              >
                <ImagePlus className="h-4.5 w-4.5" aria-hidden />
                Choose screenshot
              </label>
              {error && (
                <p role="alert" className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-accent">
                  <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" /> {error}
                </p>
              )}
            </div>

            <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted">
              <Lock className="h-3 w-3" aria-hidden /> Your invite link unlocks right after upload
            </p>
          </div>
        )}

        {/* ───── sending ───── */}
        {phase === 'sending' && (
          <div className="grid place-items-center py-14 text-center" role="status">
            <Loader2 className="h-8 w-8 animate-spin text-accent" aria-hidden />
            <p className="mt-4 text-base font-bold">Uploading screenshot…</p>
            <p className="mt-1 text-xs font-medium text-muted">Just a moment</p>
          </div>
        )}

        {/* ───── done ───── */}
        {phase === 'done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="py-8 text-center"
            role="status"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--btn-from)] to-[var(--btn-to)] shadow-[0_10px_28px_-8px_var(--btn-glow)]">
              <Check className="h-7 w-7 text-white" strokeWidth={3} aria-hidden />
            </div>
            <p className="mt-4 text-xl font-extrabold">Screenshot received</p>
            <p className="mt-1 text-sm font-medium text-muted">Opening your Telegram invite…</p>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 h-12 w-full rounded-xl text-sm"
            >
              Open Telegram <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <button type="button" onClick={onClose} className="mt-3 text-xs font-semibold text-muted hover:text-fg">
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function StepLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2 text-[13px] font-bold">
      <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-fg text-[10px] font-extrabold text-bg">
        {n}
      </span>
      {children}
    </div>
  )
}

function safeGet(key: string) {
  try {
    return localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}
