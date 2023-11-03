import Fretboard from '../../components/Fretboard';
import PageHeader from '../../components/PageHeader';
import { generateScaleTones } from '../../utils/utils';
import FretboardOptions from '../../components/FretboardOptions';
import { scaleDefinitions, scaleFamilies } from '../../utils/scales';
import { noteSequence } from '../../utils/musicConstants';
import { useRouter } from 'next/router';

const Scales: React.FC = () => {
  const router = useRouter();

  const slugs = router.query.slug;

  const key = slugs && slugs.length > 0 ? slugs[0] : '';
  const scale = slugs && slugs.length > 1 ? slugs[1] : '';

  const scaleDefinition = scaleDefinitions.find((def) => def.key === scale);
  const tones = generateScaleTones(key, scaleDefinition?.pattern);

  const setKey = (newKey: string) => {
    if (!newKey) {
      router.push('/Scales', null, {
        scroll: false,
      });
    }
    const s = scale ? `/${scale}` : '';
    router.push(`/Scales/${newKey}${s}`, null, { scroll: false });
  };

  const setScale = (newScale: string) => {
    if (!newScale || !key) {
      router.push('/Scales', null, { scroll: false });
    }
    const newPath = `/Scales/${key}/${newScale}`;
    router.push(newPath, null, { scroll: false });
  };

  const goToChord = (key: string, chord: string) => {
    let c = '';
    switch (chord) {
      case 'Maj':
        c = 'major';
        break;
      case 'min':
        c = 'minor';
        break;
      case 'dim':
        c = 'dim';
        break;
      case 'Aug':
        c = 'aug';
        break;
      case 'Maj7':
        c = 'major7';
        break;
      case 'min7':
        c = 'minor7';
        break;
      case 'Dom7':
        c = 'dom7';
        break;
      case 'min7♭5':
        c = 'minor7♭5';
        break;
      case 'minMaj7':
        c = 'minMaj7'; //add
        break;
      case 'Maj7♯5':
        c = 'major7♯5'; //add
        break;
      case 'diminished7':
        c = 'dim7';
        break;
    }
    router.push(`/Chords/${key}/${c}`);
  };

  return (
    <div className="p-4">
      <div>
        <PageHeader headline="Scales">
          <p>
            Scales are of critically importance in music theory, and serve as
            the basis for many other concepts
            <br />
            <br />
            Select a key and one of the scales below to see all the notes that
            make up that scale, as well as the diatonic chords in that scale and
            the scale pattern.
            <br />
            <br />
            The{' '}
            <a
              className="text-orange-600 font-bold"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Major_scale"
              rel="noreferrer"
            >
              Major Scale
            </a>{' '}
            has an uplifting and happy sound, and is probably the most important
            scale to learn.
            <br />
            <br />
            The{' '}
            <a
              className="text-orange-600 font-bold"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Minor_scale"
              rel="noreferrer"
            >
              Minor Scale
            </a>{' '}
            has a sader or more foreboding sound, and actually has 3 slightly
            different versions:
          </p>
          <ul className="list-disc ml-4 p-2">
            <li>
              <a
                className="text-orange-700 font-bold"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Minor_scale#Natural_minor_scale"
                rel="noreferrer"
              >
                Natural Minor
              </a>
            </li>
            <li>
              <a
                className="text-orange-700 font-bold"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Minor_scale#Harmonic_minor_scale"
                rel="noreferrer"
              >
                Harmonic Minor{' '}
              </a>
            </li>
            <li>
              <a
                className="text-orange-700 font-bold"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Minor_scale#Melodic_minor_scale"
                rel="noreferrer"
              >
                Melodic Minor
              </a>
            </li>
          </ul>
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
              htmlFor="scaleSelect"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Scale
            </label>
          </div>
          <div className="md:w-2/3 flex-auto">
            <select
              name="scaleSelect"
              disabled={!key}
              placeholder={!key ? 'Select a key' : ''}
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option value=""></option>
              <option value="major">Major</option>
              <option value="natural_minor">Natural Minor</option>
              <option value="melodic_minor">Melodic Minor</option>
              <option value="harmonic_minor">Harmonic Minor</option>
              <optgroup label="Major Modes">
                {scaleDefinitions
                  .filter((scale) => scale.modeFamily === 'Major')
                  .map((scale, i) => {
                    return (
                      <option key={scale.name} value={scale.key}>
                        {scale.modeNumber + ' ' + scale.name}
                      </option>
                    );
                  })}
              </optgroup>
              <optgroup label="Harmonic Minor Modes">
                {scaleDefinitions
                  .filter((scale) => scale.modeFamily === 'Harmonic Minor')
                  .map((scale) => {
                    return (
                      <option key={scale.name} value={scale.key}>
                        {scale.modeNumber + ' ' + scale.name}
                      </option>
                    );
                  })}
              </optgroup>
              <optgroup label="Melodic Minor Modes">
                {scaleDefinitions
                  .filter((scale) => scale.modeFamily === 'Melodic Minor')
                  .map((scale) => {
                    return (
                      <option key={scale.name} value={scale.key}>
                        {scale.modeNumber + ' ' + scale.name}
                      </option>
                    );
                  })}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <FretboardOptions
        showNeckWoodOptions
        showOpacitySlider
        showRootNoteHighlight
        showNoteDegreeOrNote
      />
      <Fretboard keyy={key} scale={scaleDefinition?.name} />
      {key && scale && (
        <div className="rounded border px-6 pt-6 pb-2 mt-8">
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-xl text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {key} {scaleDefinition?.name}
            </div>
          </div>
          {scaleDefinition?.otherNames && (
            <div className="md:flex md:items-center mb-6 justify-start">
              <div className="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Other Names: {scaleDefinition?.otherNames?.join(', ')}
              </div>
            </div>
          )}
          {scaleDefinition.details && (
            <div className="md:flex md:items-center mb-6 justify-start">
              <div className="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Other Notes: {scaleDefinition?.details.join(', ')}
              </div>
            </div>
          )}
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Scale Degrees:
            </div>
            <div>
              {scaleDefinition?.pattern
                .map((note) => {
                  if (note === 1) {
                    return 'h';
                  }
                  if (note === 3) {
                    return 'w1/2';
                  }
                  return 'w';
                })
                .join(' - ')}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Notes:
            </div>
            <div>{tones.map((tone) => tone.note).join(' - ')}</div>
          </div>
          <div className="md:flex md:items-center mb-6 justify-start">
            <div className="block text-gray-500 font-bold md:text-right md:mb-0 pr-4">
              Diatonic Chords:
            </div>
            <div>
              {tones.map((tone, index) => (
                <div
                  key={tone.note}
                  className={`mt-2 mb-2 ml-[${index * 10}px]`}
                >
                  <span>{scaleDefinition[index + 1]?.numeral}</span>
                  <span
                    key={tone.note}
                    className="mr-4 ml-4 text-blue-500"
                    onClick={() =>
                      goToChord(tone.note, scaleDefinition[index + 1]?.triad)
                    }
                  >
                    {tone.note} {scaleDefinition[index + 1]?.triad}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:flex md:items-center justify-start">
            <div className="block text-gray-500 font-bold md:text-right md:mb-0 pr-4">
              Extended Diatonic Chords:
            </div>
            <div>
              {tones.map((tone, index) => (
                <div
                  key={tone.note}
                  className={`mt-2 mb-2 ml-[${index * 10}px]`}
                >
                  <span>{scaleDefinition[index + 1]?.numeral}</span>
                  <span
                    key={tone.note}
                    className="mr-4 ml-4 text-blue-500"
                    onClick={() =>
                      goToChord(tone.note, scaleDefinition[index + 1]?.ext)
                    }
                  >
                    {tone.note} {scaleDefinition[index + 1]?.ext}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scales;
