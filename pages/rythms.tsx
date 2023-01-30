import { SetStateAction, useEffect, useRef, useState } from 'react';
import PageHeaderNew from '../components/PageHeaderNew';
import * as Tone from 'tone';
import { Sampler } from 'tone/build/esm/instrument';

const Kick = async (
  ctx: AudioContext,
  time: number,
  vol: number,
  sample: Sampler
) => {
  if (true) {
    sample.triggerAttackRelease(['A1'], 0.3, time);
  } else {
    const osc = ctx.createOscillator();
    osc.type = 'sine';

    const gain = ctx.createGain();
    const distortion = ctx.createWaveShaper();

    const k = 1 / 4;
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
    gain.gain.linearRampToValueAtTime(vol, time + 0.1);

    osc.frequency.exponentialRampToValueAtTime(1, time + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01 * vol, time + 0.5);
    gain.gain.linearRampToValueAtTime(0, time + 0.5);

    osc.start(time);
    osc.stop(time + 0.5 + 0.1);
  }
};

const Snare = async (
  ctx: AudioContext,
  time: number,
  vol: number,
  sample: Sampler
) => {
  if (true) {
    sample.triggerAttackRelease(['A2'], 0.4, time);
  } else {
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

    noiseEnvelope.gain.setValueAtTime(vol, time);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    noise.start(time);

    osc.frequency.setValueAtTime(100, time);
    oscEnvelope.gain.setValueAtTime(0.7 * vol, time);
    oscEnvelope.gain.exponentialRampToValueAtTime(0.01 * vol, time + 0.7 / 2);
    osc.start(time);

    osc.stop(time + 0.7);
    noise.stop(time + 0.7);
  }
};

const HiHat = async (
  ctx: AudioContext,
  time: number,
  vol: number,
  sample: Sampler
) => {
  if (true) {
    sample.triggerAttackRelease(['A3'], 0.3, time);
  } else {
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
    oscEnvelope.gain.setValueAtTime(0.00001 * vol, time);
    oscEnvelope.gain.exponentialRampToValueAtTime(1 * vol, time + 0.067 * 0.9);
    oscEnvelope.gain.exponentialRampToValueAtTime(0.3 * vol, time + 0.1 * 0.9);
    oscEnvelope.gain.exponentialRampToValueAtTime(0.00001 * vol, time + 0.9);
  }
};

const Cymbal = async (ctx: AudioContext, time: number, vol: number) => {
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

  const decay = 1.5;
  const fxAmount = 0;

  oscEnvelope.gain.setValueAtTime(0.00001 * vol, time);
  oscEnvelope.gain.exponentialRampToValueAtTime(1 * vol, time);
  oscEnvelope.gain.exponentialRampToValueAtTime(
    0.3 * vol,
    time + 0.1 * decay + fxAmount / 100
  );
  oscEnvelope.gain.exponentialRampToValueAtTime(
    0.00001 * vol,
    time + decay + fxAmount / 50
  );
};

const Rythms = () => {
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [steps, setSteps] = useState(initialSteps);
  const [stepp, setStepp] = useState(0);
  const ctx = useRef(undefined);

  const [cymbalVol, setCymbalVol] = useState(1);
  const [hatVol, setHatVol] = useState(1);
  const [snareVol, setSnareVol] = useState(1);
  const [kickVol, setKickVol] = useState(1);

  const [sample, setSample] = useState<undefined | Sampler>();

  useEffect(() => {
    if (!sample) {
      const sampler = new Tone.Sampler({
        urls: {
          A1: 'kick.wav',
          A2: 'snare.wav',
          A3: 'hit.wav',
        },
        baseUrl: '/',
        onload: () => {},
      }).toDestination();
      setSample(sampler);
    }

    if (!ctx.current) {
      ctx.current = new AudioContext();
    }

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '1m';
    const loop = new Tone.Sequence(
      (time, col) => {
        setStepp(col);
        steps.forEach((row, i) => {
          if (row[col]) {
            if (i === 0) {
              Cymbal(ctx.current, time, cymbalVol);
            }
            if (i === 1) {
              HiHat(ctx.current, time, hatVol, sample);
            }
            if (i === 2) {
              Snare(ctx.current, time, snareVol, sample);
            }
            if (i === 3) {
              Kick(ctx.current, time, kickVol, sample);
            }
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      '16n'
    );

    // const loop2 = new Tone.Loop((time) => {
    //   steps[1].forEach((step, i) => {
    //     if (step) {
    //       Snare(ctx.current, time + i * Tone.Time('16n').toSeconds());
    //     }
    //   });
    // }, '1m');

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
  }, [isPlaying, tempo, steps, cymbalVol, hatVol, snareVol, kickVol, sample]);

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setStepp(0);
  };

  const updateSteps = (row, col) => {
    setSteps((cur) => {
      const copy = cur.map((x) => [...x]);
      copy[row][col] = !cur[row][col];
      return copy;
    });
  };

  const clear = () => {
    setSteps(initialSteps);
  };

  return (
    <div>
      <PageHeaderNew headline="Rythms" />
      <div className="flex mb-6">
        <button onClick={() => start()}>Play</button>
        <button onClick={() => stop()}>Stop</button>
        <button onClick={() => clear()}>Clear</button>
        <div className="flex flex-col items-center">
          <span>Tempo</span>
          <div>{tempo} BPM</div>
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
        </div>
      </div>
      {steps.map((row, rindx) => {
        return (
          <div key={rindx} className="flex gap-2 mb-2">
            <div className="flex flex-col">
              {rindx === 0 ? (
                <InstrumentControl
                  name="Cymbal"
                  vol={cymbalVol}
                  volControl={setCymbalVol}
                />
              ) : null}
              {rindx === 1 ? (
                <InstrumentControl
                  name="HiHat"
                  vol={hatVol}
                  volControl={setHatVol}
                />
              ) : null}
              {rindx === 2 ? (
                <InstrumentControl
                  name="Snare"
                  vol={snareVol}
                  volControl={setSnareVol}
                />
              ) : null}
              {rindx === 3 ? (
                <InstrumentControl
                  name="Kick"
                  vol={kickVol}
                  volControl={setKickVol}
                />
              ) : null}
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

interface IProps {
  name: string;
  vol: number;
  volControl: React.Dispatch<SetStateAction<number>>;
}

const InstrumentControl: React.FC<IProps> = (props: IProps) => {
  const { name, vol, volControl } = props;
  return (
    <div className="flex gap-4 p-4">
      <div className="font-semibold text-lg">{name}</div>
      <div>Vol</div>
      <div>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step=".1"
          value={vol}
          list="volumes"
          name="volume"
          onChange={(e) => volControl(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Rythms;
