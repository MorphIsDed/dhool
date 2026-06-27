import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export function initializeMap(container, center = [81.3780, 21.2013], zoom = 11) {
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
    bearing: -17.6,
    interactive: false, // We want to control it via scrolling, not mouse drag
    attributionControl: false
  })
}

export function createMarkerElement(color, size = '20px') {
  const el = document.createElement('div')
  el.style.width = size
  el.style.height = size
  el.style.backgroundColor = color
  el.style.borderRadius = '50%'
  el.style.boxShadow = `0 0 15px 5px ${color}80`
  el.style.cursor = 'pointer'
  el.style.transition = 'transform 0.2s ease'
  
  // Hover effects
  el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.5)')
  el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)')
  
  return el
}
