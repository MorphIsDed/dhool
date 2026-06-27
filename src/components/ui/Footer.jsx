export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-[#140a06] py-14">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div className="space-y-3">
            <div className="text-2xl font-semibold text-dust-brown" style={{ fontFamily: 'var(--font-display)' }}>
              धूल / DHOOL
            </div>
            <p className="max-w-md text-sm text-muted">
              A visual chronicle of dust exposure in the Raipur-Bhilai-Durg corridor — built to turn air quality data into public pressure and practical action.
            </p>
          </div>

          <div>
            <div className="eyebrow text-sand-light/75">Sources</div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>National Air Quality Index, CPCB India</li>
              <li>OpenAQ v3 live feeds, Station 8673</li>
              <li>Raipur Municipal Corporation budget briefs</li>
              <li>Chhattisgarh State Environment Conservation Board reports</li>
              <li>Composite citizen field journals</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-sand-light/75">Navigate</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted lg:grid-cols-1">
              <li><a className="transition-colors hover:text-sand-light" href="#Zone0Entry">Entry</a></li>
              <li><a className="transition-colors hover:text-sand-light" href="#Zone1Land">The Land</a></li>
              <li><a className="transition-colors hover:text-sand-light" href="#Zone2People">The People</a></li>
              <li><a className="transition-colors hover:text-sand-light" href="#Zone3Science">The Science</a></li>
              <li><a className="transition-colors hover:text-sand-light" href="#Zone4Solutions">Solutions</a></li>
              <li><a className="transition-colors hover:text-sand-light" href="#Zone5Pledge">Pledge</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-haze-grey/60 md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} DHOOL</span>
          <span className="font-mono">React · Three.js · Leaflet · Open data</span>
        </div>
      </div>
    </footer>
  )
}
