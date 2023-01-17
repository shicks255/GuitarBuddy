export const chordTypes = [
  {
    name: 'major',
    type: 'barre1',
    pattern: [1, 8, 5, 1, 8, 1],
  },
  {
    name: 'major',
    type: 'barre2',
    pattern: [8, 5, 1, 8, 1, 0],
  },
  {
    name: 'major',
    type: 'd position',
    pattern: [5, 1, 8, 0, 0, 0],
  },
  {
    name: 'major',
    type: 'reggae',
    pattern: [0, 8, 5, 1, 0, 0],
  },
  {
    name: 'major6',
    type: 'barre2',
    pattern: [10, 5, 1, 8, 0, 0],
  },
  {
    name: 'major6',
    type: 'barre3',
    pattern: [0, 0, 10, 5, 1, 8],
  },
  {
    name: 'major6',
    type: 'e',
    pattern: [1, 8, 5, 10, 0, 0],
  },
  {
    name: 'major6',
    type: 'w',
    pattern: [0, 0, 8, 1, 10, 5],
  },
  {
    name: 'major6',
    type: 'ww',
    pattern: [0, 10, 5, 1, 8, 0],
  },
  {
    name: 'major6',
    type: 'barre1',
    pattern: [5, 1, 8, 5, 10, 0],
  },
  {
    name: 'major6/9',
    type: 'tt',
    pattern: [1, 8, 15, 10, 5, 1],
  },
  {
    name: 'major6/9',
    type: '1',
    pattern: [8, 15, 10, 5, 1, 0],
  },
  {
    name: 'major7',
    type: 'open',
    pattern: [12, 8, 5, 1, 0, 0],
  },
  {
    name: 'major7',
    type: 'barre1',
    pattern: [1, 8, 5, 12, 8, 1],
  },
  {
    name: 'major7',
    type: 'barre2',
    pattern: [5, 12, 8, 1, 8, 0],
  },
  {
    name: 'major7',
    type: 'barre3',
    pattern: [8, 5, 12, 8, 1, 0],
  },
  {
    name: 'major7',
    type: 'barre4',
    pattern: [5, 12, 8, 1, 0, 0],
  },
  {
    name: 'major9',
    type: '1',
    pattern: [0, 15, 12, 5, 1, 0],
    extra: 'no 5th',
  },
  {
    name: 'major9',
    type: '2',
    pattern: [12, 8, 15, 1, 0, 0],
    extra: 'no 3rd',
  },
  {
    name: 'minor',
    type: 'barre1',
    pattern: [1, 8, 4, 1, 8, 1],
  },
  {
    name: 'minor',
    type: 'barre2',
    pattern: [8, 4, 1, 8, 1, 0],
  },
  {
    name: 'minor6',
    type: '1',
    pattern: [0, 1, 10, 4, 1, 0],
    extra: 'no 5th',
  },
  {
    name: 'minor7',
    type: '1',
    pattern: [4, 11, 8, 1, 0, 0],
  },
  {
    name: 'minor7',
    type: 'barre1',
    pattern: [8, 4, 11, 8, 1, 0],
  },
  {
    name: 'minor7',
    type: 'barre2',
    pattern: [1, 8, 4, 11, 8, 1],
  },
  {
    name: 'minor9',
    type: '1',
    pattern: [15, 8, 4, 11, 8, 1],
  },
  {
    name: 'minor9',
    type: '2',
    pattern: [0, 15, 11, 4, 1, 0],
    extra: 'no 5th',
  },
  {
    name: 'minor11',
    type: '1',
    pattern: [8, 4, 11, 6, 1, 0],
  },
  {
    name: 'dom7',
    type: '1',
    pattern: [5, 11, 8, 0, 0, 0],
    extra: 'no 1st',
  },
  {
    name: 'dom7',
    type: '2',
    pattern: [0, 0, 11, 5, 1, 0],
    extra: 'no 5th',
  },
  {
    name: 'dom7',
    type: '3',
    pattern: [1, 8, 5, 11, 8, 1],
  },
  {
    name: 'dom7b5',
    type: '1',
    pattern: [0, 0, 5, 11, 7, 1],
  },
  {
    name: 'dom7b5',
    type: '2',
    pattern: [0, 5, 11, 7, 1, 0],
  },
  {
    name: 'dom9',
    type: '1',
    pattern: [0, 8, 15, 11, 5, 0],
    extra: 'no 1st',
  },
  {
    name: 'dom9',
    type: '2',
    pattern: [8, 15, 11, 5, 1, 0],
  },
  {
    name: 'dom9',
    type: '3',
    pattern: [15, 8, 5, 11, 8, 1],
  },
  {
    name: 'dom11',
    type: '1',
    pattern: [8, 15, 11, 6, 1, 0],
    extra: 'no 3rd',
  },
  {
    name: 'aug',
    type: '1',
    pattern: [0, 0, 0, 9, 5, 1],
  },
  {
    name: 'aug',
    type: '2',
    pattern: [0, 0, 5, 1, 9, 0],
  },
  {
    name: 'aug',
    type: '3',
    pattern: [0, 9, 5, 1, 9, 0],
  },
  {
    name: 'aug',
    type: '4',
    pattern: [1, 9, 5, 1, 0, 0],
  },
  {
    name: 'aug7',
    type: '1',
    pattern: [0, 1, 9, 5, 11, 0],
  },
  {
    name: 'sus2',
    type: '1',
    pattern: [0, 0, 8, 3, 1, 0],
  },
  {
    name: 'sus2',
    type: '2',
    pattern: [0, 3, 1, 8, 1, 0],
  },
  {
    name: 'sus4',
    type: 'barre1',
    pattern: [1, 8, 6, 1, 6, 1],
  },
  {
    name: 'sus4',
    type: 'barre2',
    pattern: [8, 6, 1, 8, 1, 0],
  },
  {
    name: '7sus4',
    type: '1',
    pattern: [0, 1, 11, 6, 1, 0],
    extra: 'no 5th',
  },
  {
    name: '7sus4',
    type: 'barre1',
    pattern: [1, 8, 6, 11, 8, 1],
  },
  {
    name: 'add9',
    type: '1',
    pattern: [15, 8, 5, 1, 0, 0],
  },
];
