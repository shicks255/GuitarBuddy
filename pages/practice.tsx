/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Fretboard from '../components/Fretboard';
import PageHeader from '../components/PageHeader';
import { chordShapes } from '../utils/chordShapes';
import { IChordToGuess } from '../types/ChordToGuess';
import { chords, noteSequence } from '../utils/musicConstants';
import FretboardSlice from '../components/FretboardSlice';
import { IChord } from '../types/Chord';

const getRandom = (size: number) => {
  const min = 0;
  const max = size;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomOrder = (array: number[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

interface IProps {
  c: IChordToGuess;
  w1: IChordToGuess;
  w2: IChordToGuess;
  w3: IChordToGuess;
}

const Answers: React.FC<IProps> = React.memo((props: IProps) => {
  const { c, w1, w2, w3 } = props;
  const random = randomOrder(Array.of(0, 1, 2, 3));

  console.log('rendering answers');

  const [response, setResponse] = useState('');

  useEffect(() => {
    setResponse('');
  }, []);

  const setResponsee = (correct: boolean) => {
    if (!response) {
      if (correct) {
        setResponse("That's correct, nice work");
      }
      setResponse("Sorry, that's incorrect");
    }
  };

  return (
    <div>
      {random.map((i) => {
        if (i === 0) {
          return (
            <div key={c.name} onClick={() => setResponsee(true)}>
              {c.key}
              {c.name}
            </div>
          );
        }
        if (i === 1) {
          return (
            <div key={w1.name} onClick={() => setResponsee(false)}>
              {w1.key}
              {w1.name}
            </div>
          );
        }
        if (i === 2) {
          return (
            <div key={w2.key} onClick={() => setResponsee(false)}>
              {w2.key}
              {w2.name}
            </div>
          );
        }
        if (i === 3) {
          return (
            <div key={w3.key} onClick={() => setResponsee(false)}>
              {w3.key}
              {w3.name}
            </div>
          );
        }
      })}
      {response}
    </div>
  );
});

const randomChord: () => IChordToGuess = () => {
  const key = noteSequence[getRandom(noteSequence.length - 1)];
  const chord = chords[getRandom(chords.length - 1)];
  const shapes = chordShapes.filter((x) => {
    return x.name === chord.name;
  });

  if (!shapes || shapes.length === 0) {
    return randomChord();
  }

  return {
    key: key,
    chord: shapes[getRandom(shapes.length - 1)],
    name: chord.name,
  };
};

const Practice = () => {
  const [chord, setChord] = useState<IChordToGuess | undefined>();
  const [wrongChord1, setWrongChord1] = useState<IChordToGuess | undefined>();
  const [wrongChord2, setWrongChord2] = useState<IChordToGuess | undefined>();
  const [wrongChord3, setWrongChord3] = useState<IChordToGuess | undefined>();

  const prepareQuestion = () => {
    setChord(randomChord());
    setWrongChord1(randomChord());
    setWrongChord2(randomChord());
    setWrongChord3(randomChord());
  };

  return (
    <div className="p-4">
      <PageHeader headline="Practice"></PageHeader>
      Chord Naming Interval Naming Note Naming
      <button onClick={() => prepareQuestion()}>Start</button>
      {chord && (
        <>
          <div>This chord is a:</div>
          <div>
            <Answers
              c={chord}
              w1={wrongChord1}
              w2={wrongChord2}
              w3={wrongChord3}
            />
          </div>
          <FretboardSlice
            chord={chord.name}
            keyy={chord.key}
            chordShape={chord.chord}
          />
        </>
      )}
    </div>
  );
};

export default Practice;
