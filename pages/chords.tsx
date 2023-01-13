import { useState } from 'react';
import { chordTypes } from '../chordTypes';
import Fretboard from '../components/fretboard';
import { chordFamilies, chords, generateChord, pattern } from '../utils';

const Chords = () => {
  const [key, setKey] = useState('');
  const [chord, setChord] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);

  const types = chordTypes.filter((c) => c.name === chord).map((c) => c.type);

  const chordTones = generateChord(key, chord);
  console.log(chordTones);

  return (
    <div className="p-2">
      <h1 className="text-lg">Chords</h1>
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

      <label htmlFor="chordSelect">Chord</label>
      <select
        name="chordSelect"
        value={chord}
        onChange={(e) => setChord(e.target.value)}
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

      <br />

      <label htmlFor="typeSelect">Type</label>
      <select
        name="typeSelect"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value={undefined}></option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div>
        <Fretboard
          keyy={key}
          scale={undefined}
          chord={chord}
          chordType={type}
        />
      </div>

      {chordTones && <div>{chordTones.map((it) => it.note).join('-')}</div>}
    </div>
  );
};

export default Chords;
