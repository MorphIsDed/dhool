const ICON_MAP = {
  water: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.25 5.562-7.5 8.75-7.5 11.25 0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-2.5-2.25-5.688-7.5-11.25z" />
    </svg>
  ),
  trees: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8.25 6.75h7.5M6 10.5h12M4.5 14.25h15" />
    </svg>
  ),
  sensors: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.375 9a3.75 3.75 0 117.5 0v3.545M12 18.75V21m-6.75-3.75h13.5" />
      <circle cx="12" cy="9" r="3" />
      <path d="M19.5 9.75a7.5 7.5 0 00-15 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  construction: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V3m0 18L3 14.25m9 6.75l9-6.75M12 3l9 6.75M12 3L3 9.75" />
    </svg>
  ),
  mask: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
    </svg>
  ),
  plants: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 9a6 6 0 00-6-6M12 15a6 6 0 016-6" />
    </svg>
  ),
  report: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H13.5M10.5 22.5H13.5M8.25 7.5V16.5M15.75 7.5V16.5" />
    </svg>
  ),
  plantation: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5a7.5 7.5 0 007.5-7.5c0-4.142-3.358-7.5-7.5-7.5S4.5 7.858 4.5 12c0 2.071.84 3.946 2.197 5.303l5.303 5.303" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V3" />
    </svg>
  ),
}

export default function SolutionCard({ icon, title, description, impact, timeline, cost }) {
  return (
    <div
      tabIndex={0}
      className="solution-card-wrapper rounded-lg border border-white/10 bg-black/20 p-5 transition-colors hover:border-dust-brown/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-dust-brown"
    >
      <div className="mb-3 text-dust-brown">{ICON_MAP[icon] || ICON_MAP.water}</div>
      <h3 className="mb-2 text-base font-semibold text-sand-light">{title}</h3>
      <p className="mb-4 text-sm text-muted">{description}</p>
      <div className="flex flex-wrap gap-2">
        {[
          ['Impact', impact],
          ['Timeline', timeline],
          ['Cost', cost],
        ].map(([label, value]) => (
          <span
            key={label}
            className="rounded-full border border-dust-brown/15 bg-dust-brown/10 px-2.5 py-1 font-mono text-[0.625rem] text-dust-brown"
          >
            {label}: {value}
          </span>
        ))}
      </div>
    </div>
  )
}
