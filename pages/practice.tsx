/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import FretboardNew from '../components/FretboardNew';
import PageHeaderNew from '../components/PageHeaderNew';
import { chords, pattern } from '../utils/utils';
import { chordTypes } from '../utils/chordTypes';

interface IChord {
  name: string;
  pattern: string[];
  formula: number[];
  family: string;
}

interface IType {
  name: string;
  type: string;
  pattern: number[];
}

interface IChordd {
  key: string;
  name: string;
  type?: string;
}

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
  c: IChordd;
  w1: IChordd;
  w2: IChordd;
  w3: IChordd;
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

const randomChord = () => {
  const key = pattern[getRandom(pattern.length - 1)];
  const chord = chords[getRandom(chords.length - 1)];
  const types = chordTypes.filter((x) => {
    return x.name === chord.name;
  });

  if (!types || types.length === 0) {
    return randomChord();
  }

  return {
    key: key,
    name: chord.name,
    type: types[getRandom(types.length - 1)].type,
  };
};

const Practice = () => {
  const [chord, setChord] = useState<IChordd | undefined>();
  const [wrongChord1, setWrongChord1] = useState<IChordd | undefined>();
  const [wrongChord2, setWrongChord2] = useState<IChordd | undefined>();
  const [wrongChord3, setWrongChord3] = useState<IChordd | undefined>();

  const prepareQuestion = () => {
    setChord(randomChord());
    setWrongChord1(randomChord());
    setWrongChord2(randomChord());
    setWrongChord3(randomChord());
  };

  return (
    <div className="p-4">
      <PageHeaderNew headline="Practice"></PageHeaderNew>
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
          <FretboardNew
            chord={chord.name}
            keyy={chord.key}
            chordType={chord.type}
          />
        </>
      )}
    </div>
  );
};

export default Practice;
