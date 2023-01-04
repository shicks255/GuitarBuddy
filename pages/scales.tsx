import { useState } from 'react'
import {
  generateFretboard2,
  generateScaleTones,
  harmonicMinorScale,
  majorScale,
  melodicMinorScale,
  naturalMinorScale,
  pattern,
} from '../utils'

const Scales: React.FC = () => {
  const [key, setKey] = useState('')
  const [scale, setScale] = useState<string | undefined>(undefined)
  let selectedScale = undefined
  if (scale === 'major') {
    selectedScale = majorScale
  }
  if (scale === 'harmMinor') {
    selectedScale = harmonicMinorScale
  }
  if (scale === 'melodMinor') {
    selectedScale = melodicMinorScale
  }
  if (scale === 'natMinor') {
    selectedScale = naturalMinorScale
  }

  const [neckWood, setNeckWood] = useState('maple')

  const tones = generateScaleTones(key, scale)

  return (
    <div className="p-2">
      <h1 className="text-lg">Scales</h1>

      <label htmlFor="keySelect">Key</label>
      <select
        name="keySelect"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      >
        <option value=""></option>
        {pattern.map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="scaleSelect">Scale</label>
      <select
        name="scaleSelect"
        value={scale}
        onChange={(e) => setScale(e.target.value)}
      >
        <option value=""></option>
        <option value="major">Major</option>
        <option value="natMinor">Natural Minor</option>
        <option value="melodMinor">Melodic Minor</option>
        <option value="harmMinor">Harmonic Minor</option>
      </select>

      <form>
        <input
          type="radio"
          name="wood"
          id="maple"
          value="maple"
          checked={neckWood === 'maple'}
          onChange={() => {
            setNeckWood('maple')
          }}
        />
        <label htmlFor="maple">Maple</label>
        <input
          type="radio"
          name="wood"
          id="rosewood"
          value="rosewood"
          checked={neckWood === 'rosewood'}
          onChange={() => setNeckWood('rosewood')}
        />
        <label htmlFor="rosewood">Rosewood</label>
      </form>

      {key && scale && (
        <div>
          Scale Degrees: {selectedScale.join(' - ')}
          <br />
          Notes: {tones.map((tone) => tone.note).join(' - ')}
        </div>
      )}

      {generateFretboard2(key, scale, neckWood === 'rosewood')}
    </div>
  )
}

export default Scales
