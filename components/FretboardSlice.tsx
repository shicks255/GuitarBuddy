import {
  noteStyles,
  stringHeights,
  tagColors,
  woodColors,
} from '../utils/visualConstants';
import { generateChordShape } from '../utils/utils';
import { useVisualContext } from './VisualContext';
import { noteSequence } from '../utils/musicConstants';
import { IChordShape } from '../types/Chord';

interface IProps {
  keyy: string;
  chord: string;
  chordShape: IChordShape;
}

const FretNumbers = (lowestFret: number, highestFret: number) => {
  return (
    <>
      {lowestFret > 1 && <div className="w-6" />}
      {[...Array(highestFret + 1 - lowestFret)].map((f, index) => {
        const fret = lowestFret + index;
        if (
          fret === 1 ||
          fret === 3 ||
          fret === 5 ||
          fret === 7 ||
          fret === 9 ||
          fret === 12
        ) {
          return (
            <div key={fret} className="w-16 text-center font-semibold">
              {fret}
            </div>
          );
        }
        return (
          <>
            {((lowestFret === 0 && index > 0) || lowestFret > 0) && (
              <div key={fret} className="flex-initial w-16" />
            )}
          </>
        );
      })}
    </>
  );
};

const FretboardSlice: React.FC<IProps> = (props: IProps) => {
  const { keyy, chord, chordShape } = props;

  const { state } = useVisualContext();

  if (!keyy) {
    return null;
  }
  const chordInfo = chordShape;
  let lowestFret = 20;
  let highestFret = 0;
  let maxSpan = 0;

  let notesByString = [];
  const fretNumberss = [];

  for (let i = 0; i < 6; i++) {
    const stringNotes = generateChordShape(i, keyy, chord, chordShape.number);
    let string = 'e';
    switch (i) {
      case 0:
        string = 'e';
        break;
      case 1:
        string = 'b';
        break;
      case 2:
        string = 'g';
        break;
      case 3:
        string = 'd';
        break;
      case 4:
        string = 'a';
        break;
      case 5:
        string = 'E';
        break;
    }

    let patternStart = noteSequence.findIndex(
      (note) => note === string.toLowerCase()
    );

    let notes = [];

    while (notes.length < 12) {
      if (patternStart > 11) {
        patternStart = 0;
      }
      notes.push(noteSequence[patternStart]);
      patternStart += 1;
    }
    notesByString.push(notes);
    notes.forEach((v, i) => {
      if (stringNotes.length > 0 && v === stringNotes[0].note) {
        fretNumberss.push(i);
      }
    });
  }

  const sortingF = (a, b) => (a > b ? 1 : -1);

  const sorted = fretNumberss.sort(sortingF);
  lowestFret = sorted[0];
  highestFret = sorted[sorted.length - 1];

  maxSpan = highestFret - lowestFret;

  if (maxSpan > 4) {
    const remapped = sorted
      .map((fret, i) => {
        if (fret < 8) {
          return fret + 12;
        } else {
          return fret;
        }
      })
      .sort(sortingF);
    lowestFret = remapped[0];
    highestFret = remapped[remapped.length - 1];
    maxSpan = highestFret - lowestFret;
  }

  if (maxSpan === 0) {
    highestFret += 2;
  }
  if (maxSpan === 1) {
    highestFret += 1;
  }

  const tagWidth = 16 * highestFret - lowestFret;
  const tagAreaWidth = `w-${tagWidth}`;

  return (
    <div className="bg-slate-50 shadow-md shadow-red-200 p-2">
      <div className="text-center mb-4 text-xl">Shape {chordInfo.number}</div>
      <div className="flex justify-center">
        <div className={`flex flex-wrap mb-2 justify-center ${tagAreaWidth}`}>
          {chordInfo.tags?.map((t, i) => {
            const pillClass = tagColors[t];
            return (
              <span
                className={`rounded-full ${pillClass} m-1 px-2 py-1`}
                key={t}
              >
                {t}
              </span>
            );
          })}
          {chordInfo?.inversion > 0 && (
            <span
              className={`rounded-full ${
                tagColors[`Inversion ${chordInfo.inversion}`]
              } m-1 px-2 py-1`}
            >
              {chordInfo.inversion} inversion
            </span>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="w-8" />
        {FretNumbers(lowestFret, highestFret)}
      </div>
      <div className={`${woodColors[state.fretboardWood]} rounded-lg`}>
        {['e', 'b', 'g', 'd', 'a', 'E'].map((string, i) => {
          const s = generateChordShape(i, keyy, chord, chordShape.number);
          const temp = notesByString[i][0];
          const openString = s && s.length > 0 && temp === s[0].note;

          let stringStartClass = '';
          let stringStartCircleClass = '';
          if (openString) {
            if (string === keyy) {
              stringStartClass = noteStyles.rootNote;
              stringStartCircleClass = noteStyles.rootCircle;
            } else {
              stringStartClass = noteStyles.scaleNote;
              stringStartCircleClass = noteStyles.scaleCircle;
            }
          }

          return (
            <div key={string} className="flex">
              <div className="flex-initial w-5 relative text-center top-2 font-bold">
                <div className={stringStartClass}>
                  <div className={stringStartCircleClass}>
                    {openString &&
                      state.noteDegreeOrNote === 'Degree' &&
                      s[0].degree}
                    {openString && state.noteDegreeOrNote === 'Note' && string}
                    {!openString && string}
                  </div>
                </div>
              </div>
              <div //white bar
                className={`h-[40px] ml-2 w-4 bg-slate-50 ${
                  i === 0 ? 'border-t-2' : ''
                } ${i === 5 ? 'border-b-2' : ''}`}
              />
              {lowestFret >= 2 && (
                <>
                  <div className="flex-initial w-4 relative bg-orange-100" />
                </>
              )}
              {notesByString[i]
                .concat(notesByString[i])
                .slice(lowestFret, highestFret + 1)
                .map((no, ind) => {
                  const show = s.filter((a) => a.note === no);
                  const noteStyle =
                    no === keyy ? noteStyles.rootNote : noteStyles.scaleNote;

                  const circleStyle =
                    no === keyy
                      ? noteStyles.rootCircle
                      : noteStyles.scaleCircle;

                  if (lowestFret === 0 && ind === 0) {
                    return null;
                  }

                  let width = 'w-16';
                  if (lowestFret === 0 && ind === 1) {
                    width = 'w-14';
                  }

                  return (
                    <div
                      key={no}
                      className={`flex-initial ${width} relative text-center rounded font-bold`}
                    >
                      <div
                        className={`${stringHeights[string]} w-full bg-slate-400 top-5 absolute`}
                      />
                      <div
                        className={`top-2 h-6 w-full absolute z-50 ${noteStyle}`}
                      >
                        {show.length > 0 && (
                          <div className={circleStyle}>
                            <span>
                              {state.noteDegreeOrNote === 'Degree'
                                ? show[0].degree
                                : no}
                            </span>
                          </div>
                        )}
                      </div>
                      {lowestFret > 1 && (
                        <div id={ind} className="h-[40px] w-1 bg-slate-500" />
                      )}
                      {lowestFret === 0 && ind > 1 && (
                        <div id={ind} className="h-[40px] w-1 bg-slate-500" />
                      )}
                      {lowestFret === 1 && ind > 0 && (
                        <div id={ind} className="h-[40px] w-1 bg-slate-500" />
                      )}
                    </div>
                  );
                })}
              {<div className="h-[40px] w-1 bg-slate-500" />}
            </div>
          );
        })}
      </div>
      <div className="flex">
        <div className="w-8" />
        {FretNumbers(lowestFret, highestFret)}
      </div>
    </div>
  );
};

export default FretboardSlice;
