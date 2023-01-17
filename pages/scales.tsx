import { useState } from 'react';
import Fretboard from '../components/fretboard';
import {
  generateScaleTones,
  harmonicMinorDiatonics,
  harmonicMinorScale,
  majorDiatonics,
  majorScale,
  melodicMinorDiatonics,
  melodicMinorScale,
  natMinorDiatonics,
  naturalMinorScale,
  pattern,
} from '../utils';

const Scales: React.FC = () => {
  const [key, setKey] = useState<string | undefined>(undefined);
  const [scale, setScale] = useState<string | undefined>(undefined);
  let selectedScale = undefined;
  if (scale === 'major') {
    selectedScale = majorScale;
  }
  if (scale === 'harmMinor') {
    selectedScale = harmonicMinorScale;
  }
  if (scale === 'melodMinor') {
    selectedScale = melodicMinorScale;
  }
  if (scale === 'natMinor') {
    selectedScale = naturalMinorScale;
  }

  const tones = generateScaleTones(key, scale);

  console.log(tones);

  const diatonics = tones.map((tone, index) => {
    let d = majorDiatonics;
    if (scale === 'natMinor') {
      d = natMinorDiatonics;
    }
    if (scale === 'harmMinor') {
      d = harmonicMinorDiatonics;
    }
    if (scale === 'melodMinor') {
      d = melodicMinorDiatonics;
    }

    const x = d[index];
    return `${tone.note} ${x}`;
  });

  console.log(diatonics);

  return (
    <div className="p-4">
      <div className="max-w-sm">
        <h1 className="text-6xl font-bold mb-4">Scales</h1>
        <div className="md:flex md:items-center mb-6 justify-start">
          <div className="md:w-12 flex-none">
            <label
              htmlFor="keySelect"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Key
            </label>
          </div>
          <div className="md:w-2/3 flex-auto">
            <select
              name="keySelect"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option value=""></option>
              {pattern.map((note) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-12 flex-none">
            <label
              htmlFor="scaleSelect"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Scale
            </label>
          </div>
          <div className="md:w-2/3">
            <select
              name="scaleSelect"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option value=""></option>
              <option value="major">Major</option>
              <option value="natMinor">Natural Minor</option>
              <option value="melodMinor">Melodic Minor</option>
              <option value="harmMinor">Harmonic Minor</option>
            </select>
          </div>
        </div>
      </div>

      {key && scale && (
        <div className="rounded border p-6 mt-8">
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Scale Degrees:
            </div>
            <div>
              {selectedScale
                .map((note) => {
                  if (note === 1) {
                    return 'h';
                  }
                  return 'w';
                })
                .join(' - ')}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Notes:
            </div>
            <div>{tones.map((tone) => tone.note).join(' - ')}</div>
          </div>
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Diatonic Chords:
            </div>
            <div>{diatonics.map((d) => d).join(' - ')}</div>
          </div>
        </div>
      )}

      <Fretboard keyy={key} scale={scale} />
    </div>
  );
};

export default Scales;
