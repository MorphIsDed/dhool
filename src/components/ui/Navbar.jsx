const ZONES = ['Entry', 'The Land', 'The People', 'The Science', 'Solutions', 'Pledge']

export default function Navbar({ activeZone }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: 'rgba(44,24,16,0.7)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(196,149,106,0.2)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--dust-brown)' }}>धूल</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {ZONES.map((z, i) => (
          <a key={z} href={`#Zone${i}`} style={{
            fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: activeZone === i ? 'var(--particle-glow)' : 'var(--haze-grey)',
            textDecoration: 'none', transition: 'color 0.3s',
          }}>{z}</a>
        ))}
      </div>
    </nav>
  )
}
