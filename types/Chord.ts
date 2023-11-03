export interface IChord {
  name: string;
  pattern: string[];
  formula: number[];
  family:
    | 'Major'
    | 'Minor'
    | 'Dominant'
    | 'Augmented'
    | 'Diminished'
    | 'Suspended'
    | 'Other';
  notes?: string[];
}

export interface IChordShape {
  type: string;
  number: number;
  tags?: string[];
  inversion?: number;
  pattern: number[];
  extra?: string;
}
