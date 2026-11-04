import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/lib/theme'
import { Atmosphere } from './components/Atmosphere'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProofStrip, Features, HowItWorks, Reviews, FAQ } from './components/Sections'
import { FinalCta, Footer } from './components/FinalCta'
import { StickyCta } from './components/StickyCta'
import { LeadGate } from './components/LeadGate'
import { PaymentSheet } from './components/PaymentSheet'

const wasUnlocked = () => {
  try {
    return localStorage.getItem('ds_lead_submitted') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [paying, setPaying] = useState(false)
  const [unlocked, setUnlocked] = useState(wasUnlocked)
  const open = () => setPaying(true)

  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-clip">
        <Atmosphere />
        <Header />
        <main>
          <Hero onJoin={open} />
          <ProofStrip />
          <Features />
          <HowItWorks />
          <Reviews />
          <FAQ />
          <FinalCta onJoin={open} />
        </main>
        <Footer />
        <StickyCta onJoin={open} hidden={paying || !unlocked} />

        <AnimatePresence>{paying && <PaymentSheet onClose={() => setPaying(false)} />}</AnimatePresence>
        {!unlocked && <LeadGate onUnlock={() => setUnlocked(true)} />}

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--surface)',
              color: 'var(--fg)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              fontSize: '13px',
              fontWeight: 700,
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}
