import { IChord } from '../types/Chord';

export const noteSequence = [
  'e',
  'f',
  'f♯',
  'g',
  'g♯',
  'a',
  'a♯',
  'b',
  'c',
  'c♯',
  'd',
  'd♯',
];

export const degreeSequence = {
  1: '1',
  2: 'b2',
  3: '2',
  4: 'b3',
  5: '3',
  6: '4',
  7: 'b5',
  8: '5',
  9: '#5',
  10: '6',
  11: 'b7',
  12: '7',
  13: '1',
  14: '1',
  15: '9',
};

export const chords: IChord[] = [
  {
    name: 'major',
    pattern: ['1', '3', '5'],
    formula: [4, 3],
    family: 'Major',
  },
  {
    name: 'major6',
    pattern: ['1', '3', '5', '6'],
    formula: [4, 3, 2],
    family: 'Major',
    notes: ['Same notes as the relative minor 7th chord.'],
  },
  {
    name: 'major6_9',
    pattern: ['1', '3', '5', '6', '9'],
    formula: [4, 3, 2, 5],
    family: 'Major',
  },
  {
    name: 'major7',
    pattern: ['1', '3', '5', '7'],
    formula: [4, 3, 4],
    family: 'Major',
  },
  {
    name: 'major9',
    pattern: ['1', '3', '5', '7', '9'],
    formula: [4, 3, 4, 3],
    family: 'Major',
  },
  {
    name: 'major11',
    pattern: ['1', '3', '5', '7', '9', '11'],
    formula: [4, 3, 4, 3, 3],
    family: 'Major',
  },
  {
    name: 'minor',
    pattern: ['1', '♭3', '5'],
    formula: [3, 4],
    family: 'Minor',
  },
  {
    name: 'minor6',
    pattern: ['1', '♭3', '5', '6'],
    formula: [3, 4, 2],
    family: 'Minor',
  },
  {
    name: 'minor7',
    pattern: ['1', '♭3', '5', '♭7'],
    formula: [3, 4, 3],
    family: 'Minor',
    notes: ['Same notes as the relative major 6th chord.'],
  },
  {
    name: 'minor7♭5',
    pattern: ['1', '♭3', '♭5', '♭7'],
    formula: [3, 3, 4],
    family: 'Minor',
    notes: [
      'This chord is fully symettrical, meaning each note is separated by a stacked minor 3rd and each inversion is the same shape.',
    ],
  },
  {
    name: 'minor9',
    pattern: ['1', '♭3', '5', '♭7', '9'],
    formula: [3, 4, 3, 4],
    family: 'Minor',
  },
  {
    name: 'minor11',
    pattern: ['1', '♭3', '5', '♭7', '9', '11'],
    formula: [3, 4, 3, 4, 3],
    family: 'Minor',
  },
  {
    name: 'dom7',
    pattern: ['1', '3', '5', '♭7'],
    formula: [4, 3, 3],
    family: 'Dominant',
  },
  {
    name: 'dom7♭5',
    pattern: ['1', '3', '♭5', '7'],
    formula: [4, 2, 4],
    family: 'Dominant',
  },
  {
    name: 'dom9',
    pattern: ['1', '3', '5', '♭7', '9'],
    formula: [4, 3, 3, 4],
    family: 'Dominant',
  },
  {
    name: 'dom11',
    pattern: ['1', '3', '5', '♭7', '9', '11'],
    formula: [4, 3, 3, 4, 3],
    family: 'Dominant',
  },
  {
    name: 'dim',
    pattern: ['1', '♭3', '♭5'],
    formula: [3, 3],
    family: 'Diminished',
  },
  {
    name: 'dim7',
    pattern: ['1', '♭3', '♭5', '♭♭7'],
    formula: [3, 3, 3],
    family: 'Diminished',
  },
  {
    name: 'aug',
    pattern: ['1', '3', '#5'],
    formula: [4, 4],
    family: 'Augmented',
  },
  {
    name: 'aug7',
    pattern: ['1', '3', '#5', '♭7'],
    formula: [4, 4, 2],
    family: 'Augmented',
  },
  {
    name: 'sus2',
    pattern: ['1', '2', '5'],
    formula: [2, 5],
    family: 'Suspended',
  },
  {
    name: 'sus4',
    pattern: ['1', '4', '5'],
    formula: [5, 2],
    family: 'Suspended',
  },
  {
    name: '7sus4',
    pattern: ['1', '4', '5', '♭7'],
    formula: [5, 2, 3],
    family: 'Suspended',
  },
  {
    name: 'add9',
    pattern: ['1', '3', '5', '9'],
    formula: [4, 3, 7],
    family: 'Other',
  },
  {
    name: 'add11',
    pattern: ['1', '3', '5', '11'],
    formula: [4, 3, 10],
    family: 'Other',
  },
];

export const chordFamilies = [
  'Major',
  'Minor',
  'Dominant',
  'Augmented',
  'Diminished',
  'Suspended',
  'Other',
];

// export const majorScale = [2, 2, 1, 2, 2, 2];
// export const naturalMinorScale = [2, 1, 2, 2, 1, 2];
// export const harmonicMinorScale = [2, 1, 2, 2, 3];
// export const melodicMinorScale = [2, 1, 2, 2, 2, 2];

// export const dorian = [2, 1, 2, 2, 2, 1];
// export const phrygian = [1, 2, 2, 2, 1, 2];
// export const lydian = [2, 2, 2, 1, 2, 2];
// export const mixolydian = [2, 2, 1, 2, 2, 1];
// export const locrian = [1, 2, 2, 1, 2, 2];
