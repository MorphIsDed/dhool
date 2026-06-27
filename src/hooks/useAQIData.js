import { useState, useEffect } from 'react'

const OPENAQ_BASE = 'https://api.openaq.org/v3'

// Raipur location ID on OpenAQ: 8673 (verified)
const LOCATION_IDS = {
  raipur: '8673',
}

export function useAQIData() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${OPENAQ_BASE}/locations/${LOCATION_IDS.raipur}/latest`,
          { headers: { 'Accept': 'application/json' } }
        )
        if (!res.ok) throw new Error('OpenAQ fetch failed')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.warn('AQI fetch failed, using fallback data:', err.message)
        // Fallback static snapshot (June 2024 averages)
        setData({
          fallback: true,
          pm10:  187,
          pm25:  68,
          aqi:   112,
          timestamp: '2024-06-15T10:00:00Z',
        })
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}
