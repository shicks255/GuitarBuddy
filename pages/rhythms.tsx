import { SetStateAction, useEffect, useRef, useState } from 'react';
import PageHeaderNew from '../components/PageHeaderNew';
import * as Tone from 'tone';
import { Sampler } from 'tone/build/esm/instrument';
import { patterns } from '../patterns';
import { pattern as keys } from '../utils';

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
  if (vol === 0) {
    return;
  }
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

// const Bass = (
//   ctx: AudioContext,
//   time: number,
//   vol: number,
//   note: { note: string; duration: string }
// ) => {
//   const s = new Tone.Synth().toDestination();
//   s.triggerAttackRelease(note.note, Tone.Time(note.duration).toSeconds(), time);
//   //   s.oscillator.type = 'sawtooth';
// };

const calculateBass = (key: string, cents: number) => {
  let octave = '3';
  if (cents === 0) {
    return `${key}${octave}`;
  }

  const start = keys.indexOf(key);
  let next = start + cents;

  if (next < 0) {
    next += 12;
  }

  if (next > 13) {
    next += -12;
  }

  if (cents < 0) {
    if (start === 0 && Math.abs(cents) >= 5) {
      octave = '2';
    }
    if (start === 1 && Math.abs(cents) > 7) {
      octave = '2';
    }
    if (start === 2 && Math.abs(cents) > 8) {
      octave = '2';
    }
    if (start === 3 && Math.abs(cents) > 9) {
      octave = '2';
    }
    if (start === 4 && Math.abs(cents) > 10) {
      octave = '2';
    }
    if (start === 5 && Math.abs(cents) > 11) {
      octave = '2';
    }
    if (start === 6 && Math.abs(cents) > 12) {
      octave = '2';
    }
    if (start === 7 && Math.abs(cents) > 12) {
      octave = '2';
    }
    if (start === 8 && Math.abs(cents) > 0) {
      octave = '2';
    }
    if (start === 9 && Math.abs(cents) > 1) {
      octave = '2';
    }
    if (start === 10 && Math.abs(cents) > 2) {
      octave = '2';
    }
    if (start === 11 && Math.abs(cents) > 3) {
      octave = '2';
    }
    if (start === 12 && Math.abs(cents) > 4) {
      octave = '2';
    }
  }

  if (cents > 1) {
    let startingDistanceFromC = Math.abs(8 - start);
    if (startingDistanceFromC > 6) {
      startingDistanceFromC -= 12;
    }
    if (Math.abs(startingDistanceFromC) < Math.abs(next)) {
      octave = '4';
    }
  }

  const note = keys[next];
  return `${note}${octave}`;
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
  const bass = useRef(undefined);

  const [cymbalVol, setCymbalVol] = useState(1);
  const [hatVol, setHatVol] = useState(1);
  const [snareVol, setSnareVol] = useState(1);
  const [kickVol, setKickVol] = useState(1);

  const [pattern, setPattern] = useState<undefined | string>();
  const [key, setKey] = useState(keys[0]);

  const [sample, setSample] = useState<undefined | Sampler>();

  useEffect(() => {
    if (!bass.current) {
      bass.current = new Tone.Synth().toDestination();
    }
  }, []);

  useEffect(() => {
    if (pattern) {
      const pat = patterns.filter((x) => x.name === pattern)[0];
      setSteps(() => {
        return [
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
          [...pat.hat],
          [...pat.snare],
          [...pat.kick],
        ];
      });
    }
  }, [pattern]);

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
    const pat = patterns.filter((x) => x.name === pattern)[0];

    const loop = new Tone.Sequence(
      (time, col) => {
        setStepp(col);
        if (pat) {
          const bassNote = pat.bass[col];
          if (bassNote && bassNote.duration !== 0) {
            const note = calculateBass(key, Number(bassNote.note));
            console.log(note);
            bass.current.triggerAttackRelease(
              note,
              Tone.Time(bassNote.duration).toSeconds(),
              time
            );
          }
        }
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
  }, [
    isPlaying,
    tempo,
    steps,
    cymbalVol,
    hatVol,
    snareVol,
    kickVol,
    sample,
    pattern,
    key,
  ]);

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
        <button
          className={`${
            isPlaying ? 'hover:cursor-default' : 'hover:cursor-pointer'
          }`}
          onClick={() => start()}
        >
          {isPlaying && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          {!isPlaying && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          )}
        </button>
        <button
          className={`${
            isPlaying ? 'hover:cursor-pointer' : 'hover:cursor-default'
          }`}
          onClick={() => stop()}
        >
          {!isPlaying && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          {isPlaying && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
              />
            </svg>
          )}
        </button>
        <button onClick={() => clear()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
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
      <div>
        <label>Pattern</label>
        <select
          name="rythm"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        >
          <option></option>
          {patterns.map((pattern) => {
            return (
              <option value={pattern.name} key={pattern.name}>
                {pattern.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Key</label>
        <select name="key" value={key} onChange={(e) => setKey(e.target.value)}>
          {keys.map((key) => {
            return (
              <option value={key} key={key}>
                {key}
              </option>
            );
          })}
        </select>
      </div>
      {steps.map((row, rindx) => {
        return (
          <div key={rindx} className="flex gap-2 mb-2 w-full">
            <div className="flex flex-col w-full">
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
              <div className="flex gap-2 w-full flex-initial">
                {row.map((col, cindx) => {
                  return (
                    <div
                      key={cindx}
                      className={`w-20 h-20 border-2 ${
                        col ? 'bg-sky-400' : ''
                      } ${
                        cindx === stepp && isPlaying && col
                          ? 'shadow-[1px_1px_25px_3px_rgba(0,0,0,0.7)]'
                          : ''
                      }`}
                      onClick={() => updateSteps(rindx, cindx)}
                    >
                      {cindx === stepp && <div className=""></div>}
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
  const [show, setShow] = useState(true);

  return (
    <div className="flex gap-4 p-4">
      <div className="font-semibold text-lg">{name}</div>
      <div onClick={() => setShow((cur) => !cur)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
          />
        </svg>
      </div>
      {show && (
        <div className="flex gap-4">
          <div>
            {vol === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
            {vol > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </div>
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
      )}
    </div>
  );
};

export default Rythms;
