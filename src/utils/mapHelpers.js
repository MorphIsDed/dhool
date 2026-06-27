import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export function initializeMap(container, center = [81.42, 21.24], zoom = 10.8) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN
  if (!token) {
    console.warn('Mapbox token is missing. Map will not render correctly.')
  }
  
  mapboxgl.accessToken = token || 'pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2R1bW15In0.dummy'

  return new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v11',
    center,
    zoom,
    pitch: 45,
    bearing: -10,
    interactive: false, // Control via scroll/overlay, not direct drag
    attributionControl: false
  })
}

export function createMarkerElement(color, size = '16px') {
  // Container wrapper
  const container = document.createElement('div')
  container.className = 'relative flex items-center justify-center cursor-pointer'
  container.style.width = '36px'
  container.style.height = '36px'
  
  // Outer pulsing radar ring
  const pulseRing = document.createElement('div')
  pulseRing.className = 'absolute rounded-full animate-ping opacity-50 pointer-events-none'
  pulseRing.style.width = '24px'
  pulseRing.style.height = '24px'
  pulseRing.style.border = `2px solid ${color}`
  
  // Inner solid core dot
  const dot = document.createElement('div')
  dot.className = 'rounded-full transition-transform duration-300 ease-out shadow-lg'
  dot.style.width = size
  dot.style.height = size
  dot.style.backgroundColor = color
  dot.style.boxShadow = `0 0 10px 3px ${color}`

  container.appendChild(pulseRing)
  container.appendChild(dot)

  // Attach hover transform
  container.addEventListener('mouseenter', () => {
    dot.style.transform = 'scale(1.4)'
    pulseRing.style.transform = 'scale(1.2)'
  })
  container.addEventListener('mouseleave', () => {
    dot.style.transform = 'scale(1)'
    pulseRing.style.transform = 'scale(1)'
  })
  
  return container
}
