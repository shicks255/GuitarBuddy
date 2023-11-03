export interface IScale {
  name: string;
  key: string;
  pattern: number[];
  modeFamily?: 'Major' | 'Harmonic Minor' | 'Melodic Minor';
  modeNumber?: number;
  otherNames?: string[];
  details?: string[];
  [key: number]: {
    triad: string;
    ext: string;
    numeral: string;
  };
}
