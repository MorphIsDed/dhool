import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

const AUDIO_CONFIG = {
  wind:  { src: ['/sounds/wind-ambient.mp3'],  loop: true, volume: 0.15 },
  storm: { src: ['/sounds/dust-storm.mp3'],    loop: true, volume: 0.0  },
  clean: { src: ['/sounds/birds-nature.mp3'],  loop: true, volume: 0.0  },
}

export function useAudio() {
  const sounds = useRef({})

  useEffect(() => {
    // Initialise sounds lazily (requires user gesture first)
    sounds.current.wind  = new Howl(AUDIO_CONFIG.wind)
    sounds.current.storm = new Howl(AUDIO_CONFIG.storm)
    sounds.current.clean = new Howl(AUDIO_CONFIG.clean)
    return () => Object.values(sounds.current).forEach(s => s.unload())
  }, [])

  const playWind  = () => sounds.current.wind?.play()
  const stopWind  = () => sounds.current.wind?.fade(0.15, 0, 1000)
  const playStorm = (vol = 0.3) => {
    sounds.current.storm?.play()
    sounds.current.storm?.fade(0, vol, 1500)
  }
  const playClean = () => {
    sounds.current.clean?.play()
    sounds.current.clean?.fade(0, 0.2, 2000)
  }
  const stopAll = () => Object.values(sounds.current).forEach(s => s.stop())

  return { playWind, stopWind, playStorm, playClean, stopAll }
}
