import { ArrowRight, Check, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { MEMBERS, ORIGINAL_PRICE, PRICE } from '@/config'
import { PhoneSlider } from './PhoneSlider'
import preview1 from '@/imports/group-preview-1.webp'
import preview2 from '@/imports/group-preview-2.webp'
import preview3 from '@/imports/group-preview-3.webp'

const IMAGES = [preview1, preview2, preview3]

export function Hero({ onJoin }: { onJoin: () => void }) {
  return (
    <section
      id="top"
      className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:pb-24 md:pt-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center md:text-left"
      >
        <span className="eyebrow">
          <Users className="h-3.5 w-3.5 text-accent" aria-hidden />
          {MEMBERS} verified members · Bangalore
        </span>

        <h1 className="font-display mt-5 text-[3.4rem] leading-[0.95] sm:text-7xl md:text-[5.4rem]">
          Wanna date
          <br />
          <em className="text-gradient pr-2">Bangalore women?</em>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-[15px] font-medium leading-relaxed text-muted md:mx-0 md:text-lg">
          A <strong className="font-bold text-fg">private paid Telegram group</strong> to chat, call &amp; meet verified
          women for dating and hookups. Real people, zero fake profiles.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 md:items-start">
          <button type="button" onClick={onJoin} className="btn-primary h-14 rounded-2xl pl-7 pr-6 text-base">
            <span className="text-sm font-semibold line-through opacity-60">₹{ORIGINAL_PRICE}</span>
            <span>Join for ₹{PRICE}</span>
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs font-semibold text-muted md:justify-start">
            {['One-time payment', 'Lifetime access', 'Manually verified'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent" strokeWidth={3} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <PhoneSlider images={IMAGES} />
      </motion.div>
    </section>
  )
}
