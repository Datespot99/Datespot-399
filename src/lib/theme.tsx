import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type Ctx = { isDark: boolean; toggle: () => void }
const ThemeCtx = createContext<Ctx>({ isDark: true, toggle: () => {} })
export const useTheme = () => useContext(ThemeCtx)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The <html> class is set by an inline script in index.html before first paint.
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('ds_theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable (private mode) – theme still applies for this visit */
    }
    setIsDark(next)
  }, [])

  return <ThemeCtx.Provider value={{ isDark, toggle }}>{children}</ThemeCtx.Provider>
}
