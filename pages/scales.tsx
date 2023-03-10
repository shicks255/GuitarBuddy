import { useState } from 'react';
import FretboardNew from '../components/FretboardNew';
import PageHeaderNew from '../components/PageHeaderNew';
import {
  dorian,
  generateScaleTones,
  harmonicMinorDiatonics,
  harmonicMinorScale,
  locrian,
  lydian,
  majorDiatonics,
  majorScale,
  melodicMinorDiatonics,
  melodicMinorScale,
  mixolydian,
  natMinorDiatonics,
  naturalMinorScale,
  pattern,
  phrygian,
} from '../utils/utils';

const scaleAbbrev = {
  major: 'Major',
  natMinor: 'Natural Minor',
  melodMinor: 'Melodic Minor',
  harmMinor: 'Harmonic Minor',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  locrian: 'Locrian',
};

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
  if (scale === 'dorian') {
    selectedScale = dorian;
  }
  if (scale === 'phrygian') {
    selectedScale = phrygian;
  }
  if (scale === 'lydian') {
    selectedScale = lydian;
  }
  if (scale === 'mixolydian') {
    selectedScale = mixolydian;
  }
  if (scale === 'locrian') {
    selectedScale = locrian;
  }

  const tones = generateScaleTones(key, scale);

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

  return (
    <div className="p-4">
      <div>
        <PageHeaderNew headline="Scales">
          <p>
            Scales are of critically importance in music theory, and serve as
            the basis for many other concepts
            <br />
            <br />
            Select a key and one of the scales below to see all the notes that
            make up that scale, as well as the diatonic chords in that scale and
            the scale pattern.
            <br />
            <br />
            The{' '}
            <a
              className="text-orange-600 font-bold"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Major_scale"
              rel="noreferrer"
            >
              Major Scale
            </a>{' '}
            has an uplifting and happy sound, and is probably the most important
            scale to learn.
            <br />
            <br />
            The{' '}
            <a
              className="text-orange-600 font-bold"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Minor_scale"
              rel="noreferrer"
            >
              Minor Scale
            </a>{' '}
            has a sader or more foreboding sound, and actually has 3 slightly
            different versions:
          </p>
          <ul className="list-disc ml-4 p-2">
            <li>
              <a
                className="text-orange-700 font-bold"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Minor_scale#Natural_minor_scale"
                rel="noreferrer"
              >
                Natural Minor
              </a>
            </li>
            <li>
              <a
                className="text-orange-700 font-bold"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Minor_scale#Harmonic_minor_scale"
                rel="noreferrer"
              >
                Harmonic Minor{' '}
              </a>
            </li>
            <li>
              <a
                className="text-orange-700 font-bold"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Minor_scale#Melodic_minor_scale"
                rel="noreferrer"
              >
                Melodic Minor
              </a>
            </li>
          </ul>
        </PageHeaderNew>
        <div className="md:flex md:items-center mb-6 mt-6 justify-start">
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
        <div className="md:flex md:items-center mb-6 justify-start">
          <div className="md:w-12 flex-none">
            <label
              htmlFor="scaleSelect"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Scale
            </label>
          </div>
          <div className="md:w-2/3 flex-auto">
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
              <option value="dorian">Dorian</option>
              <option value="phrygian">Phrygian</option>
              <option value="lydian">Lydian</option>
              <option value="mixolydian">Mixolydian</option>
              <option value="locrian">Locrian</option>
            </select>
          </div>
        </div>
      </div>

      <FretboardNew keyy={key} scale={scale} />
      {key && scale && (
        <div className="rounded border px-6 pt-6 pb-2 mt-8">
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-xl text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {key} {scaleAbbrev[scale]}
            </div>
          </div>
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
          <div className="md:flex md:items-center justify-start">
            <div className="block text-gray-500 font-bold md:text-right md:mb-0 pr-4">
              Diatonic Chords:
            </div>
            <div>{diatonics.map((d) => d).join(' - ')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scales;
