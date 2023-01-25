import { useState } from 'react';
import { chordTypes } from '../chordTypes';
import Fretboard from '../components/Fretboard';
import PageHeader from '../components/PageHeader';
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

  return (
    <div className="p-4">
      <PageHeader headline="Chords">
        <p>
          Chords are made up of usually 3 or more notes stacked. The degrees
          between the notes determine what the chord is.
          <br />
          <br />
          Select a key and a chord below to see all the notes that are included
          in that chord. There are many ways to play different chords, and many
          player&apos;s take some creative liberties in how they play chords,
          sometimes due to hand dexterity or in an attempt to produce a
          different and unique sound.
          <br />
          <br />
          Select one of the types for a commonly used position for the chord.
        </p>
      </PageHeader>
      <div className="md:flex md:items-center mb-6 mt-6 justify-start">
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

      <div>
        <Fretboard
          keyy={key}
          scale={undefined}
          chord={chord}
          chordType={type}
        />
      </div>

      {key && chord && (
        <div className="rounded border px-6 pt-6 pb-2 mt-8">
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-xl text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {key} {chord}
            </div>
            <div></div>
          </div>
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
    </div>
  );
};

export default Chords;
