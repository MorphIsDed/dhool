import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export function initializeMap(container, center = [21.24, 81.42], zoom = 11) {
  // Initialize the Leaflet map container
  const map = L.map(container, {
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false,
    keyboard: false
  }).setView(center, zoom)

  // CartoDB Dark Matter tiles (100% free, dark styled theme matching site aesthetic)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map)

  return map
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
export { L }
