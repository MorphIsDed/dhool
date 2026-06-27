# धूल (DHOOL) — Dust Chronicle RBD

> An open-world, scroll-driven 3D experience exposing the hidden dust crisis in the Raipur–Bhilai–Durg corridor.

## Tech Stack
- **React + Vite** — UI framework
- **Three.js + React Three Fiber** — 3D world & particle systems
- **GSAP + ScrollTrigger** — cinematic scroll animation
- **Mapbox GL JS** — dust hotspot map
- **Howler.js** — ambient audio
- **Tailwind CSS** — utility styling

## Getting Started
\`\`\`bash
npm install
cp .env.example .env        # add your API keys
npm run dev
\`\`\`

## Project Structure
\`\`\`
src/
├── components/
│   ├── zones/          # 6 game-world zones (Zone0–Zone5)
│   ├── ui/             # Navbar, cards, loading screen
│   └── three/          # Three.js scene components
├── hooks/
│   ├── useScrollZone   # GSAP ScrollTrigger zone detection
│   ├── useAQIData      # OpenAQ live data + fallback
│   └── useAudio        # Howler.js ambient sounds
├── utils/
│   ├── gsapHelpers     # Reusable GSAP animations
│   ├── threeHelpers    # Three.js geometry utilities
│   └── mapHelpers      # Mapbox layer helpers
├── data/
│   ├── hotspots.js     # Dust hotspot coordinates & stats
│   ├── solutions.js    # Authority + citizen solutions
│   └── people.js       # Human impact stories
└── assets/
    ├── sounds/         # wind-ambient.mp3, dust-storm.mp3, birds-nature.mp3
    ├── textures/       # terrain textures (add your own)
    └── fonts/          # custom display fonts (optional)
\`\`\`

## Zones
| Zone | Title | Core Feature |
|------|-------|-------------|
| 0 | Entry Portal | Dust particle storm, DHOOL title reveal |
| 1 | The Land | 3D hotspot map of RBD corridor |
| 2 | The People | Human impact stories with dust shaders |
| 3 | The Science | Interactive PM10 vs AQI explainer |
| 4 | Solutions | Authority + citizen dual-track cards |
| 5 | Pledge | Green future vision + CTA |

## Sound Files Needed
Add these to `src/assets/sounds/`:
- `wind-ambient.mp3` — looping desert wind
- `dust-storm.mp3` — intensified storm sound
- `birds-nature.mp3` — clean nature ambience (Zone 5)

## Deploy
\`\`\`bash
npm run build
# Deploy dist/ to Vercel / Netlify
\`\`\`
