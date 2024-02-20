import { IScale } from '../types/Scale';

export const scaleFamilies = ['Major', 'Harmonic Minor', 'Melodic Minor'];

export const scaleDefinitions: IScale[] = [
  {
    name: 'Major',
    key: 'major',
    pattern: [2, 2, 1, 2, 2, 2],
    otherNames: ['Ionian'],
    1: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'I',
    },
    2: {
      triad: 'min',
      ext: 'min7',
      numeral: 'ii',
    },
    3: {
      triad: 'min',
      ext: 'min7',
      numeral: 'iii',
    },
    4: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'IV',
    },
    5: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'V',
    },
    6: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vi',
    },
    7: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
  },
  {
    name: 'Natural Minor',
    key: 'natural_minor',
    pattern: [2, 1, 2, 2, 1, 2],
    otherNames: ['Aeolian'],
    1: {
      triad: 'min',
      ext: 'min7',
      numeral: 'i',
    },
    2: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'ii°',
    },
    3: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'III',
    },
    4: {
      triad: 'min',
      ext: 'min7',
      numeral: 'iv',
    },
    5: {
      triad: 'min',
      ext: 'min7',
      numeral: 'v',
    },
    6: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'VI',
    },
    7: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'VII',
    },
  },
  {
    name: 'Melodic Minor',
    key: 'melodic_minor',
    pattern: [2, 1, 2, 2, 2, 2],
    otherNames: ['Jazz Minor Scale'],
    details: [
      'Clasically, this scale actually is different depending on if you are playing it ascending or descending.  When playing descending, a natural minor is used.  Most jazz players play it the same regardless of which direction.',
    ],
    1: {
      triad: 'min',
      ext: 'minMaj7',
      numeral: 'i',
    },
    2: {
      triad: 'min',
      ext: 'min7',
      numeral: 'ii',
    },
    3: {
      triad: 'Aug',
      ext: 'Maj7♯5',
      numeral: 'III+',
    },
    4: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'IV',
    },
    5: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'V',
    },
    6: {
      triad: 'Dim',
      ext: 'min7♭5',
      numeral: 'vi°',
    },
    7: {
      triad: 'Dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
  },
  {
    name: 'Harmonic Minor',
    key: 'harmonic_minor',
    pattern: [2, 1, 2, 2, 1, 3],
    1: {
      triad: 'min',
      ext: 'minMaj7',
      numeral: 'i',
    },
    2: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'ii°',
    },
    3: {
      triad: 'Aug',
      ext: 'Maj7♯5',
      numeral: 'III+',
    },
    4: {
      triad: 'min',
      ext: 'min7',
      numeral: 'iv',
    },
    5: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'V',
    },
    6: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'VI',
    },
    7: {
      triad: 'dim',
      ext: 'diminished7',
      numeral: 'vii°',
    },
  },
  {
    name: 'Dorian',
    key: 'dorian',
    modeFamily: 'Major',
    pattern: [2, 1, 2, 2, 2, 1],
    modeNumber: 2,
    1: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    2: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    3: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    4: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'vii°',
    },
    5: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    6: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
    7: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
  },
  {
    name: 'Phrygian',
    key: 'phrygian',
    modeFamily: 'Major',
    pattern: [1, 2, 2, 2, 1, 2],
    modeNumber: 3,
    1: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    2: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    3: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'vii°',
    },
    4: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    5: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
    6: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    7: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
  },
  {
    name: 'Lydian',
    key: 'lydian',
    modeFamily: 'Major',
    pattern: [2, 2, 2, 1, 2, 2],
    modeNumber: 4,
    1: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    2: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'vii°',
    },
    3: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    4: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
    5: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    6: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    7: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
  },
  {
    name: 'Mixolydian',
    key: 'mixolydian',
    pattern: [2, 2, 1, 2, 2, 1],
    modeFamily: 'Major',
    modeNumber: 5,
    1: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'vii°',
    },
    2: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    3: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
    4: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    5: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    6: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    7: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
  },
  {
    name: 'Locrian',
    key: 'locrian',
    modeFamily: 'Major',
    pattern: [1, 2, 2, 1, 2, 2],
    modeNumber: 7,
    1: {
      triad: 'dim',
      ext: 'min7♭5',
      numeral: 'vii°',
    },
    2: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    3: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    4: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
    5: {
      triad: 'Maj',
      ext: 'Maj7',
      numeral: 'vii°',
    },
    6: {
      triad: 'Maj',
      ext: 'Dom7',
      numeral: 'vii°',
    },
    7: {
      triad: 'min',
      ext: 'min7',
      numeral: 'vii°',
    },
  },
  {
    name: 'Locrian n6',
    key: 'locrian_n6',
    pattern: [1, 2, 2, 1, 3, 1],
    modeFamily: 'Harmonic Minor',
    modeNumber: 2,
  },
  {
    name: 'Ionian ♯5',
    key: 'ionian_♯5',
    pattern: [2, 2, 1, 3, 1, 2],
    modeFamily: 'Harmonic Minor',
    modeNumber: 3,
  },
  {
    name: 'Dorian ♯11',
    key: 'dorian_♯11',
    pattern: [2, 1, 3, 1, 2, 1],
    modeFamily: 'Harmonic Minor',
    modeNumber: 4,
  },
  {
    name: 'Phyrgian Dominant',
    key: 'phyrgian_dominant',
    pattern: [1, 3, 1, 2, 1, 2],
    modeFamily: 'Harmonic Minor',
    modeNumber: 5,
  },
  {
    name: 'Lydian ♯2',
    key: 'lydian_♯2',
    pattern: [3, 1, 2, 1, 2, 2],
    modeFamily: 'Harmonic Minor',
    modeNumber: 6,
  },
  {
    name: 'Super Locrian ♭♭7',
    key: 'super_locrian_♭♭7',
    pattern: [1, 2, 1, 2, 2, 1],
    modeFamily: 'Harmonic Minor',
    modeNumber: 7,
  },
  {
    name: 'Dorian ♭2',
    key: 'dorian_♭2',
    pattern: [1, 2, 2, 2, 2, 1],
    modeFamily: 'Melodic Minor',
    modeNumber: 2,
    otherNames: ['Phrygian ♯6'],
  },
  {
    name: 'Lydian Augmented',
    key: 'lydian_augmented',
    pattern: [2, 2, 2, 2, 1, 2],
    modeFamily: 'Melodic Minor',
    modeNumber: 3,
  },
  {
    name: 'Lydian Dominant',
    key: 'lydian_dominant',
    pattern: [2, 2, 2, 1, 2, 1],
    modeFamily: 'Melodic Minor',
    modeNumber: 4,
    otherNames: ['Overtone Scale'],
  },
  {
    name: 'Mixolydian ♭6',
    key: 'mixolydian_♭6',
    pattern: [2, 2, 1, 2, 1, 2, 2],
    modeFamily: 'Melodic Minor',
    modeNumber: 5,
  },
  {
    name: 'Aeolian ♭5',
    key: 'aeolian_♭5',
    pattern: [2, 1, 2, 1, 2, 2, 2],
    modeFamily: 'Melodic Minor',
    modeNumber: 6,
    otherNames: ['Locrian ♯2'],
  },
  {
    name: 'Altered Scale',
    key: 'altered_scale',
    pattern: [1, 2, 1, 2, 2, 2],
    modeFamily: 'Melodic Minor',
    modeNumber: 7,
    otherNames: ['Super Locrain'],
  },
];