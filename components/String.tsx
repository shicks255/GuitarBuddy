import React, { Dispatch, SetStateAction } from 'react';
import { INote } from '../types/Note';
import { useVisualContext } from './VisualContext';
import { dotColors, noteStyles, stringHeights } from '../utils/visualConstants';
import { noteSequence } from '../utils/musicConstants';
import { ISelectedNotes } from '../types/SelectedNotes';

interface IProps {
  string: string;
  tones?: INote[];
  opacity?: number;
  selectedNotes?: ISelectedNotes;
  setSelectedNotes?: Dispatch<SetStateAction<ISelectedNotes>>;
}

const String: React.FC<IProps> = ({
  string,
  tones,
  selectedNotes,
  setSelectedNotes,
}: IProps) => {
  const { state } = useVisualContext();

  let noteStart = noteSequence.findIndex(
    (note) => note === string.toLowerCase()
  );

  let notes = [];
  const selectedNote = selectedNotes && selectedNotes[string];

  while (notes.length < 13) {
    if (noteStart > 11) {
      noteStart = 0;
    }

    notes.push(noteSequence[noteStart]);
    noteStart += 1;
  }

  return (
    <>
      {notes.map((note, indx) => {
        let notee = note;
        let noteStyle = '';
        let circleStyle = noteStyles.plainCircle;

        if (
          tones &&
          tones.length &&
          tones.findIndex((tone) => tone.note === note.toLowerCase()) >= 0
        ) {
          circleStyle = noteStyles.scaleCircle;
          notee = tones.find((tone) => tone.note === note.toLowerCase());
        }

        if (selectedNote === note) {
          noteStyle = noteStyles.rootNote;
          circleStyle = noteStyles.scaleCircle;
        }

        if (
          (tones &&
            tones.length > 0 &&
            tones.findIndex((tone) => tone.note === note.toLowerCase()) < 0 &&
            indx > 0) ||
          tones.length === 0
        ) {
          if (state.fadedNoteOpacity) {
            circleStyle += ` opacity-[.${state.fadedNoteOpacity}]`;
          } else if (state.fadedNoteOpacity === 0) {
            circleStyle += ' opacity-[0]';
          } else {
            circleStyle += ' opacity-30';
          }
        } else {
          circleStyle += ' opacity-90';
        }

        if (
          (tones.findIndex((tone) => tone.note === note) >= 0 &&
            tones.find((tone) => tone.note === note).root) ||
          selectedNote === note
        ) {
          noteStyle = noteStyles.rootNote;
          if (state.highlightRootNotes) {
            circleStyle = noteStyles.rootCircle;
          }
        }

        const showFretDot =
          indx === 3 || indx === 5 || indx === 7 || indx === 9 || indx === 12;

        const updateSelectedNotes = () => {
          if (selectedNote === note) {
            setSelectedNotes({ ...selectedNotes, [string]: undefined });
          } else {
            setSelectedNotes({ ...selectedNotes, [string]: notee });
          }
        };

        return (
          <div
            key={string + note + indx}
            className={`flex-1 relative text-center rounded font-bold`}
          >
            {indx > 0 ? (
              <div
                className={`${stringHeights[string]} w-full bg-slate-400 top-5 absolute`}
              />
            ) : (
              ''
            )}
            <div className={`top-2 h-6 w-full absolute z-50 ${noteStyle}`}>
              <div
                className={`${circleStyle}`}
                onClick={() => updateSelectedNotes()}
              >
                {notee.degree
                  ? state.noteDegreeOrNote === 'Degree'
                    ? notee.degree
                    : notee.note
                  : note}
              </div>
            </div>
            {indx > 1 ? <div className="h-[40px] w-1 bg-slate-500" /> : ''}
            {indx === 1 && (
              <div //white bar
                className={`h-[40px] -ml-4 w-4 bg-slate-50`}
              />
            )}
            {showFretDot && string === 'g' && (
              <div
                className={`h-1 w-2 ${
                  dotColors[state.fretboardWood]
                } inset-x-1/2 bottom-0 rounded-tl-full rounded-tr-full m-auto absolute`}
              />
            )}
            {showFretDot && string === 'd' && (
              <div
                className={`h-1 w-2 ${
                  dotColors[state.fretboardWood]
                } inset-x-1/2 top-0  rounded-bl-full rounded-br-full m-auto absolute`}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default String;
