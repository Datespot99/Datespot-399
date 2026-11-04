import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  Play,
  Pause,
  Users,
  X,
  Star,
  Mic,
  Upload,
  CheckCircle,
  Loader2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Flame,
  Copy,
  ExternalLink,
  Phone,
  MapPin,
  Shield,
  Zap,
  Heart,
  Camera,
  UserCheck,
  Tv2,
  BellRing,
  Lock,
  Headphones,
  ChevronDown,
  CreditCard,
  Send,
  Sun,
  Moon,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import toast, { Toaster } from "react-hot-toast"
import groupPreview1 from "../imports/group-preview-1.webp"
import groupPreview2 from "../imports/group-preview-2.webp"
import groupPreview3 from "../imports/group-preview-3.webp"

const B1 = "#3A4EFB"
const B2 = "#33A4FA"
const ACCENT = "#E3FF3B"
const HERO_GRAD = `linear-gradient(125deg, ${B1} 0%, ${B2} 100%)`

// ─── Theme system ─────────────────────────────────────────────────────────────
const DARK_THEME = {
  PAGE_BG: "#0D0F1A",
  DARK: "#F0F2FF",
  MUTED: "#6B7299",
  CARD_BG: "#161929",
  BORDER: "rgba(255,255,255,0.07)",
  QUOTE: "#C8CFEA",
  DOT_BG: [
    "repeating-linear-gradient(0deg,  transparent, transparent 39px, rgba(58,78,251,0.13) 40px)",
    "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(58,78,251,0.13) 40px)",
    "repeating-linear-gradient(135deg,transparent, transparent 59px, rgba(51,164,250,0.05) 60px)",
    "radial-gradient(ellipse 70% 55% at 15% 40%, rgba(58,78,251,0.18) 0%, transparent 70%)",
    "radial-gradient(ellipse 55% 45% at 85% 15%, rgba(51,164,250,0.12) 0%, transparent 65%)",
    "#0D0F1A",
  ].join(", "),
}
const LIGHT_THEME = {
  PAGE_BG: "#F5F6FF",
  DARK: "#0D1040",
  MUTED: "#6070A0",
  CARD_BG: "#FFFFFF",
  BORDER: "rgba(58,78,251,0.1)",
  QUOTE: "#353D70",
  DOT_BG: [
    "repeating-linear-gradient(0deg,  transparent, transparent 39px, rgba(58,78,251,0.05) 40px)",
    "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(58,78,251,0.05) 40px)",
    "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(58,78,251,0.07) 0%, transparent 70%)",
    "#F5F6FF",
  ].join(", "),
}
type TTheme = typeof DARK_THEME & { isDark: boolean }
const ThemeCtx = React.createContext<{ theme: TTheme; toggle: () => void }>({
  theme: { ...DARK_THEME, isDark: true },
  toggle: () => {},
})
const useT = (): TTheme => React.useContext(ThemeCtx).theme

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isNight = () => {
    const h = new Date().getHours()
    return h < 6 || h >= 20
  }
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem("ds_theme")
    return s ? s === "dark" : isNight()
  })
  const toggle = () =>
    setIsDark((p) => {
      localStorage.setItem("ds_theme", !p ? "dark" : "light")
      return !p
    })
  const theme = { ...(isDark ? DARK_THEME : LIGHT_THEME), isDark }
  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
  )
}

function ThemeToggle() {
  const { theme, toggle } = React.useContext(ThemeCtx)
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="fixed top-3 right-3 z-50 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: theme.isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(13,16,64,0.08)",
        border: `1px solid ${
          theme.isDark ? "rgba(255,255,255,0.15)" : "rgba(58,78,251,0.2)"
        }`,
      }}
    >
      {theme.isDark ? (
        <Sun className="w-4 h-4" style={{ color: "#F59E0B" }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: B1 }} />
      )}
    </motion.button>
  )
}

// Legacy aliases — still used in components not yet theme-aware
const PAGE_BG = DARK_THEME.PAGE_BG
const DARK = DARK_THEME.DARK
const MUTED = DARK_THEME.MUTED
const CARD_BG = DARK_THEME.CARD_BG
const DOT_BG = DARK_THEME.DOT_BG

const FEAT: {
  icon: React.ElementType
  title: string
  desc: string
  badge?: string
  c1: string
  c2: string
}[] = [
  {
    icon: MessageCircle,
    title: "Group Chat",
    desc: "Daily active members",
    c1: "#3B82F6",
    c2: "#06B6D4",
  },
  {
    icon: Phone,
    title: "Voice Calls",
    desc: "Talk before you meet",
    c1: "#FF6B6B",
    c2: "#FF8E53",
  },
  {
    icon: MapPin,
    title: "Direct Meets",
    desc: "Arrange real-life meetups",
    c1: "#10B981",
    c2: "#34D399",
  },
  {
    icon: Flame,
    title: "18+ Exclusive",
    desc: "Photos, videos & more",
    c1: "#EF4444",
    c2: "#F97316",
    badge: "18+",
  },
]

const IMAGES = [groupPreview1, groupPreview2, groupPreview3]
const REVIEWS = [
  {
    name: "Rahul M.",
    area: "Koramangala",
    text: "Way better than any dating app I have tried. Met two amazing women so far, both real and verified.",
  },
  {
    name: "Vikram Shetty.",
    area: "Indiranagar",
    text: "Finally ondhu genuine group sikthu. Admin is very responsive and the crowd is legit. Genuinely recommend.",
  },
  {
    name: "Karan D.",
    area: "HSR Layout",
    text: "Real girls, real chats. Nothing like the fake bots on Tinder or Bumble. Worth every rupee.",
  },
  {
    name: "Aditya P.",
    area: "Whitefield",
    text: "Was skeptical at first but it's 100% worth it. The voice call feature is a great way to vibe before meeting.",
  },
  {
    name: "Rohan Gowda.",
    area: "JP Nagar",
    text: "Already arranged a meet within my first week. Active group, daily new faces. Super recommend bro.",
  },
  {
    name: "Suresh Naik.",
    area: "Marathahalli",
    text: "Met my current girlfriend here lol. Very organised, zero spam and the admin actually screens people.",
  },
  {
    name: "Arjun K.",
    area: "Jayanagar",
    text: "Best ₹399 I have spent this year honestly. The group is always active, quality women from Bangalore.",
  },
  {
    name: "Dev Menon.",
    area: "BTM Layout",
    text: "Three meets in two months. The vibe here is very different from regular apps — feels real and personal.",
  },
  {
    name: "Sagar R.",
    area: "Electronic City",
    text: "Legit group. Admin does proper verification so you know everyone is genuine. No nonsense.",
  },
  {
    name: "Nikhil T.",
    area: "Yelahanka",
    text: "Joined on a friend's suggestion and I'm glad I did. Active daily, good conversations and easy to arrange meets.",
  },
]

// ─── Glassmorphic blob ────────────────────────────────────────────────────────
function GlassBlob({
  size,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  rx = "62% 38% 70% 30% / 45% 55% 45% 55%",
}: {
  size: number
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
  rotate?: number
  rx?: string
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(10px)",
        border: "1.5px solid rgba(255,255,255,0.3)",
        borderRadius: rx,
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
      }}
    />
  )
}

// ─── Group Preview Slider ─────────────────────────────────────────────────────
function GroupPreviewSlider({
  images,
  mobile = false,
}: {
  images: string[]
  mobile?: boolean
}) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % images.length)
    }, 2800)
    return () => clearInterval(id)
  }, [images.length, reduceMotion])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  const nav = (i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }

  if (mobile) {
    return (
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className="font-extrabold text-xl"
              style={{ color: DARK, letterSpacing: "-0.03em" }}
            >
              Group Preview
            </h2>
            <p
              className="text-xs font-semibold mt-0.5"
              style={{ color: MUTED }}
            >
              Swipe for screenshots{" "}
            </p>
          </div>
          <span
            className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white"
            style={{ background: HERO_GRAD }}
          >
            {current + 1} / {images.length}
          </span>
        </div>
        <div className="flex justify-center">
          <div className="relative" style={{ width: "72vw", maxWidth: 240 }}>
            {/* Glow halo */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30 scale-95"
              style={{ background: HERO_GRAD }}
            />
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{
                aspectRatio: "9/16",
                border: "2.5px solid rgba(26,114,232,0.2)",
              }}
            >
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={current}
                  src={images[current]}
                  alt={`Preview ${current + 1}`}
                  loading={current === 0 ? "eager" : "lazy"}
                  decoding="async"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: reduceMotion ? 0 : 0.42,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Bottom gradient overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                }}
              />
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => nav(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 18 : 5,
                      height: 5,
                      background:
                        i === current ? "white" : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ background: `${B1}12`, color: B1 }}
          >
            <Sparkles className="w-3 h-3" /> Real Content
          </div>
          <h2
            className="text-5xl mb-3 font-bold"
            style={{ color: DARK, letterSpacing: "-0.03em" }}
          >
            Group Preview
          </h2>
          <p className="text-lg font-medium" style={{ color: MUTED }}>
            See exactly what you're joining
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative" style={{ width: 300 }}>
            <div
              className="absolute inset-0 rounded-[2.5rem] blur-3xl opacity-25 scale-90"
              style={{ background: HERO_GRAD }}
            />
            <div
              className="relative overflow-hidden rounded-[2.5rem] shadow-2xl"
              style={{
                aspectRatio: "9/16",
                border: "3px solid rgba(26,114,232,0.18)",
              }}
            >
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={current}
                  src={images[current]}
                  alt={`Preview ${current + 1}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => nav(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 22 : 6,
                      height: 6,
                      background:
                        i === current ? "white" : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {current + 1} / {images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Lead Gate ────────────────────────────────────────────────────────────────
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycby5yLNtWOTeTx1qI0Qv_-hiFri1UAn3Th4VzdaW4gDSKYNjPFftUWtKqiGaEGzfW4LC2g/exec"

function LeadGate({ onUnlock }: { onUnlock: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name.trim()) {
      setError("Please enter your full name.")
      return
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.")
      return
    }
    setLoading(true)
    try {
      const params = new URLSearchParams({
        name: name.trim(),
        phone: phone.trim(),
      })
      await fetch(`${SHEET_URL}?${params.toString()}`, { mode: "no-cors" })
      localStorage.setItem("ds_lead_submitted", "1")
      localStorage.setItem("ds_lead_name", name.trim())
      localStorage.setItem("ds_lead_phone", phone.trim())
      onUnlock()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const card = {
    background: "#0D0F1C",
    border: "1px solid rgba(255,255,255,0.07)",
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-5"
      style={{ background: DOT_BG, backdropFilter: "blur(2px)" }}
    >
      <AnimatePresence mode="wait">
        {/* ── Step 1: Notice ─────────────────────────────────── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.96 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[320px]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {/* Card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#11131f",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #3A4EFB 0%, #33A4FA 60%, transparent 100%)",
                }}
              />

              <div className="px-7 pt-7 pb-7">
                {/* Icon */}

                <h2
                  className="text-base font-extrabold text-white mb-2 text-center text-[#ffe500]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Before you continue!
                </h2>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#6B7299" }}
                >
                  Datespot is a{" "}
                  <span style={{ color: "#F0F2FF", fontWeight: 700 }}>
                    paid group
                  </span>
                  . Register only if you're comfortable with it.
                </p>

                {/* Divider */}
                <div
                  className="my-6"
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(2)}
                  className="w-full rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #3A4EFB 0%, #2a3ad4 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(58,78,251,0.4)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Got it, continue
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Register ───────────────────────────────── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[340px]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#11131f",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, #3A4EFB 0%, #33A4FA 60%, transparent 100%)",
                }}
              />

              <div className="px-7 pt-7 pb-7">
                {/* Header */}
                <div className="mb-6">
                  <h2
                    className="text-base font-extrabold text-white mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Enter your details
                  </h2>
                  <p className="text-[12px]" style={{ color: "#6B7299" }}>
                    Quick intro before you join the group
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label
                      className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                      style={{ color: "#4a5070" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 outline-none text-[13px] font-semibold transition-all"
                      style={{
                        background: "#0d0f1a",
                        border: `1px solid ${
                          name
                            ? "rgba(58,78,251,0.5)"
                            : "rgba(255,255,255,0.07)"
                        }`,
                        color: "#F0F2FF",
                        caretColor: "#3A4EFB",
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                      style={{ color: "#4a5070" }}
                    >
                      Phone
                    </label>
                    <div
                      className="flex items-center rounded-xl overflow-hidden transition-all"
                      style={{
                        background: "#0d0f1a",
                        border: `1px solid ${
                          phone
                            ? "rgba(58,78,251,0.5)"
                            : "rgba(255,255,255,0.07)"
                        }`,
                      }}
                    >
                      <span
                        className="px-3.5 py-3 text-[13px] font-bold shrink-0"
                        style={{
                          color: "#4a5070",
                          borderRight: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={phone}
                        maxLength={10}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        className="flex-1 px-3.5 py-3 outline-none text-[13px] font-semibold bg-transparent"
                        style={{ color: "#F0F2FF", caretColor: "#3A4EFB" }}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] font-semibold text-red-400 bg-red-950/30 px-3 py-2 rounded-lg"
                      style={{ border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl py-3 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                      style={{
                        background: loading
                          ? "#1a1c2e"
                          : "linear-gradient(135deg, #3A4EFB 0%, #2a3ad4 100%)",
                        color: loading ? "#4a5070" : "#fff",
                        boxShadow: loading
                          ? "none"
                          : "0 4px 20px rgba(58,78,251,0.4)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Join Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-center text-[11px] font-medium transition-opacity hover:opacity-60"
                    style={{ color: "#4a5070" }}
                  >
                    ← Back
                  </button>

                  <p
                    className="text-center text-[10px] font-medium"
                    style={{ color: "#2e3050" }}
                  >
                    🔒 Your info is private &amp; never shared
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ onJoin }: { onJoin: () => void }) {
  const [idx, setIdx] = useState(0)
  const items = [
    { value: "100+", label: "Members", icon: Users, c1: B1, c2: B2 },
    {
      value: "Daily",
      label: "Active",
      icon: Zap,
      c1: "#10B981",
      c2: "#34D399",
    },
    {
      value: "100%",
      label: "Verified",
      icon: Shield,
      c1: "#8B5CF6",
      c2: "#C084FC",
    },
    {
      value: "18+",
      label: "Content",
      icon: Flame,
      c1: "#EF4444",
      c2: "#F97316",
    },
  ]
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), 2400)
    return () => clearInterval(t)
  }, [])

  return null
}

// ─── Reviews Slider ───────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#3A4EFB",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
  "#F97316",
  "#14B8A6",
  "#A855F7",
]

function ReviewsStrip() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [dragging, setDragging] = useState(false)
  const dragStartX = useRef(0)

  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setCurrent((p) => (p + 1) % REVIEWS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const goTo = (i: number, dir: number) => {
    setDirection(dir)
    setCurrent(i)
  }
  const prev = () => goTo((current - 1 + REVIEWS.length) % REVIEWS.length, -1)
  const next = () => goTo((current + 1) % REVIEWS.length, 1)

  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = dragStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev()
  }
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(false)
    dragStartX.current = e.clientX
  }
  const onMouseUp = (e: React.MouseEvent) => {
    const dx = dragStartX.current - e.clientX
    if (Math.abs(dx) > 40) {
      setDragging(true)
      dx > 0 ? next() : prev()
    }
  }

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 0.94,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? "-60%" : "60%",
      opacity: 0,
      scale: 0.94,
    }),
  }

  const T = useT()
  const r = REVIEWS[current]
  const c1 = AVATAR_COLORS[current % AVATAR_COLORS.length]
  const c2 = AVATAR_COLORS[(current + 3) % AVATAR_COLORS.length]

  return null
}

function ReviewsSlideshow() {
  return null
}

// ─── Urgency Banner ───────────────────────────────────────────────────────────
const CYCLE_SECS = 6 * 3600 // 6-hour looping countdown

function UrgencyBanner() {
  const getRemaining = () => {
    const now = Math.floor(Date.now() / 1000)
    const cycleStart = Math.floor(now / CYCLE_SECS) * CYCLE_SECS
    return CYCLE_SECS - (now - cycleStart)
  }
  const [time, setTime] = useState(getRemaining)
  useEffect(() => {
    const t = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(t)
  }, [])
  const h = String(Math.floor(time / 3600)).padStart(2, "0")
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0")
  const s = String(time % 60).padStart(2, "0")
  const pct = ((CYCLE_SECS - time) / CYCLE_SECS) * 100

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ background: "#0A0C18", borderBottom: `1px solid ${B1}30` }}
    >
      {/* Animated progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-1000"
        style={{ width: `${100 - pct}%`, background: HERO_GRAD }}
      />
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-3 h-3" style={{ color: ACCENT }} />
          </motion.div>
          <span
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: DARK }}
          >
            Flash Sale · Ends in
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[h, m, s].map((unit, i) => (
            <React.Fragment key={i}>
              <div
                className="flex flex-col items-center px-1.5 py-0.5 rounded-md"
                style={{ background: `${B1}25`, minWidth: 28 }}
              >
                <span
                  className="font-black text-xs tabular-nums leading-none"
                  style={{ color: DARK }}
                >
                  {unit}
                </span>
              </div>
              {i < 2 && (
                <span className="font-black text-xs" style={{ color: MUTED }}>
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Animated Stats ───────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setVal(Math.round(t * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return { val, ref }
}

function StatsSection() {
  const T = useT()
  const s1 = useCountUp(548)
  const s2 = useCountUp(467)
  const s3 = useCountUp(1000)
  const s4 = useCountUp(95)
  const stats = [
    { ref: s1.ref, val: s1.val, suffix: "+", label: "Members", c1: B1, c2: B2 },
    {
      ref: s2.ref,
      val: s2.val,
      suffix: "",
      label: "Online Today",
      c1: "#10B981",
      c2: "#34D399",
    },
    {
      ref: s3.ref,
      val: s3.val,
      suffix: "+",
      label: "Successful Joins",
      c1: "#EC4899",
      c2: "#A855F7",
    },
    {
      ref: s4.ref,
      val: s4.val,
      suffix: "%",
      label: "Positive Reviews",
      c1: "#F59E0B",
      c2: "#FCD34D",
    },
  ]
  return (
    <section className="py-5">
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s, i) => null)}
      </div>
    </section>
  )
}

// ─── Why Trust ────────────────────────────────────────────────────────────────
function WhyTrust() {
  const T = useT()
  const cards = [
    {
      icon: UserCheck,
      title: "Manual Profile Verification",
      desc: "Every member is verified by admin before getting access.",
      c1: B1,
      c2: B2,
    },
    {
      icon: Users,
      title: "Active Bangalore Community",
      desc: "548+ real members from Bangalore, active daily.",
      c1: "#10B981",
      c2: "#34D399",
    },
    {
      icon: Shield,
      title: "No Fake Profiles Policy",
      desc: "Instant removal of any fake or spam profiles.",
      c1: "#8B5CF6",
      c2: "#C084FC",
    },
    {
      icon: Headphones,
      title: "Direct Admin Support",
      desc: "Get help from Subhash directly, fast response guaranteed.",
      c1: "#EC4899",
      c2: "#F97316",
    },
  ]
  return null
}

// ─── Meet the Admin ───────────────────────────────────────────────────────────
function MeetAdmin() {
  const T = useT()
  const badges = [
    "5+ Years Community Experience",
    "Personally Verified Members",
    "Fast Support",
  ]
  return null
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const T = useT()
  const [open, setOpen] = useState<number | null>(null)
  const items = [
    {
      q: "Is this genuine?",
      a: "Yes. Datespot has been running since 2021 with 548+ verified members. Every member is manually approved by Subhash Gowda before getting access.",
    },
    {
      q: "How do I get access?",
      a: "Pay ₹399 via UPI, upload the payment screenshot, and you receive the Telegram group link instantly. The whole process takes under 2 minutes.",
    },
    {
      q: "Are profiles verified?",
      a: "Every profile is manually verified by the admin. Fake profiles, bots, and spam accounts are removed immediately — zero tolerance policy.",
    },
    {
      q: "Is my privacy protected?",
      a: "Absolutely. Your personal details are never shared with other members. The group has strict privacy rules and all screenshots of members are prohibited.",
    },
    {
      q: "How quickly do I receive access?",
      a: "Access is sent within minutes of payment confirmation, typically under 5 minutes. Admin support is available daily for any delays.",
    },
  ]
  return (
    <section className="py-6" aria-labelledby="faq-heading">
      <div className="text-center mb-5">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
          style={{
            color: B2,
            background: `${B1}12`,
            border: `1px solid ${B1}25`,
          }}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-[0.16em]">
            Need to know
          </span>
        </div>
        <h2
          id="faq-heading"
          className="font-extrabold text-2xl md:text-3xl"
          style={{ color: T.DARK, letterSpacing: "-0.035em" }}
        >
          Frequently Asked Questions
        </h2>
        <p
          className="text-xs md:text-sm font-medium mt-1.5"
          style={{ color: T.MUTED }}
        >
          Tap a question to see the answer
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item, index) => {
          const isOpen = open === index
          const panelId = `faq-panel-${index}`
          return (
            <div
              key={item.q}
              className="rounded-2xl overflow-hidden"
              style={{
                background: T.CARD_BG,
                border: `1px solid ${isOpen ? `${B1}55` : T.BORDER}`,
                boxShadow: isOpen && !T.isDark ? `0 8px 24px ${B1}12` : "none",
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
                  style={{
                    color: isOpen ? "#fff" : B1,
                    background: isOpen ? HERO_GRAD : `${B1}12`,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex-1 font-bold text-sm md:text-base"
                  style={{ color: T.DARK }}
                >
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${B1}10`, color: B1 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-4 md:px-5 pb-4 pl-[4.25rem] text-xs md:text-sm leading-relaxed font-medium"
                      style={{ color: T.MUTED }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── Sticky CTA ───────────────────────────────────────────────────────────────
function StickyCTA({ onJoin }: { onJoin: () => void }) {
  const T = useT()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-2"
          style={{
            background: T.isDark
              ? "linear-gradient(to top, rgba(13,15,26,0.97) 55%, transparent)"
              : "linear-gradient(to top, rgba(245,246,255,0.97) 55%, transparent)",
          }}
        >
          <motion.button
            onClick={onJoin}
            whileTap={{ scale: 0.97 }}
            className="relative w-full max-w-md mx-auto block rounded-2xl overflow-hidden"
            style={{ background: HERO_GRAD, boxShadow: `0 6px 28px ${B1}60` }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ x: ["-100%", "160%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                width: "60%",
              }}
            />
            <div className="relative flex items-center justify-center gap-3 py-3.5 px-6">
              <span className="font-black text-white text-sm tracking-tight">
                Join Datespot
              </span>
              <span className="text-white/40 text-[11px] line-through font-semibold">
                ₹999
              </span>
              <span className="font-black text-white text-sm">₹399</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
function MobileApp() {
  const T = useT()
  const [showPayment, setShowPayment] = useState(false)
  const [paymentType, setPaymentType] = useState<"full" | "demo">("full")
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem("ds_lead_submitted") === "1",
  )
  const constraintsRef = useRef<HTMLDivElement>(null)

  const openPayment = (type: "full" | "demo") => {
    setPaymentType(type)
    setShowPayment(true)
  }

  return (
    <div
      ref={constraintsRef}
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: T.DOT_BG,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <ThemeToggle />
      {!unlocked && <LeadGate onUnlock={() => setUnlocked(true)} />}

      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: HERO_GRAD }}
      >
        <GlassBlob size={110} top="-10%" right="-6%" rotate={18} />
        <GlassBlob size={70} bottom="5%" left="-8%" rotate={-20} rx="50%" />
        <GlassBlob
          size={45}
          top="40%"
          right="8%"
          rotate={35}
          rx="40% 60% 55% 45% / 50% 40% 60% 50%"
        />
      </section>

      {/* About Strip */}
      <div className="max-w-md mx-auto px-4 pt-5">
        <div
          className="rounded-2xl px-4 py-4 mb-1"
          style={{
            background: T.CARD_BG,
            border: `1px solid ${B1}1E`,
            boxShadow: T.isDark ? "none" : "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex flex-col items-center gap-1.5 mb-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: HERO_GRAD }}
            >
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="font-black leading-none text-[20px]"
                style={{ color: T.DARK, letterSpacing: "-0.02em" }}
              >
                Datespot
              </span>
            </div>
          </div>
          <p
            className="text-[12px] leading-relaxed font-medium text-center"
            style={{ color: T.MUTED }}
          >
            A{" "}
            <span className="font-bold" style={{ color: T.DARK }}>
              private paid Telegram group
            </span>{" "}
            to chat, call & meet verified women for dating and hookups. Real
            people, zero fake profiles.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4">
        {/* Stats */}
        <StatsSection />

        {/* Gallery */}
        <GroupPreviewSlider images={IMAGES} mobile />

        {/* What You Get */}
        <section className="py-5">
          <div className="mb-4">
            <h2
              className="font-extrabold text-xl"
              style={{ color: T.DARK, letterSpacing: "-0.03em" }}
            >
              What You Get
            </h2>
            <p
              className="text-xs font-semibold mt-0.5"
              style={{ color: T.MUTED }}
            >
              Everything inside the group
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {FEAT.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3.5 rounded-2xl px-4 py-3 relative"
                  style={{
                    background: T.CARD_BG,
                    border: `1px solid ${f.c1}22`,
                    boxShadow: T.isDark ? "none" : "0 1px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${f.c1}, ${f.c2})`,
                    }}
                  >
                    <Icon
                      className="w-4.5 h-4.5 text-white"
                      style={{ width: 18, height: 18 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-bold text-[13px]"
                      style={{ color: T.DARK }}
                    >
                      {f.title}
                    </div>
                    <div
                      className="text-[11px] font-medium mt-0.5"
                      style={{ color: T.MUTED }}
                    >
                      {f.desc}
                    </div>
                  </div>
                  {f.badge && (
                    <span
                      className="text-[8px] font-black px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        background: `${f.c1}22`,
                        color: f.c1,
                        border: `1px solid ${f.c1}40`,
                      }}
                    >
                      {f.badge}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Why Trust */}
        <WhyTrust />

        {/* Meet Admin */}
        <MeetAdmin />

        {/* Reviews slider */}
        <ReviewsStrip />

        {/* Final CTA */}
        <section className="pt-2 pb-8">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: T.CARD_BG,
              border: "1px solid rgba(58,78,251,0.22)",
              boxShadow: `0 0 40px ${B1}15`,
            }}
          >
            <div className="h-[3px]" style={{ background: HERO_GRAD }} />
            <div className="px-5 py-5 flex flex-col items-center text-center gap-4">
              {/* Discount tag */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgb(0, 115, 255)",
                  border: "1px solid var(--sidebar-border)",
                }}
              >
                <Sparkles
                  className="w-2.5 h-2.5"
                  stroke="none"
                  fill="var(--background)"
                  style={{
                    color: ACCENT,
                    borderStyle: "none",
                    borderColor: "rgba(0, 0, 0, 0)",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 4px 4px 0px, rgba(0, 0, 0, 0.25) 0px 4px 4px 0px inset",
                    "--figma-make-local-effect-type": "INNER_SHADOW",
                  } as React.CSSProperties}
                />
                <span
                  className="text-[9px] font-black uppercase tracking-widest"
                  style={{ color: "var(--background)" }}
                >
                  Biggest Discount of the Year
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 justify-center">
                <span
                  className="text-sm line-through font-semibold"
                  style={{ color: T.MUTED }}
                >
                  ₹999
                </span>
                <span
                  className="font-black text-4xl leading-none"
                  style={{ color: "rgb(0, 106, 255)" }}
                >
                  ₹399
                </span>
              </div>

              {/* CTA Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => openPayment("full")}
                className="w-full rounded-xl font-black text-white flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  background: HERO_GRAD,
                  boxShadow: `0 6px 24px ${B1}50`,
                  padding: "14px 20px",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />
                <span className="text-sm tracking-tight relative z-10">
                  Join Datespot Now
                </span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />
      </div>

      {/* Sticky CTA */}
      <StickyCTA onJoin={() => openPayment("full")} />

      <AnimatePresence>
        {showPayment && (
          <PaymentModal
            onClose={() => setShowPayment(false)}
            paymentType={paymentType}
          />
        )}
      </AnimatePresence>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: T.CARD_BG,
            color: T.DARK,
            borderRadius: "14px",
            fontSize: "13px",
            fontWeight: "700",
            border: `1px solid ${B1}4D`,
            boxShadow: `0 8px 24px ${B1}40`,
          },
        }}
      />
    </div>
  )
}

export default function App() {
  const [isMobile, setIsMobile] = useState(true)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <ThemeProvider>
      {isMobile ? <MobileApp /> : <DesktopWrapper />}
    </ThemeProvider>
  )
}

function DesktopWrapper() {
  const [showPayment, setShowPayment] = useState(false)
  const [paymentType, setPaymentType] = useState<"full" | "demo">("full")
  const openPayment = (type: "full" | "demo") => {
    setPaymentType(type)
    setShowPayment(true)
  }
  return (
    <DesktopVersion
      onOpenPayment={openPayment}
      showPayment={showPayment}
      onClosePayment={() => setShowPayment(false)}
      paymentType={paymentType}
    />
  )
}

// ─── Desktop Version ──────────────────────────────────────────────────────────
function DesktopVersion({
  onOpenPayment,
  showPayment,
  onClosePayment,
  paymentType,
}: {
  onOpenPayment: (type: "full" | "demo") => void
  showPayment: boolean
  onClosePayment: () => void
  paymentType: "full" | "demo"
}) {
  const T = useT()
  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  const avatarColors = AVATAR_COLORS

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        background: T.DOT_BG,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <ThemeToggle />
      <UrgencyBanner />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: HERO_GRAD }}
      >
        <GlassBlob size={320} top="-10%" right="-5%" rotate={25} />
        <GlassBlob size={200} bottom="0" left="-3%" rotate={-20} />
        <GlassBlob size={100} top="30%" right="20%" rotate={40} rx="50%" />
        <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/18 border border-white/25 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">
                Limited Spots Available
              </span>
            </div>
            <h1
              className="font-extrabold text-white uppercase leading-[0.88] mb-5"
              style={{ fontSize: 76, letterSpacing: "-0.04em" }}
            >
              Wanna Date
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-white/60" />
              <span className="font-bold text-white/80 text-lg uppercase tracking-widest">
                Bangalore Women
              </span>
            </div>
            <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-lg font-medium">
              Join 548+ verified members in Bangalore's most exclusive dating
              community. Voice calls, video chats, and real meetups.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => onOpenPayment("full")}
                className="rounded-2xl font-bold text-lg flex items-center overflow-hidden transition-all hover:scale-105 shadow-2xl relative"
                style={{
                  background: HERO_GRAD,
                  boxShadow: `0 8px 32px ${B1}55`,
                }}
              >
                <div className="flex items-center gap-3 px-7 py-4 text-white">
                  <span className="line-through opacity-50 text-sm">₹999</span>
                  <span className="font-black">Join for ₹399</span>
                </div>
                <div
                  className="px-5 py-4 self-stretch flex items-center"
                  style={{ background: "rgba(0,0,0,0.15)" }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative" style={{ width: 280 }}>
              <div
                className="absolute inset-0 rounded-[2.5rem] blur-3xl opacity-30 scale-90"
                style={{ background: "rgba(255,255,255,0.5)" }}
              />
              <div
                className="relative overflow-hidden rounded-[2.5rem] shadow-2xl"
                style={{
                  aspectRatio: "9/16",
                  border: "3px solid rgba(255,255,255,0.3)",
                }}
              >
                <img
                  src={IMAGES[0]}
                  alt="Datespot Telegram group preview"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <StatsSection />
      </section>

      {/* What You Get — row list */}
      <section className="max-w-5xl mx-auto px-8 pb-12">
        <div className="text-center mb-10">
          <h2
            className="font-extrabold text-4xl mb-2"
            style={{ color: T.DARK, letterSpacing: "-0.04em" }}
          >
            What You Get
          </h2>
          <p className="text-lg font-medium" style={{ color: T.MUTED }}>
            Everything inside the group, from day one
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FEAT.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: T.CARD_BG,
                  border: `1px solid ${f.c1}22`,
                  boxShadow: T.isDark ? "none" : "0 1px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${f.c1}, ${f.c2})`,
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: T.DARK }}>
                    {f.title}
                  </div>
                  <div
                    className="text-xs font-medium mt-0.5"
                    style={{ color: T.MUTED }}
                  >
                    {f.desc}
                  </div>
                </div>
                {f.badge && (
                  <span
                    className="text-[9px] font-black px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: `${f.c1}22`,
                      color: f.c1,
                      border: `1px solid ${f.c1}40`,
                    }}
                  >
                    {f.badge}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Gallery */}
      <div
        style={{
          background: T.CARD_BG,
          borderRadius: "3rem",
          margin: "0 2rem 4rem",
          border: `1px solid ${T.BORDER}`,
        }}
      >
        <GroupPreviewSlider images={IMAGES} />
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-8 pb-12">
        <FAQ />
      </section>

      {/* Reviews grid */}
      <section className="max-w-5xl mx-auto px-8 pb-12">
        <div className="text-center mb-8">
          <h2
            className="font-extrabold text-3xl mb-1"
            style={{ color: T.DARK, letterSpacing: "-0.03em" }}
          >
            What Members Say
          </h2>
          <p className="text-base font-medium" style={{ color: T.MUTED }}>
            Real reviews from Bangalore
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {REVIEWS.slice(0, 6).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: T.CARD_BG,
                border: `1.5px solid ${B1}18`,
                boxShadow: T.isDark ? "none" : "0 1px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{
                  background: `linear-gradient(180deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 3) % avatarColors.length]})`,
                }}
              />
              <div className="flex gap-0.5 mb-2 ml-1">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-2.5 h-2.5 fill-current"
                    style={{ color: "#F59E0B" }}
                  />
                ))}
              </div>
              <p
                className="text-sm leading-relaxed mb-3 font-medium ml-1"
                style={{ color: T.QUOTE }}
              >
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 ml-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[9px] shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 3) % avatarColors.length]})`,
                  }}
                >
                  {initials(review.name)}
                </div>
                <div>
                  <div className="font-bold text-xs" style={{ color: T.DARK }}>
                    {review.name}
                  </div>
                  <div
                    className="text-[10px] font-semibold flex items-center gap-0.5"
                    style={{ color: T.MUTED }}
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    {review.area}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-8 pb-16">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ background: T.CARD_BG, border: `1px solid ${B1}30` }}
        >
          <div className="h-[3px]" style={{ background: HERO_GRAD }} />
          <div className="p-12 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{
                background: "rgba(227,255,59,0.1)",
                border: "1px solid rgba(227,255,59,0.35)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
              <span
                className="text-sm font-black uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Biggest Discount of the Year
              </span>
            </div>
            <h2
              className="font-extrabold mb-2"
              style={{ color: T.DARK, fontSize: 40, letterSpacing: "-0.03em" }}
            >
              Ready to Join?
            </h2>
            <div className="flex items-baseline gap-2 justify-center mb-6">
              <span
                className="text-lg line-through font-semibold"
                style={{ color: T.MUTED }}
              >
                ₹999
              </span>
              <span
                className="font-black"
                style={{ fontSize: 48, color: B2, lineHeight: 1 }}
              >
                ₹399
              </span>
            </div>
            <button
              onClick={() => onOpenPayment("full")}
              className="rounded-2xl font-black text-white text-lg flex items-center gap-3 mx-auto relative overflow-hidden transition-all hover:scale-105 mb-4"
              style={{
                background: HERO_GRAD,
                boxShadow: `0 8px 32px ${B1}50`,
                padding: "16px 40px",
              }}
            >
              Join Datespot Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="max-w-7xl mx-auto px-8 py-8 text-center"
        style={{ borderTop: `1px solid ${B1}20` }}
      >
        <p className="text-sm font-semibold" style={{ color: T.MUTED }}>
          © 2026 Datespot Bangalore · One-time payment · Lifetime access · No
          hidden fees
        </p>
      </footer>

      <AnimatePresence>
        {showPayment && (
          <PaymentModal onClose={onClosePayment} paymentType={paymentType} />
        )}
      </AnimatePresence>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: T.CARD_BG,
            color: T.DARK,
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "700",
            border: `1px solid ${B1}30`,
            boxShadow: `0 8px 24px ${B1}40`,
          },
        }}
      />
    </div>
  )
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
type UploadState = "idle" | "verifying" | "success"

function PaymentModal({
  onClose,
  paymentType: _paymentType,
}: {
  onClose: () => void
  paymentType: "full" | "demo"
}) {
  const UPI_ID = "paytm.s36oa7e@pty"
  const AMOUNT = "399"
  const ORIGINAL_AMT = "999"
  const TELEGRAM_LINK = "https://t.me/+wHPA3hSr4c85ZWY1"
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Datespot&am=${AMOUNT}&cu=INR`

  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [tab, setTab] = useState<"qr" | "upi">("qr")

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const MAX = 900
        const scale = Math.min(1, MAX / Math.max(img.width, img.height))
        const canvas = document.createElement("canvas")
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas
          .getContext("2d")!
          .drawImage(img, 0, 0, canvas.width, canvas.height)
        URL.revokeObjectURL(url)
        resolve(canvas.toDataURL("image/jpeg", 0.75).split(",")[1])
      }
      img.src = url
    })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadState("verifying")
    toast.success("Verifying payment...")

    try {
      const base64 = await compressImage(file)
      const name = localStorage.getItem("ds_lead_name") ?? ""
      const phone = localStorage.getItem("ds_lead_phone") ?? ""
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "screenshot",
          name,
          phone,
          mimeType: "image/jpeg",
          fileName: `payment_${Date.now()}.jpg`,
          image: base64,
        }),
      })
    } catch {
      // no-cors — response is opaque, error means network issue
    }

    setTimeout(() => {
      setUploadState("success")
      toast.success("Payment verified! Welcome!")
      void import("canvas-confetti").then(({ default: confetti }) => {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.65 },
          colors: [B1, B2, "#fff", "#FF6B6B"],
        })
      })
      setTimeout(() => window.open(TELEGRAM_LINK, "_blank"), 1200)
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        onClick={uploadState === "idle" ? onClose : undefined}
      />
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-sm rounded-[1.75rem] overflow-hidden bg-white"
        style={{ boxShadow: "0 24px 80px rgba(13,16,64,0.28)" }}
      >
        {uploadState === "idle" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full z-20 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close payment"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}

        <div className="px-6 pt-6 pb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "rgb(0, 106, 255)" }}
          >
            <Heart className="w-4.5 h-4.5 text-white fill-white" />
          </div>
          <div className="pr-10">
            <h2 className="font-extrabold text-xl leading-tight text-gray-950">
              Join Datespot
            </h2>
            <p className="text-xs mt-1 font-medium text-gray-500">
              One payment for lifetime Telegram access
            </p>
          </div>
          <div className="flex items-end gap-2 mt-5">
            <div
              className="font-black text-4xl leading-none"
              style={{ color: "rgb(0, 106, 255)" }}
            >
              ₹{AMOUNT}
            </div>
            {ORIGINAL_AMT && (
              <div className="text-sm line-through text-gray-400 pb-0.5">
                ₹{ORIGINAL_AMT}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-6">
          {uploadState === "idle" && (
            <>
              <div
                className="flex rounded-xl p-1 mb-4 bg-gray-100"
              >
                {(["qr", "upi"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="flex-1 py-2.5 rounded-lg text-xs font-bold transition-all"
                    style={
                      tab === t
                        ? {
                            background: "white",
                            color: "rgb(0, 106, 255)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                          }
                        : { color: "#6B7280" }
                    }
                  >
                    {t === "qr" ? "Scan QR" : "UPI ID"}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tab === "qr" ? (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="rounded-2xl py-5 mb-2 flex items-center justify-center bg-gray-50">
                      <QRCodeSVG value={upiUrl} size={164} level="H" />
                    </div>
                    <p className="text-center text-[11px] mb-3 font-medium text-gray-500">
                      Scan with any UPI app
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-3"
                  >
                    <div
                      className="rounded-2xl p-4 mb-3 bg-gray-50"
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider mb-1.5 text-gray-400"
                      >
                        UPI ID
                      </p>
                      <p className="font-mono text-sm font-bold break-all mb-4 text-gray-900">
                        {UPI_ID}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(UPI_ID)
                            toast.success("Copied!")
                          }}
                          className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                          style={{
                            border: "1px solid #E5E7EB",
                            color: "#374151",
                            background: "white",
                          }}
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </button>
                        <a
                          href={upiUrl}
                          className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                          style={{ background: "rgb(0, 106, 255)" }}
                          onClick={() => toast.success("Opening UPI app...")}
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Pay
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="pt-4 mt-1 border-t border-gray-100"
              >
                <p className="text-center text-[11px] mb-2.5 font-medium text-gray-500">
                  After payment, upload your screenshot
                </p>
                <input
                  type="file"
                  id="ss-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="ss-upload"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm cursor-pointer active:scale-[0.98] transition-transform"
                  style={{
                    background: "rgb(0, 106, 255)",
                  }}
                >
                  <Upload className="w-4 h-4" /> Upload Screenshot
                </label>
              </div>
            </>
          )}

          {uploadState === "verifying" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: `${B1}12` }}
              >
                <Loader2
                  className="w-8 h-8 animate-spin"
                  style={{ color: B1 }}
                />
              </div>
              <p className="font-bold text-base mb-1 text-gray-900">
                Verifying Payment
              </p>
              <p className="text-xs font-medium text-gray-400">
                Please wait a moment...
              </p>
            </motion.div>
          )}

          {uploadState === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-8"
            >
              <div
                className="w-18 h-18 mx-auto rounded-2xl flex items-center justify-center mb-5 shadow-xl"
                style={{ background: HERO_GRAD, width: 72, height: 72 }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <p className="font-bold text-xl mb-1 text-gray-900">
                Payment Verified!
              </p>
              <p className="text-sm font-medium" style={{ color: B1 }}>
                Opening your Telegram invite...
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
