export default function ZoneIndicator({ activeZone }) {
  return (
    <div style={{
      position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 1000,
    }}>
      {[0,1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: i === activeZone ? 10 : 6,
          height: i === activeZone ? 10 : 6,
          borderRadius: '50%',
          background: i === activeZone ? 'var(--particle-glow)' : 'var(--haze-grey)',
          transition: 'all 0.3s ease',
          opacity: i === activeZone ? 1 : 0.4,
        }} />
      ))}
    </div>
  )
}
