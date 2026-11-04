import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function PhoneSlider({ images }: { images: string[] }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((p) => (p + 1) % images.length), 3200)
    return () => clearInterval(id)
  }, [images.length, reduce])

  return (
    <div className="relative mx-auto w-[min(68vw,264px)]">
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{ background: 'linear-gradient(160deg, var(--aurora-a), var(--aurora-c))' }}
      />
      <div className="rounded-[2.4rem] border border-line bg-surface p-2 shadow-[var(--shadow-card)]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] bg-surface2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={i}
              src={images[i]}
              alt={`Datespot Telegram group preview ${i + 1} of ${images.length}`}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Show preview ${n + 1}`}
                aria-current={n === i}
                onClick={() => setI(n)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  n === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
