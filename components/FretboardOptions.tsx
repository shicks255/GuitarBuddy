import React from 'react';
import { useVisualContext } from './VisualContext';

interface IProps {
  showNeckWoodOptions?: boolean;
  showOpacitySlider?: boolean;
  showRootNoteHighlight?: boolean;
  showNoteDegreeOrNote?: boolean;
}

const FretboardOptions: React.FC<IProps> = (props: IProps) => {
  const {
    showNeckWoodOptions,
    showOpacitySlider,
    showRootNoteHighlight,
    showNoteDegreeOrNote,
  } = props;
  const { state, dispatch } = useVisualContext();
  return (
    <>
      <div className="m-4 font-bold text-xl">Options</div>
      <div className="flex flex-wrap flex-col md:flex-row md:place-content-evenly gap-2">
        {showNeckWoodOptions && (
          <>
            <div className="form-check md:h-16">
              <label
                htmlFor="maple"
                className="form-check-label
                inline-block
                text-gray-800"
              >
                Maple
              </label>
              <input
                type="radio"
                name="wood"
                id="maple"
                value="maple"
                checked={state.fretboardWood === 'Maple'}
                onChange={() => {
                  dispatch({
                    type: 'toggleFretboardWoodChange',
                    payload: 'Maple',
                  });
                }}
                className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <br />
              <label
                htmlFor="rosewood"
                className="form-check-label
                inline-block
                text-gray-800"
              >
                Rosewood
              </label>
              <input
                type="radio"
                name="wood"
                id="rosewood"
                value="rosewood"
                checked={state.fretboardWood === 'Rosewood'}
                onChange={() =>
                  dispatch({
                    type: 'toggleFretboardWoodChange',
                    payload: 'Rosewood',
                  })
                }
                className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
            </div>
            <div className="border-b-2 md:border-r-2 md:h-16" />
          </>
        )}
        {showOpacitySlider && (
          <>
            <div className="md:h-16">
              <label htmlFor="opacity" className="mr-4">
                Faded note opacity
              </label>
              <br />
              <input
                type="range"
                min={0}
                max={60}
                step={10}
                value={state.fadedNoteOpacity}
                list="volumes"
                name="opacity"
                id="opacity"
                onChange={(e) =>
                  dispatch({
                    type: 'changeFadedNoteOpacity',
                    payload: Number(e.target.value),
                  })
                }
                onChangeCapture={(e) => dispatch}
              />
            </div>
            <div className="border-b-2 md:border-r-2 md:h-16" />
          </>
        )}
        {showRootNoteHighlight && (
          <>
            <div className="md:h-16">
              <label htmlFor="rootNoteHighlight">Highlight root notes</label>
              <input
                name="rootNoteHighlight"
                id="rootNoteHighlight"
                type="checkbox"
                checked={state.highlightRootNotes}
                onChange={(e) => {
                  dispatch({
                    type: 'changeShowRootNotes',
                    payload: e.target.checked,
                  });
                }}
                className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
            </div>
            <div className="border-b-2 md:border-r-2 md:h-16" />
          </>
        )}
        {showNoteDegreeOrNote && (
          <div className="h-16">
            <label htmlFor="noteDegree">Show Note Degrees</label>
            <input
              type="radio"
              name="noteDegree"
              id="noteDegree"
              value="noteDegree"
              checked={state.noteDegreeOrNote === 'Degree'}
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              onChange={() => {
                dispatch({
                  type: 'changeShowDegreeOrNote',
                  payload: 'Degree',
                });
              }}
            />
            <br />
            <label htmlFor="note">Show Notes Letters</label>
            <input
              type="radio"
              name="note"
              id="note"
              value="note"
              checked={state.noteDegreeOrNote === 'Note'}
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              onChange={() => {
                dispatch({
                  type: 'changeShowDegreeOrNote',
                  payload: 'Note',
                });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FretboardOptions;
