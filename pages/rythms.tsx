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

const HiHat = async (ctx: AudioContext, time: number) => {
  const oscEnvelope = ctx.createGain();
  const bndPass = ctx.createBiquadFilter();
  bndPass.type = 'bandpass';
  bndPass.frequency.value = 20000;
  bndPass.Q.value = 0.2;
  const hiPass = ctx.createBiquadFilter();
  hiPass.type = 'highpass';
  hiPass.frequency.value = 5000;
  const panner = ctx.createStereoPanner();

  bndPass.connect(hiPass);
  hiPass.connect(oscEnvelope);
  oscEnvelope.connect(panner);
  panner.connect(ctx.destination);

  panner.pan.value = Math.cos(time * 4);
  const tone = 130.81;
  const ratios = [1, 1.342, 1.2312, 1.6532, 1.9523, 2.1523];
  ratios.forEach((rat) => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = tone * rat;
    osc.connect(bndPass);
    osc.start(time);
    osc.stop(time + 0.5);
  });
  oscEnvelope.gain.setValueAtTime(0.00001 * 1, time);
  oscEnvelope.gain.exponentialRampToValueAtTime(1 * 1, time + 0.067 * 0.9);
  oscEnvelope.gain.exponentialRampToValueAtTime(0.3 * 1, time + 0.1 * 0.9);
  oscEnvelope.gain.exponentialRampToValueAtTime(0.00001 * 1, time + 0.9);
};

const Cymbal = async (ctx: AudioContext, time: number) => {
  const noise = ctx.createBufferSource();
  const bufferSize = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  noise.buffer = buffer;

  const noiseEnvelope = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 2000;

  const oscEnvelope = ctx.createGain();
  const bndPass = ctx.createBiquadFilter();
  bndPass.type = 'bandpass';
  bndPass.frequency.value = 20000;
  bndPass.Q.value = 0.2;

  const hipass = ctx.createBiquadFilter();
  hipass.type = 'highpass';
  hipass.frequency.value = 5000;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseEnvelope);
  bndPass.connect(hipass);
  hipass.connect(oscEnvelope);
  noiseEnvelope.connect(ctx.destination);
  oscEnvelope.connect(ctx.destination);

  const ratios = [1, 1.342, 1.2312, 1.6532, 1.9523, 2.1523];
  ratios.forEach((rat) => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = rat * 130.81;
    osc.connect(bndPass);
    osc.start(time);
    osc.stop(time * 1.5);
  });

  const volume = 1;
  const decay = 1.5;
  const fxAmount = 0;

  oscEnvelope.gain.setValueAtTime(0.00001 * volume, time);
  oscEnvelope.gain.exponentialRampToValueAtTime(1 * volume, time + 0.01);
  oscEnvelope.gain.exponentialRampToValueAtTime(
    0.3 * volume,
    time + 0.1 * decay + fxAmount / 100
  );
  oscEnvelope.gain.exponentialRampToValueAtTime(
    0.00001 * volume,
    time + decay + fxAmount / 50
  );
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
  const [stepp, setStepp] = useState(0);
  //   const [ctx, setCtx] = useState<AudioContext | undefined>();
  const ctx = useRef(undefined);
  //   const stepp = useRef(0);

  useEffect(() => {
    if (!ctx.current) {
      ctx.current = new AudioContext();
    }

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '1m';
    const loop = new Tone.Sequence(
      (time, col) => {
        setStepp(col);
        console.log('setting stepp as ' + col);
        steps.forEach((row, i) => {
          if (row[col]) {
            if (i === 0) {
              Cymbal(ctx.current, time);
            }
            if (i === 1) {
              HiHat(ctx.current, time);
            }
            if (i === 2) {
              Snare(ctx.current, time);
            }
            if (i === 3) {
              Kick(ctx.current, time);
            }
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      '16n'
    );

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
        // loop2.start(0);
        Tone.Transport.start();
      });
    } else {
      Tone.Transport.stop();
    }

    return () => {
      loop.dispose();
      //   loop2.dispose();
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
          <div key={rindx} className="flex gap-2 mb-2">
            <div className="flex flex-col">
              {rindx === 0 ? <div>Cymbal</div> : null}
              {rindx === 1 ? <div>Hat</div> : null}
              {rindx === 2 ? <div>Snare</div> : null}
              {rindx === 3 ? <div>Kick</div> : null}
              <div className="flex gap-2">
                {row.map((col, cindx) => {
                  return (
                    <div
                      key={cindx}
                      className={`w-20 h-20 border-2 ${
                        col ? 'bg-sky-400' : ''
                      } ${cindx === stepp ? '' : ''}`}
                      onClick={() => updateSteps(rindx, cindx)}
                    >
                      {cindx === stepp && <div>ACT</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Rythms;
