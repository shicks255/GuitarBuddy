import { useEffect, useState } from 'react';
import FretboardNew from '../components/FretboardNew';
import PageHeaderNew from '../components/PageHeaderNew';
import { chords, pattern } from '../utils/utils';

export interface ISelectedNotes {
  e: undefined | string;
  b: undefined | string;
  g: undefined | string;
  d: undefined | string;
  a: undefined | string;
  E: undefined | string;
}

interface x {
  chord: string;
  notes: string[];
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
  const [candidates, setCandidates] = useState<x[]>([]);

  const determineRoot = () => {
    if (selectedNotes.E) {
      return selectedNotes.E;
    }
    if (selectedNotes.a) {
      return selectedNotes.a;
    }
    if (selectedNotes.d) {
      return selectedNotes.d;
    }
    if (selectedNotes.g) {
      return selectedNotes.g;
    }
    if (selectedNotes.b) {
      return selectedNotes.b;
    }
    if (selectedNotes.e) {
      return selectedNotes.e;
    }
  };

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

  const isValid = () => {
    if (
      Object.values(selectedNotes).filter((e) => e !== undefined).length < 3
    ) {
      return false;
    }

    const selected = new Set<string>();
    Object.values(selectedNotes).forEach((not) => {
      if (not && not !== undefined) {
        selected.add(not);
      }
    });

    if (selected.size < 3) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (isValid()) {
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

      const cands: x[] = [];

      combinations.forEach((combo) => {
        if (Array.from(selected).every((n) => combo.notes.includes(n))) {
          cands.push(combo);
        }
      });

      let finals: x[] = [];

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

        if (finals.length > 0) {
          const root = determineRoot();
          finals = finals.sort((a: x, b: x) => {
            if (a.notes[0] === root) {
              return -1;
            }
            if (b.notes[0] === root) {
              return 1;
            }
            return 0;
          });
        }

        setCandidates(finals);
        console.log(finals);
      }
    } else {
      setCandidates([]);
    }
  }, [selectedNotes]);

  const computeOffBy = (selectedNotes: string[], match) => {
    return match.notes.filter((x) => !selectedNotes.includes(x)).length;
  };

  return (
    <div className="p-4">
      <PageHeaderNew headline="Chord Finder">
        If you have a cool position that you like to play on guitar, or just
        want to explore, select a combination of notes on the fretboard below to
        see what the closest chord is.
        <br />
        <br />
        Some fingerings can sometimes be ambiguous, so there may be multiple
        candidates for the chord.
      </PageHeaderNew>

      {candidates.length > 0 && (
        <div className="rounded border px-4 mt-4">
          This appears to be a{' '}
          <span className="font-bold mx-2 text-lg">{candidates[0].chord}</span>{' '}
          chord made up of {candidates[0].notes.join(' - ')}
          {candidates.length > 1 && (
            <div>
              Based on the selected notes, this could also be:
              <br />
              <div className="ml-4">
                {candidates.slice(1).map((x) => {
                  return (
                    <>
                      {' '}
                      <span className="font-semibold">{x.chord} </span>
                      made up of {x.notes.join(' - ')}
                      <br />
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {candidates.length < 1 && (
        <div className="italic px-4 mt-4">
          Please select 3 or more unique notes
        </div>
      )}

      <FretboardNew notes={selectedNotes} setSelectedNotes={setSelectedNotes} />
      <div className="mt-4">
        <button
          className="bg-orange-500 rounded-md hover:bg-orange-600"
          onClick={() => reset()}
        >
          Clear
        </button>
      </div>
      {Object.values(selectedNotes).some((e) => e) && (
        <div className="rounded border px-6 pt-6 pb-2 mt-8">
          <div className="flex flex-col">
            <div>e: {selectedNotes.e}</div>
            <div>b: {selectedNotes.b}</div>
            <div>g: {selectedNotes.g}</div>
            <div>d: {selectedNotes.d}</div>
            <div>a: {selectedNotes.a}</div>
            <div>E: {selectedNotes.E}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChordFinder;
