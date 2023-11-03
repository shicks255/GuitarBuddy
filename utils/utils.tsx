import { chordShapes } from './chordShapes';
import { INote } from '../types/Note';
import { chords, degreeSequence, noteSequence } from './musicConstants';

// opacity-[0]
// opacity-[.10]
// opacity-[.20]
// opacity-[.30]
// opacity-[.40]
// opacity-[.50]
// opacity-[.60]
// opacity-[.70]
// opacity-[.80]
// opacity-[.90]

// ml-[0px]
// ml-[10px]
// ml-[20px]
// ml-[30px]
// ml-[40px]
// ml-[50px]
// ml-[60px]
// ml-[70px]

export function generateScaleTones(
  key: string,
  scalePattern?: number[]
): INote[] {
  if (!key || key.length === 0 || !scalePattern) {
    return [];
  }

  let patternStart = noteSequence.findIndex(
    (note) => note.toLowerCase() === key
  );
  let notes: INote[] = [
    {
      note: key,
      degree: '1',
      root: true,
    },
  ];

  scalePattern.forEach((deg, indx) => {
    let x = patternStart + deg;
    if (x > 11) {
      x = x - 12;
    }

    patternStart = x;

    notes.push({
      note: noteSequence[x],
      degree: indx + 2 + '',
      root: false,
    });
  });

  return notes;
}

export const generateChordShape = (index, key, chord, number): INote[] => {
  const t = chordShapes.find((c) => c.number === number && c.type === chord);

  if (t) {
    const degree = t.pattern[index];
    if (degree === 0) {
      return [];
    }
    let patternStart = noteSequence.findIndex((note) => note === key);

    let notes = [];
    let move = 1;
    while (notes.length === 0) {
      if (patternStart > 11) {
        patternStart = 0;
      }

      if (move === degree) {
        notes.push({
          note: noteSequence[patternStart],
          degree: degreeSequence[degree],
        });
      }

      patternStart += 1;
      move += 1;
    }

    return notes;
  }

  return [];
};

export function generateChord(key?: string, chord?: string): INote[] {
  const c = chords.find((x) => x.name === chord);

  let patternStart = noteSequence.findIndex((note) => note === key);
  const notes = [
    {
      note: key,
      degree: '1',
      root: true,
    },
  ];

  if (!c) {
    return [];
  }

  c.formula.forEach((i, indx) => {
    let x = patternStart + i;
    if (x > 11) {
      x = x - 12;
    }

    patternStart = x;

    notes.push({
      note: noteSequence[x],
      degree: c.pattern[indx + 1],
      root: false,
    });
  });

  return notes;
}
