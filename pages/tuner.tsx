import { useState } from 'react';

const Tuner: React.FC = () => {
  const [vol, setVol] = useState('0.4');
  const [duration, setDuration] = useState(1);

  const pattern_old = [
    'A',
    'A#/Bb',
    'B',
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
  ];

  const pattern = ['E', 'B', 'G', 'D', 'A', 'E'];

  const noteFrequencies = [659.25, 493.88, 392, 293.66, 220, 164.81];

  const playTone = (freq: number) => {
    console.log(freq);

    if (typeof window !== 'undefined') {
      const audioContext = new AudioContext();
      let mainGainNode = null;

      mainGainNode = audioContext.createGain();
      mainGainNode.connect(audioContext.destination);
      mainGainNode.gain.value = vol;

      const osc = audioContext.createOscillator();
      osc.connect(mainGainNode);
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      osc.start();

      window.setTimeout(() => {
        osc.stop();
      }, duration * 1000);
    }
  };

  return (
    <div>
      This is the tuner page
      <div className="">
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.1"
          value={vol}
          list="volumes"
          name="volume"
          onChange={(e) => setVol(e.target.value)}
        />
        <br />
        <input
          type="number"
          value={duration}
          name="duration"
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <label htmlFor="duration">Note duration</label>
        {pattern.map((note, indx) => {
          return (
            <div
              className="w-8 text-center bg-blue-200 p-1 m-2 rounded hover:cursor-pointer"
              onClick={() => playTone(noteFrequencies[indx])}
              key={note}
            >
              {note}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tuner;
