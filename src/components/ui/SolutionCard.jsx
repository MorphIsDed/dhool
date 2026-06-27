export default function SolutionCard({ icon, title, description, impact, timeline, cost }) {
  return (
    <div style={{
      background: 'rgba(44,24,16,0.85)', border: '1px solid rgba(196,149,106,0.25)',
      borderRadius: '10px', padding: '1.5rem', cursor: 'pointer',
      transition: 'transform 0.25s ease, border-color 0.25s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,149,106,0.7)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(196,149,106,0.25)' }}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{icon}</div>
      <h3 style={{ color: 'var(--sand-light)', marginBottom: '0.5rem', fontSize: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--haze-grey)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{description}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {[['Impact', impact], ['Timeline', timeline], ['Cost', cost]].map(([k, v]) => (
          <span key={k} style={{ fontSize: '0.7rem', background: 'rgba(196,149,106,0.15)', padding: '0.25rem 0.6rem', borderRadius: '20px', color: 'var(--dust-brown)' }}>
            {k}: {v}
          </span>
        ))}
      </div>
    </div>
  )
}
