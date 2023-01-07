import { useRef, useState } from 'react';

const allFreqs = [
  16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14,
  30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27,
  61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54,
  123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220,
  233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392,
  415.3, 440, 466.16, 493.88, 523.25,
];

const notes = [
  {
    note: 'C0',
    frequency: 16.35,
  },
  {
    note: 'C#0',
    frequency: 17.32,
  },
  {
    note: 'D0',
    frequency: 18.35,
  },
  {
    note: 'D#0',
    frequency: 19.45,
  },
  {
    note: 'E0',
    frequency: 20.6,
  },
  {
    note: 'F0',
    frequency: 21.83,
  },
  {
    note: 'F#0',
    frequency: 23.12,
  },
  {
    note: 'G0',
    frequency: 24.5,
  },
  {
    note: 'G#0',
    frequency: 25.96,
  },
  {
    note: 'A0',
    frequency: 27.5,
  },
  {
    note: 'A#0',
    frequency: 29.14,
  },
  {
    note: 'B0',
    frequency: 30.87,
  },
  {
    note: 'C1',
    frequency: 32.7,
  },
  {
    note: 'C#1',
    frequency: 34.65,
  },
  {
    note: 'D1',
    frequency: 36.71,
  },
  {
    note: 'D#1',
    frequency: 38.89,
  },
  {
    note: 'E1',
    frequency: 41.2,
  },
  {
    note: 'F1',
    frequency: 43.65,
  },
  {
    note: 'F#1',
    frequency: 46.25,
  },
  {
    note: 'G1',
    frequency: 49,
  },
  {
    note: 'G#1',
    frequency: 51.91,
  },
  {
    note: 'A1',
    frequency: 55,
  },
  {
    note: 'A#1',
    frequency: 58.27,
  },
  {
    note: 'B1',
    frequency: 61.74,
  },
  {
    note: 'C2',
    frequency: 65.41,
  },
  {
    note: 'C#2',
    frequency: 69.3,
  },
  {
    note: 'D2',
    frequency: 73.42,
  },
  {
    note: 'D#2',
    frequency: 77.78,
  },
  {
    note: 'E2',
    frequency: 82.41,
  },
  {
    note: 'F2',
    frequency: 87.31,
  },
  {
    note: 'F#2',
    frequency: 92.5,
  },
  {
    note: 'G2',
    frequency: 98,
  },
  {
    note: 'G#2',
    frequency: 103.83,
  },
  {
    note: 'A2',
    frequency: 110,
  },
  {
    note: 'A#2',
    frequency: 116.54,
  },
  {
    note: 'B2',
    frequency: 123.47,
  },
  {
    note: 'C3',
    frequency: 130.81,
  },
  {
    note: 'C#3',
    frequency: 138.59,
  },
  {
    note: 'D3',
    frequency: 146.83,
  },
  {
    note: 'D#3',
    frequency: 155.56,
  },
  {
    note: 'E3',
    frequency: 164.81,
  },
  {
    note: 'F3',
    frequency: 174.61,
  },
  {
    note: 'F#3',
    frequency: 185,
  },
  {
    note: 'G3',
    frequency: 196,
  },
  {
    note: 'G#3',
    frequency: 207.65,
  },
  {
    note: 'A3',
    frequency: 220,
  },
  {
    note: 'A#3',
    frequency: 233.08,
  },
  {
    note: 'B3',
    frequency: 246.94,
  },
  {
    note: 'C4',
    frequency: 261.63,
  },
  {
    note: 'C#4',
    frequency: 277.18,
  },
  {
    note: 'D4',
    frequency: 293.66,
  },
  {
    note: 'D#4',
    frequency: 311.13,
  },
  {
    note: 'E4',
    frequency: 329.63,
  },
  {
    note: 'F4',
    frequency: 349.23,
  },
  {
    note: 'F#4',
    frequency: 369.99,
  },
  {
    note: 'G4',
    frequency: 392,
  },
  {
    note: 'G#4',
    frequency: 415.3,
  },
  {
    note: 'A4',
    frequency: 440,
  },
  {
    note: 'A#4',
    frequency: 466.16,
  },
  {
    note: 'B4',
    frequency: 493.88,
  },
  {
    note: 'C5',
    frequency: 523.25,
  },
  {
    note: 'C#5',
    frequency: 554.37,
  },
  {
    note: 'D5',
    frequency: 587.33,
  },
  {
    note: 'D#5',
    frequency: 622.25,
  },
  {
    note: 'E5',
    frequency: 659.25,
  },
  {
    note: 'F5',
    frequency: 698.46,
  },
  {
    note: 'F#5',
    frequency: 739.99,
  },
  {
    note: 'G5',
    frequency: 783.99,
  },
  {
    note: 'G#5',
    frequency: 830.61,
  },
  {
    note: 'A5',
    frequency: 880,
  },
  {
    note: 'A#5',
    frequency: 932.33,
  },
  {
    note: 'B5',
    frequency: 987.77,
  },
  {
    note: 'C6',
    frequency: 1046.5,
  },
  {
    note: 'C#6',
    frequency: 1108.73,
  },
  {
    note: 'D6',
    frequency: 1174.66,
  },
  {
    note: 'D#6',
    frequency: 1244.51,
  },
  {
    note: 'E6',
    frequency: 1318.51,
  },
  {
    note: 'F6',
    frequency: 1396.91,
  },
  {
    note: 'F#6',
    frequency: 1479.98,
  },
  {
    note: 'G6',
    frequency: 1567.98,
  },
  {
    note: 'G#6',
    frequency: 1661.22,
  },
  {
    note: 'A6',
    frequency: 1760,
  },
  {
    note: 'A#6',
    frequency: 1864.66,
  },
  {
    note: 'B6',
    frequency: 1975.53,
  },
  {
    note: 'C7',
    frequency: 2093,
  },
  {
    note: 'C#7',
    frequency: 2217.46,
  },
  {
    note: 'D7',
    frequency: 2349.32,
  },
  {
    note: 'D#7',
    frequency: 2489.02,
  },
  {
    note: 'E7',
    frequency: 2637.02,
  },
  {
    note: 'F7',
    frequency: 2793.83,
  },
  {
    note: 'F#7',
    frequency: 2959.96,
  },
  {
    note: 'G7',
    frequency: 3135.96,
  },
  {
    note: 'G#7',
    frequency: 3322.44,
  },
  {
    note: 'A7',
    frequency: 3520,
  },
  {
    note: 'A#7',
    frequency: 3729.31,
  },
  {
    note: 'B7',
    frequency: 3951.07,
  },
  {
    note: 'C8',
    frequency: 4186.01,
  },
  {
    note: 'C#8',
    frequency: 4434.92,
  },
  {
    note: 'D8',
    frequency: 4698.63,
  },
  {
    note: 'D#8',
    frequency: 4978.03,
  },
  {
    note: 'E8',
    frequency: 5274.04,
  },
  {
    note: 'F8',
    frequency: 5587.65,
  },
  {
    note: 'F#8',
    frequency: 5919.91,
  },
  {
    note: 'G8',
    frequency: 6271.93,
  },
  {
    note: 'G#8',
    frequency: 6644.88,
  },
  {
    note: 'A8',
    frequency: 7040,
  },
  {
    note: 'A#8',
    frequency: 7458.62,
  },
  {
    note: 'B8',
    frequency: 7902.13,
  },
];

const calculateDistanceFromCenter = (note) => {
  const center = 150;
  const x = center - note.offBy * 10;

  return x;
};

const findClosestNote = (playedFreq: number) => {
  let closestNote = undefined;
  let closetFreqDiff = 60000;

  notes.forEach(({ note, frequency }) => {
    const diff = Math.abs(frequency - playedFreq);

    if (!closestNote) {
      closestNote = note;
    }

    if (diff < closetFreqDiff) {
      closetFreqDiff = diff;
      closestNote = note;
    }
  });

  const x = {
    note: closestNote,
    offBy: notes.find((n) => n.note === closestNote).frequency - playedFreq,
  };

  console.log(x);
  return x;
};

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

  const noteFrequencies = [330, 247, 196, 147, 110, 82];

  const findFundyFreqy = (buffer, sampleRate) => {
    let SIZE = buffer.length;
    let sumOfSquares = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      sumOfSquares += val * val;
    }

    const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);
    if (rootMeanSquare < 0.01) {
      console.log('too quite!');
      return -1;
    }

    let r1 = 0;
    let r2 = SIZE - 1;
    const threshold = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }

    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }

    const trimmedBuffer = buffer.slice(r1, r2);
    SIZE = trimmedBuffer.length;

    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + trimmedBuffer[j] * trimmedBuffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) {
      d++;
    }

    let maxVal = -1;
    let maxIndx = -1;

    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxVal) {
        maxVal = c[i];
        maxIndx = i;
      }
    }

    let TO = maxIndx;
    let x1 = c[TO - 1];
    let x2 = c[TO];
    let x3 = c[TO + 1];

    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) {
      TO = TO - b / (2 * a);
    }

    return sampleRate / TO;
  };

  const findFundFreq = (buffer, sampleRate) => {
    // console.log(buffer);
    let offsetSums = new Array(buffer.length).fill(0);

    for (let offset = 8; offset < buffer.length; offset++) {
      for (let j = 0; j < buffer.length - offset; j++) {
        offsetSums[offset] =
          offsetSums[offset] + buffer[j] * buffer[j + offset];
      }
    }

    let maxValue = -1;
    let bestOffset = -1;

    for (let i = 0; i < offsetSums.length; i++) {
      if (offsetSums[i] > maxValue) {
        maxValue = offsetSums[i];
        bestOffset = i;
      }
    }

    return sampleRate / bestOffset;
  };

  const findFundamentalFrequency = (buffer, sampleRate) => {
    var n = 1024,
      bestR = 0,
      bestK = -1;

    for (var k = 8; k <= 1000; k++) {
      var sum = 0;

      for (var i = 0; i < n; i++) {
        sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
      }

      var r = sum / (n + k);

      if (r > bestR) {
        bestR = r;
        bestK = k;
      }

      if (r > 0.9) {
        // Let's assume that this is good enough and stop right here
        break;
      }
    }

    if (bestR > 0.0025) {
      // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
      var fundamentalFreq = sampleRate / bestK;
      return fundamentalFreq;
    } else {
      // We haven't found a good correlation
      return -1;
    }
  };

  const playTone = (freq: number) => {
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

  const analyzeCanvas = useRef(undefined);

  // let audioContext = null;
  let source = null;

  const stop = () => {
    if (source) {
      source.disconnect();
    }
  };

  const listen = () => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          let mainGainNode = null;

          const audioContext = new AudioContext();
          const analyzer = audioContext.createAnalyser();
          source = audioContext.createMediaStreamSource(stream);

          analyzer.smoothingTimeConstant = 0.85;
          analyzer.minDecibels = -100;
          analyzer.maxDecibels = -10;
          analyzer.fftSize = 2048;
          source.connect(analyzer);
          // source.connect(audioContext.destination);

          const cCtx = analyzeCanvas.current.getContext('2d');

          cCtx.beginPath();
          cCtx.moveTo(150, 100);
          cCtx.lineTo(175, 135);
          cCtx.lineTo(125, 135);
          cCtx.fill();

          let dataArray = new Float32Array(analyzer.fftSize);
          // let dataArray = new Uint8Array(analyzer.fftSize);

          const draw = () => {
            requestAnimationFrame(draw);
            analyzer.getFloatTimeDomainData(dataArray);
            const sampleRate = audioContext.sampleRate;
            const fundementalFreq = findFundyFreqy(dataArray, sampleRate);

            if (fundementalFreq > 0 && fundementalFreq != 6000) {
              console.log(`fun fre = ${fundementalFreq}`);

              const note = findClosestNote(fundementalFreq);
              cCtx.clearRect(0, 0, 300, 150);

              if (note && note.note && note.offBy) {
                console.log(note);
                const text = `${note.note}`;
                cCtx.fillText(text, 145, 50);

                cCtx.beginPath();
                cCtx.moveTo(100, 75);
                cCtx.lineTo(200, 75);
                cCtx.stroke();

                cCtx.beginPath();
                cCtx.arc(150, 75, 10, 0, 2 * Math.PI);
                cCtx.stroke();

                const xPath = calculateDistanceFromCenter(note);
                cCtx.beginPath();
                cCtx.arc(xPath, 75, 10, 0, 2 * Math.PI);
                cCtx.stroke();
              }

              // console.log(note);
            }
          };

          draw();

          console.log(dataArray);

          console.log(analyzer);
        });
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
        <br />
        <button onClick={() => listen()}>Listen</button>
        <button onClick={() => stop()}>Stop</button>
        <canvas
          width={300}
          height={150}
          className="border-4"
          ref={analyzeCanvas}
        ></canvas>
      </div>
    </div>
  );
};

export default Tuner;
