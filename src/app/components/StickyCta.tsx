import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ORIGINAL_PRICE, PRICE } from '@/config'

/** Compact floating bar on phones once the hero is scrolled past. */
export function StickyCta({ onJoin, hidden }: { onJoin: () => void; hidden?: boolean }) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const on = () => setPast(window.scrollY > 520)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <AnimatePresence>
      {past && !hidden && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="card mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl p-2 pl-4">
            <div className="leading-tight">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold">₹{PRICE}</span>
                <span className="text-xs font-semibold text-muted line-through">₹{ORIGINAL_PRICE}</span>
              </div>
              <div className="text-[11px] font-semibold text-muted">Lifetime access</div>
            </div>
            <button type="button" onClick={onJoin} className="btn-primary h-11 rounded-xl px-5 text-sm">
              Join now <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
