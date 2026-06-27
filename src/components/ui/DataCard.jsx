export default function DataCard({ title, value, unit, sub, color = 'var(--dust-brown)' }) {
  return (
    <div style={{
      background: 'rgba(44,24,16,0.8)', border: `1px solid ${color}40`,
      borderRadius: '8px', padding: '1.25rem 1.5rem', backdropFilter: 'blur(8px)',
    }}>
      <div style={{ fontSize: '0.7rem', color: 'var(--haze-grey)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{title}</div>
      <div style={{ fontSize: '2.2rem', fontWeight: 700, color }}>
        {value}<span style={{ fontSize: '0.9rem', marginLeft: '0.3rem', color: 'var(--haze-grey)' }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--haze-grey)', marginTop: '0.4rem' }}>{sub}</div>}
    </div>
  )
}
