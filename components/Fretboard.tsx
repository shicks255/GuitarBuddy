import { Dispatch, SetStateAction } from 'react';
import { generateChord, generateScaleTones } from '../utils/utils';
import String from './String';
import { useVisualContext } from './VisualContext';
import { woodColors } from '../utils/visualConstants';
import { ISelectedNotes } from '../types/SelectedNotes';
import { scaleDefinitions } from '../utils/scales';

interface IProps {
  keyy?: string;
  scale?: string;
  chord?: string;
  notes?: ISelectedNotes;
  setSelectedNotes?: Dispatch<SetStateAction<ISelectedNotes>>;
}

const Fretboard: React.FC<IProps> = (props: IProps) => {
  const { keyy, scale, chord, notes, setSelectedNotes } = props;
  const { state, dispatch } = useVisualContext();
  const scaleTones = scale
    ? generateScaleTones(
        keyy,
        scaleDefinitions.find((def) => def.name === scale)?.pattern
      )
    : [];
  const chordTones = chord ? generateChord(keyy, chord) : [];

  let tones = scaleTones;
  if (scaleTones.length === 0) {
    tones = chordTones;
  }

  const inlayNumberings = () => {
    return (
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
    );
  };

  return (
    <div className="mt-2">
      {/* <div className="mt-52 rotate-90 sm:rotate-0"> */}
      {inlayNumberings()}
      <div className={`${woodColors[state.fretboardWood]} rounded-lg`}>
        <div className="flex">
          <String
            string="e"
            tones={tones}
            selectedNotes={notes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
        <div className="flex">
          <String
            string="b"
            tones={tones}
            selectedNotes={notes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
        <div className="flex">
          <String
            string="g"
            tones={tones}
            selectedNotes={notes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
        <div className="flex">
          <String
            string="d"
            tones={tones}
            selectedNotes={notes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
        <div className="flex">
          <String
            string="a"
            tones={tones}
            selectedNotes={notes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
        <div className="flex">
          <String
            string="E"
            tones={tones}
            selectedNotes={notes}
            setSelectedNotes={setSelectedNotes}
          />
        </div>
      </div>
      {inlayNumberings()}
    </div>
  );
};

export default Fretboard;
