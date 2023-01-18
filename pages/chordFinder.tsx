import { useState } from 'react';
import Fretboard from '../components/fretboard';

export interface ISelectedNotes {
  e: undefined | string;
  b: undefined | string;
  g: undefined | string;
  d: undefined | string;
  a: undefined | string;
  E: undefined | string;
}

const ChordFinder = () => {
  const [selectedNotes, setSelectedNotes] = useState<ISelectedNotes>({
    e: 'a#',
    b: undefined,
    g: undefined,
    d: undefined,
    a: 'd',
    E: 'c',
  });

  return (
    <div>
      This is the chord finder page.
      <div>{JSON.stringify(selectedNotes)}</div>
      <Fretboard notes={selectedNotes} setSelectedNotes={setSelectedNotes} />
    </div>
  );
};

export default ChordFinder;
