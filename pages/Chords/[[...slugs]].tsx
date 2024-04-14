import { chordShapes } from '../../utils/chordShapes';
import Fretboard from '../../components/Fretboard';
import PageHeader from '../../components/PageHeader';
import { generateChord } from '../../utils/utils';
import FretboardSlice from '../../components/FretboardSlice';
import FretboardOptions from '../../components/FretboardOptions';
import {
  chordFamilies,
  chords,
  noteSequence,
} from '../../utils/musicConstants';
import { useRouter } from 'next/router';

const Chords = () => {
  const router = useRouter();

  const slugs = router.query.slugs;

  const key = slugs && slugs.length > 0 ? slugs[0] : '';
  const chord = slugs && slugs.length > 1 ? slugs[1] : '';

  const setKey = (newKey: string) => {
    if (!newKey) {
      router.push('/chords', null, { scroll: false });
    }
    const c = chord ? `/${chord}` : '';
    router.push(`/chords/${newKey}${c}`, null, { scroll: false });
  };

  const setChord = (newChord: string) => {
    if (!newChord || !key) {
      router.push('/chords', null, { scroll: false });
    }
    const newPath = `/chords/${key}/${newChord}`;
    router.push(newPath, null, { scroll: false });
  };

  const shapes = chordShapes.filter((c) => c.type === chord);
  const chordTones = generateChord(key, chord);

  return (
    <div className="p-4">
      <PageHeader headline="Chords">
        <p>
          Chords are made up of usually 3 or more notes stacked. The degrees
          between the notes determine what the chord is.
          <br />
          <br />
          Select a key and a chord below to see all the notes that are included
          in that chord. There are many ways to play different chords, and many
          player&apos;s take some creative liberties in how they play chords,
          sometimes due to hand dexterity or in an attempt to produce a
          different and unique sound.
          <br />
          <br />
          Select one of the types for a commonly used position for the chord.
        </p>
      </PageHeader>
      <div className="md:flex gap-2 md:items-center mb-6 mt-6 justify-start">
        <div className="md:w-12 flex-none">
          <label
            htmlFor="keySelect"
            className="block 
            text-gray-500 
            font-bold 
            md:text-right 
            mb-1 
            md:mb-0 
            pr-4"
          >
            Key
          </label>
        </div>
        <div className="md:w-2/3 flex-auto">
          <select
            name="keySelect"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-gray-200 
            appearance-none 
            border-2 
            border-gray-200 
            rounded 
            w-full 
            py-2 
            px-4 
            text-gray-700 
            leading-tight 
            focus:outline-none 
            focus:bg-white 
            focus:border-purple-500"
          >
            <option value=""></option>
            {noteSequence.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="md:flex gap-2 md:items-center mb-6 justify-start">
        <div className="md:w-12 flex-none">
          <label
            htmlFor="chordSelect"
            className="mr-2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            Chord
          </label>
        </div>
        <div className="md:w-2/3 flex-auto">
          <select
            name="chordSelect"
            value={chord}
            onChange={(e) => setChord(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
        </div>
      </div>

      {key && chord && (
        <>
          <div className="rounded border px-6 pt-6 pb-2 mt-8">
            <div className="md:flex md:items-center mb-6 justify-start">
              <div className="block text-xl text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4">
                {key} {chord}
              </div>
              <div></div>
            </div>

            <div className="sm:flex">
              <div className="md:items-center mr-6 mb-6 justify-start">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Scale Degrees
                </div>
                <div>
                  {chords.find((c) => c.name === chord).pattern.join('-')}
                </div>
              </div>
              <div className="md:items-center mb-6 justify-start">
                <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Notes
                </div>
                <div>{chordTones.map((it) => it.note).join('-')}</div>
              </div>
            </div>
          </div>
          <div>
            <FretboardOptions
              showNeckWoodOptions
              showOpacitySlider
              showRootNoteHighlight
              showNoteDegreeOrNote
            />
          </div>
          <div>
            <div className="m-4 font-bold text-xl">Chord Tones</div>
            <Fretboard keyy={key} scale={undefined} chord={chord} />
          </div>
          <div>
            <div className="m-4 font-bold text-xl">Chord Shapes</div>
            <div className="flex flex-wrap justify-center">
              {shapes.map((shape) => (
                <div
                  key={shape.number}
                  className="flex-initial rounded-md mx-4 border-2 m-2"
                >
                  <FretboardSlice keyy={key} chord={chord} chordShape={shape} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chords;
