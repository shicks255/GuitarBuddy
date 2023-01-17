import { useState } from 'react';
import { chordTypes } from '../chordTypes';
import Fretboard from '../components/fretboard';
import { chordFamilies, chords, generateChord, pattern } from '../utils';

const Chords = () => {
  const [key, setKey] = useState('');
  const [chord, setChord] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);

  const changeKey = (newKey: string) => {
    setKey(newKey);
  };

  const changeChord = (newChord: string) => {
    setType('');
    setChord(newChord);
  };

  const types = chordTypes.filter((c) => c.name === chord).map((c) => c.type);

  const chordTones = generateChord(key, chord);
  console.log(type);

  return (
    <div className="p-2">
      <h1 className="text-6xl font-bold mb-4">Chords</h1>
      <div className="md:flex md:items-center mb-6 justify-start">
        <div className="md:w-12 flex-none">
          <label
            htmlFor="keySelect"
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            Key
          </label>
        </div>
        <div className="md:w-2/3 flex-autp">
          <select
            name="keySelect"
            value={key}
            onChange={(e) => changeKey(e.target.value)}
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
            htmlFor="chordSelect"
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            Chord
          </label>
        </div>
        <div className="md:w-2/3">
          <select
            name="chordSelect"
            value={chord}
            onChange={(e) => changeChord(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          >
            <option value={undefined}></option>
            {chordFamilies.map((family) => {
              return (
                <optgroup label={family} key={family}>
                  {chords
                    .filter((chord) => chord.family === family)
                    .map((chord) => (
                      <option key={chord.name} value={chord.name}>
                        {chord.name}
                      </option>
                    ))}
                </optgroup>
              );
            })}
          </select>
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-12 flex-none">
          <label
            htmlFor="typeSelect"
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            Type
          </label>
        </div>
        <div className="md:w-2/3 flex-autp">
          <select
            name="typeSelect"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          >
            <option value={undefined}></option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {key && chord && (
        <div className="rounded border p-6 mt-8">
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Scale Degrees:
            </div>
            <div>{chords.find((c) => c.name === chord).pattern.join('-')}</div>
          </div>
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Notes:
            </div>
            <div>{chordTones.map((it) => it.note).join('-')}</div>
          </div>
        </div>
      )}

      <div>
        <Fretboard
          keyy={key}
          scale={undefined}
          chord={chord}
          chordType={type}
        />
      </div>
    </div>
  );
};

export default Chords;
