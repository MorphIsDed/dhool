export default function DataCard({ title, value, unit, sub, color = 'var(--dust-brown)' }) {
  return (
    <div 
      className="bg-earth-dark/85 backdrop-blur-md rounded-xl p-6 transition-all duration-300 border"
      style={{ borderColor: `${color}40` }}
    >
      <div className="text-[10px] text-haze-grey tracking-[0.15em] uppercase mb-2">
        {title}
      </div>
      <div 
        className="text-4xl font-bold font-mono"
        style={{ color }}
      >
        {value}
        <span className="text-sm font-sans ml-2 text-haze-grey font-normal">
          {unit}
        </span>
      </div>
      {sub && (
        <div className="text-xs text-haze-grey mt-3 leading-relaxed">
          {sub}
        </div>
      )}
    </div>
  )
}
