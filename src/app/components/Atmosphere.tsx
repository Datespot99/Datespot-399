/** Fixed, non-interactive background: aurora glow, dot grid, film grain, vignette. */
export function Atmosphere() {
  return (
    <div className="atmo" aria-hidden="true">
      <div className="atmo-aurora" />
      <div className="atmo-dots" />
      <div className="atmo-grain" />
      <div className="atmo-vignette" />
    </div>
  )
}
