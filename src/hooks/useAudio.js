import { useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'

const AUDIO_CONFIG = {
  wind: { src: ['/sounds/wind-ambient.mp3'], loop: true, volume: 0.12 },
  storm: { src: ['/sounds/dust-storm.mp3'], loop: true, volume: 0 },
  clean: { src: ['/sounds/birds-nature.mp3'], loop: true, volume: 0 },
}

function safeFade(sound, from, to, duration) {
  if (!sound) return
  try {
    sound.fade(from, to, duration)
  } catch {
    sound.volume(to)
  }
}

export function useAudio() {
  const sounds = useRef({})
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true

    Object.entries(AUDIO_CONFIG).forEach(([key, config]) => {
      try {
        sounds.current[key] = new Howl({
          ...config,
          preload: false,
          onloaderror: (_id, error) => {
            console.warn(`Audio ${config.src[0]} unavailable.`, error)
          },
        })
      } catch (err) {
        console.warn(`Howler init failed for ${key}:`, err)
      }
    })

    return () => {
      mounted.current = false
      Object.values(sounds.current).forEach((s) => {
        if (s?.unload) s.unload()
      })
      sounds.current = {}
    }
  }, [])

  const playWind = useCallback(() => {
    const wind = sounds.current.wind
    const storm = sounds.current.storm
    const clean = sounds.current.clean
    if (!wind) return

    try {
      if (!wind.playing()) wind.play()
      safeFade(wind, wind.volume(), 0.12, 800)
      safeFade(storm, storm?.volume() ?? 0, 0, 600)
      safeFade(clean, clean?.volume() ?? 0, 0, 600)
    } catch (e) {
      console.warn(e)
    }
  }, [])

  const stopWind = useCallback(() => {
    safeFade(sounds.current.wind, sounds.current.wind?.volume() ?? 0.12, 0, 900)
  }, [])

  const playStorm = useCallback((vol = 0.22) => {
    const wind = sounds.current.wind
    const storm = sounds.current.storm
    if (!storm) return

    try {
      if (!storm.playing()) storm.play()
      safeFade(storm, storm.volume(), vol, 1200)
      safeFade(wind, wind?.volume() ?? 0, 0.06, 1200)
    } catch (e) {
      console.warn(e)
    }
  }, [])

  const playClean = useCallback(() => {
    const wind = sounds.current.wind
    const storm = sounds.current.storm
    const clean = sounds.current.clean
    if (!clean) return

    try {
      if (!clean.playing()) clean.play()
      safeFade(clean, clean.volume(), 0.16, 1800)
      safeFade(wind, wind?.volume() ?? 0, 0, 1000)
      safeFade(storm, storm?.volume() ?? 0, 0, 1000)
    } catch (e) {
      console.warn(e)
    }
  }, [])

  const stopAll = useCallback(() => {
    Object.values(sounds.current).forEach((s) => {
      if (s?.playing()) s.stop()
    })
  }, [])

  return { playWind, stopWind, playStorm, playClean, stopAll }
}
