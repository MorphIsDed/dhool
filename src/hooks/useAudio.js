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
    // Initialise sounds lazily with load guards
    const initSound = (key, config) => {
      try {
        sounds.current[key] = new Howl({
          ...config,
          preload: false, // Don't block initial page load
          onloaderror: (id, error) => {
            console.warn(`Audio file ${config.src[0]} failed to load. Guards active.`, error)
          },
          onplayerror: (id, error) => {
            console.warn(`Playback failed for ${config.src[0]}`, error)
          }
        })
      } catch (err) {
        console.warn(`Howler instantiation failed for ${key}:`, err)
      }
    }

    initSound('wind', AUDIO_CONFIG.wind)
    initSound('storm', AUDIO_CONFIG.storm)
    initSound('clean', AUDIO_CONFIG.clean)

    const activeSounds = sounds.current

    return () => {
      Object.values(activeSounds).forEach(s => {
        if (s && typeof s.unload === 'function') {
          s.unload()
        }
      })
    }
  }, [])

  const playWind = () => {
    const s = sounds.current.wind
    if (!s) return
    try {
      if (!s.playing()) {
        s.play()
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const stopWind = () => {
    const s = sounds.current.wind
    if (s && s.playing()) {
      s.fade(0.15, 0, 1000)
    }
  }

  const playStorm = (vol = 0.3) => {
    const s = sounds.current.storm
    if (!s) return
    try {
      if (!s.playing()) {
        s.play()
      }
      s.fade(0, vol, 1500)
    } catch (e) {
      console.warn(e)
    }
  }

  const playClean = () => {
    const s = sounds.current.clean
    if (!s) return
    try {
      if (!s.playing()) {
        s.play()
      }
      s.fade(0, 0.2, 2000)
    } catch (e) {
      console.warn(e)
    }
  }

  const stopAll = () => {
    Object.values(sounds.current).forEach(s => {
      if (s) s.stop()
    })
  }

  return { playWind, stopWind, playStorm, playClean, stopAll }
}
