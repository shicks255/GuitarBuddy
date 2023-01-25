import { Dispatch, SetStateAction, useState } from 'react';
import { ISelectedNotes } from '../pages/chordFinder';
import {
  genChord,
  generateChord,
  generateScaleTones,
  generateString,
} from '../utils';

interface IProps {
  keyy?: string;
  scale?: string;
  chord?: string;
  chordType?: string;
  notes?: ISelectedNotes;
  setSelectedNotes?: Dispatch<SetStateAction<ISelectedNotes>>;
}

const FretboardNew: React.FC<IProps> = (props: IProps) => {
  const { keyy, scale, chord, chordType, notes, setSelectedNotes } = props;

  const [neckWood, setNeckWood] = useState('maple');
  const [nonNoteOpacity, setNonNoteOpacity] = useState(30);

  const neckStyle = neckWood === 'rosewood' ? 'bg-yellow-900' : 'bg-yellow-50';
  const scaleTones = scale ? generateScaleTones(keyy, scale) : [];
  const chordTones = chord ? generateChord(keyy, chord) : [];

  let tones = scaleTones;
  if (scaleTones.length === 0) {
    tones = chordTones;
  }

  return (
    <div className="mt-2">
      <div className="flex">
        <div className="flex-1 w-4 text-center"></div>
        <div className="flex-1 text-center font-semibold">1</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">3</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">5</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">7</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">9</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">12</div>
      </div>
      <div className={`${neckStyle} rounded-lg`}>
        <div className="flex">
          {generateString(
            'e',
            true,
            chordType ? genChord(0, keyy, chord, chordType) : tones,
            neckWood === 'rosewood',
            nonNoteOpacity,
            notes,
            setSelectedNotes
          )}
        </div>
        <div className="flex">
          {generateString(
            'b',
            false,
            chordType ? genChord(1, keyy, chord, chordType) : tones,
            neckWood === 'rosewood',
            nonNoteOpacity,
            notes,
            setSelectedNotes
          )}
        </div>
        <div className="flex">
          {generateString(
            'g',
            false,
            chordType ? genChord(2, keyy, chord, chordType) : tones,
            neckWood === 'rosewood',
            nonNoteOpacity,
            notes,
            setSelectedNotes
          )}
        </div>
        <div className="flex">
          {generateString(
            'd',
            false,
            chordType ? genChord(3, keyy, chord, chordType) : tones,
            neckWood === 'rosewood',
            nonNoteOpacity,
            notes,
            setSelectedNotes
          )}
        </div>
        <div className="flex">
          {generateString(
            'a',
            false,
            chordType ? genChord(4, keyy, chord, chordType) : tones,
            neckWood === 'rosewood',
            nonNoteOpacity,
            notes,
            setSelectedNotes
          )}
        </div>
        <div className="flex">
          {generateString(
            'E',
            false,
            chordType ? genChord(5, keyy, chord, chordType) : tones,
            neckWood === 'rosewood',
            nonNoteOpacity,
            notes,
            setSelectedNotes
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 w-4 text-center"></div>
        <div className="flex-1 text-center font-semibold">1</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">3</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">5</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">7</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">9</div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center font-semibold">12</div>
      </div>
      <div className="flex justify-start gap-8">
        <form className="form-check">
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
            checked={neckWood === 'maple'}
            onChange={() => {
              setNeckWood('maple');
            }}
            className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <div>
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
              checked={neckWood === 'rosewood'}
              onChange={() => setNeckWood('rosewood')}
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
          </div>
        </form>
        <div className="">
          <label htmlFor="opacity" className="mr-4">
            Faded note opacity
          </label>
          <br />
          <input
            type="range"
            min={0}
            max={60}
            step={10}
            value={nonNoteOpacity}
            list="volumes"
            name="opacity"
            id="opacity"
            onChange={(e) => setNonNoteOpacity(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default FretboardNew;
