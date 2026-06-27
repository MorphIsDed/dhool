import { describe, test, expect } from 'vitest'
import { HOTSPOTS } from '../data/hotspots'
import { SOLUTIONS } from '../data/solutions'
import { PEOPLE } from '../data/people'
import { DUST_IN_LANGUAGES } from '../data/languages'

describe('DHOOL Data Integrity Audits', () => {

  test('Hotspots dataset contains all required fields and valid coordinates', () => {
    expect(HOTSPOTS.length).toBeGreaterThan(0)
    HOTSPOTS.forEach(spot => {
      expect(spot.id).toBeDefined()
      expect(typeof spot.id).toBe('string')
      
      expect(spot.name).toBeDefined()
      expect(typeof spot.name).toBe('string')
      
      // Coordinates validation [lat, lng]
      expect(spot.coords).toBeDefined()
      expect(Array.isArray(spot.coords)).toBe(true)
      expect(spot.coords.length).toBe(2)
      expect(typeof spot.coords[0]).toBe('number')
      expect(typeof spot.coords[1]).toBe('number')
      
      // Values validation
      expect(spot.pm10).toBeGreaterThan(0)
      expect(spot.pm25).toBeGreaterThan(0)
      expect(spot.affectedPop).toBeGreaterThan(0)
      
      expect(['critical', 'high', 'moderate', 'low']).toContain(spot.severity)
    })
  })

  test('Solutions dataset has standard fields with clean non-emoji string keys', () => {
    const categories = ['authorities', 'citizens']
    categories.forEach(cat => {
      expect(SOLUTIONS[cat]).toBeDefined()
      expect(Array.isArray(SOLUTIONS[cat])).toBe(true)
      expect(SOLUTIONS[cat].length).toBeGreaterThan(0)
      
      SOLUTIONS[cat].forEach(sol => {
        expect(sol.id).toBeDefined()
        expect(sol.title).toBeDefined()
        expect(sol.description).toBeDefined()
        expect(sol.impact).toBeDefined()
        expect(sol.timeline).toBeDefined()
        expect(sol.cost).toBeDefined()
        
        // Emojis must be removed - verify icon is a mapped key string
        expect(sol.icon).toBeDefined()
        expect(typeof sol.icon).toBe('string')
        expect(sol.icon).not.toMatch(/[\uD800-\uDFFF]./) // Reject UTF-16 surrogate pairs (emojis)
      })
    })
  })

  test('People dataset contains proper narrative profiles and color themes', () => {
    expect(PEOPLE.length).toBe(3)
    PEOPLE.forEach(person => {
      expect(person.id).toBeDefined()
      expect(person.label).toBeDefined()
      expect(person.story).toBeDefined()
      expect(person.stat).toBeDefined()
      
      // Color validation hex
      expect(person.color).toBeDefined()
      expect(person.color).toMatch(/^#[0-9A-F]{6}$/i)
    })
  })

  test('Indian languages translation registry contains word lists', () => {
    expect(DUST_IN_LANGUAGES.length).toBe(22)
    DUST_IN_LANGUAGES.forEach(lang => {
      expect(lang.word).toBeDefined()
      expect(lang.language).toBeDefined()
      expect(lang.script).toBeDefined()
    })
  })

})
