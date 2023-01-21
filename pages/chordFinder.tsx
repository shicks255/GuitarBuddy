import { useEffect, useState } from 'react';
import Fretboard from '../components/fretboard';
import { chords, pattern } from '../utils';

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
    e: undefined,
    b: undefined,
    g: undefined,
    d: undefined,
    a: undefined,
    E: undefined,
  });
  const [candidates, setCandidates] = useState([]);

  const reset = () => {
    setSelectedNotes({
      e: undefined,
      b: undefined,
      g: undefined,
      d: undefined,
      a: undefined,
      E: undefined,
    });
  };

  useEffect(() => {
    if (
      Object.values(selectedNotes).filter((e) => e !== undefined).length > 2
    ) {
      const combinations = [];

      // iterate through each note
      pattern.forEach((note, indx) => {
        // iterate through each chord
        chords.forEach((chord) => {
          const chordNotes = [note];
          const { formula } = chord;

          let patternStart = pattern.findIndex((x) => x === note);
          formula.forEach((degree) => {
            patternStart += degree;
            if (patternStart > 11) {
              patternStart -= 12;
            }

            chordNotes.push(pattern[patternStart]);
          });

          combinations.push({
            chord: `${note}-${chord.name}`,
            notes: chordNotes,
          });
        });
      });

      const selected = new Set<string>();
      Object.values(selectedNotes).forEach((not) => {
        if (not && not !== undefined) {
          selected.add(not);
        }
      });

      const cands = [];
      combinations.forEach((combo) => {
        if (Array.from(selected).every((n) => combo.notes.includes(n))) {
          cands.push(combo);
        }
      });

      const finals = [];

      if (cands.length > 0) {
        let bestMatch = cands[0];

        cands.forEach((can, indx) => {
          const bestMatchOffBy = computeOffBy(Array.from(selected), bestMatch);
          const thisMatchOffBy = computeOffBy(Array.from(selected), can);
          if (thisMatchOffBy < bestMatchOffBy) {
            bestMatch = can;
            finals.splice(0, finals.length);
            finals.push(bestMatch);
          } else if (bestMatchOffBy === thisMatchOffBy) {
            console.log('uh oh we have a runOFF!');
            finals.push(can);
          }
        });
        console.log(finals);
        console.log(bestMatch);
        setCandidates([bestMatch]);
      }

      //   console.log(cands);
    } else {
      setCandidates([]);
    }
  }, [selectedNotes]);

  const computeOffBy = (selectedNotes: string[], match) => {
    return match.notes.filter((x) => !selectedNotes.includes(x)).length;
  };

  return (
    <div>
      This is the chord finder page.
      <div>{JSON.stringify(selectedNotes)}</div>
      <div>
        {candidates.map((c) => (
          <div key={c.chord}>{c.chord}</div>
        ))}
      </div>
      <div>
        <button onClick={() => reset()}>Clear</button>
      </div>
      <Fretboard notes={selectedNotes} setSelectedNotes={setSelectedNotes} />
    </div>
  );
};

export default ChordFinder;
