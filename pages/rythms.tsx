import { useEffect, useRef, useState } from 'react';
import PageHeaderNew from '../components/PageHeaderNew';
// import { Transport, Time, MembraneSynth } from 'tone';
// import Tone from 'tone';
import * as Tone from 'tone';

const Kick = async (ctx: AudioContext, time: number) => {
  ctx.resume().then(() => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';

    const gain = ctx.createGain();
    const distortion = ctx.createWaveShaper();

    const k = 0 / 4;
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    let i = 0;
    let x;

    for (; i < samples; ++i) {
      x = (i * 2) / samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }

    distortion.curve = curve;

    osc.connect(gain);
    gain.connect(distortion);
    distortion.connect(ctx.destination);

    osc.frequency.setValueAtTime(167.1, time + 0.001);
    gain.gain.linearRampToValueAtTime(1, time + 0.1);
    osc.frequency.exponentialRampToValueAtTime(1, time + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01 * 1, time + 0.5);

    osc.start(time);
    osc.stop(time + 0.5 + 0.1);
  });
};

const Snare = async (ctx: AudioContext, time: number) => {
  const noise = ctx.createBufferSource();

  const bufferSize = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 1000;
  noise.connect(noiseFilter);

  const noiseEnvelope = ctx.createGain();
  noiseFilter.connect(noiseEnvelope);

  noiseEnvelope.connect(ctx.destination);

  const osc = ctx.createOscillator();
  osc.type = 'triangle';

  const oscEnvelope = ctx.createGain();
  osc.connect(oscEnvelope);
  oscEnvelope.connect(ctx.destination);

  noiseEnvelope.gain.setValueAtTime(1, time);
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
  noise.start(time);

  osc.frequency.setValueAtTime(100, time);
  oscEnvelope.gain.setValueAtTime(0.7 * 1, time);
  oscEnvelope.gain.exponentialRampToValueAtTime(0.01 * 1, time + 0.7 / 2);
  osc.start(time);

  osc.stop(time + 0.7);
  noise.stop(time + 0.7);
};

const initialSteps = [
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
];

const Rythms = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [loopId, setLoopId] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  //   const [ctx, setCtx] = useState<AudioContext | undefined>();
  const ctx = useRef(undefined);

  useEffect(() => {
    if (!ctx.current) {
      ctx.current = new AudioContext();
    }

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '1m';
    const loop = new Tone.Loop((time) => {
      steps[0].forEach((step, i) => {
        if (step) {
          Kick(ctx.current, time + i * Tone.Time('16n').toSeconds());
        }
      });
    }, '1m');

    const loop2 = new Tone.Loop((time) => {
      steps[1].forEach((step, i) => {
        if (step) {
          Snare(ctx.current, time + i * Tone.Time('16n').toSeconds());
        }
      });
    }, '1m');

    if (isPlaying) {
      Tone.start().then(() => {
        loop.start(0);
        loop2.start(0);
        Tone.Transport.start();
      });
    } else {
      Tone.Transport.stop();
    }

    return () => {
      loop.dispose();
      loop2.dispose();
    };
  }, [isPlaying, tempo, steps]);

  const start = () => {
    console.log('starting play');
    setIsPlaying(true);
  };

  const stop = () => {
    console.log('stopping play');
    setIsPlaying(false);
  };

  const updateSteps = (row, col) => {
    const x = initialSteps;
    x[row][col] = !x[row][col];
    setSteps([...x]);
  };

  return (
    <div>
      <PageHeaderNew headline="Rythms" />
      <button onClick={() => start()}>Play</button>
      <button onClick={() => stop()}>Stop</button>
      <input
        type="range"
        min="40"
        max="260"
        step="1"
        value={tempo}
        list="volumes"
        name="volume"
        onChange={(e) => setTempo(Number(e.target.value))}
      />
      {steps.map((row, rindx) => {
        return (
          <div key={rindx} className="flex gap-2">
            {row.map((col, cindx) => {
              return (
                <div
                  key={cindx}
                  className={`w-20 h-20 border-2 ${col ? 'bg-sky-400' : ''}`}
                  onClick={() => updateSteps(rindx, cindx)}
                >
                  t
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Rythms;
