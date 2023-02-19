import { SetStateAction, useEffect, useRef, useState } from 'react';
import PageHeaderNew from '../components/PageHeaderNew';
import * as Tone from 'tone';
import { Sampler } from 'tone/build/esm/instrument';
import { patterns } from '../patterns';
import { pattern as keys } from '../utils';
import PlayingIcon from '../components/icons/PlayingIcon';
import StopIcon from '../components/icons/StopIcon';
import ClearIcon from '../components/icons/ClearIcon';
import SpeakerIcon from '../components/icons/SpeakerIcon';
import WrenchIcon from '../components/icons/WrenchIcon';

const Bass = async (
  note: string,
  time: number,
  sample: Sampler,
  vol: number
) => {
  if (vol > -40) {
    sample.triggerAttackRelease([note], 0.3, time);
  }
};

const Kick = async (time: number, vol: number, sample: Sampler) => {
  if (vol > -10) {
    if (time > 0) {
      sample.triggerAttackRelease(['A1'], 0.3, time);
    } else {
      sample.triggerAttackRelease(['A1'], 0.3);
    }
  }
};

const Snare = async (time: number, vol: number, sample: Sampler) => {
  if (vol > -10) {
    if (time > 0) {
      sample.triggerAttackRelease(['B1'], 0.4, time);
    } else {
      sample.triggerAttackRelease(['B1'], 0.4);
    }
  }
};

const HiHat = async (time: number, vol: number, sample: Sampler) => {
  if (vol === 0) {
    return;
  }
  if (vol > -10) {
    if (time > 0) {
      sample.triggerAttackRelease(['C1'], 0.3, time);
    } else {
      sample.triggerAttackRelease(['C1'], 0.3);
    }
  }
};

const Ride = async (time: number, vol: number, sample: Sampler) => {
  if (vol < -10) {
    return;
  }

  if (time > 0) {
    sample.triggerAttackRelease(['E2'], 1, time);
  } else {
    sample.triggerAttackRelease(['E2'], 1);
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
  }

  if (cents > 0) {
    if (start === 0 && Math.abs(cents) > 7) {
      octave = '4';
    }
    if (start === 1 && Math.abs(cents) > 6) {
      octave = '4';
    }
    if (start === 2 && Math.abs(cents) > 5) {
      octave = '4';
    }
    if (start === 3 && Math.abs(cents) > 4) {
      octave = '4';
    }
    if (start === 4 && Math.abs(cents) > 3) {
      octave = '4';
    }
    if (start === 5 && Math.abs(cents) > 2) {
      octave = '4';
    }
    if (start === 6 && Math.abs(cents) > 1) {
      octave = '4';
    }
    if (start === 7 && Math.abs(cents) > 0) {
      octave = '4';
    }
    if (start === 8 && Math.abs(cents) > 11) {
      octave = '4';
    }
    if (start === 9 && Math.abs(cents) > 10) {
      octave = '4';
    }
    if (start === 10 && Math.abs(cents) > 9) {
      octave = '4';
    }
    if (start === 11 && Math.abs(cents) > 8) {
      octave = '4';
    }
  }

  if (next > 11) {
    next -= 12;
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
  const bassStep = useRef(0);
  const ctx = useRef(undefined);
  const bass = useRef(undefined);

  const [cymbalVol, setCymbalVol] = useState(1);
  const [hatVol, setHatVol] = useState(1);
  const [snareVol, setSnareVol] = useState(1);
  const [kickVol, setKickVol] = useState(1);
  const [bassVol, setBassVol] = useState(1);
  const [rideVol, setRideVol] = useState(1);

  const [pattern, setPattern] = useState<undefined | string>();
  const [key, setKey] = useState(keys[0]);

  const [kickSample, setKickSample] = useState<undefined | Sampler>();
  const [snareSample, setSnareSample] = useState<undefined | Sampler>();
  const [hatSample, setHatSample] = useState<undefined | Sampler>();
  const [bassSample, setBassSample] = useState<undefined | Sampler>();
  const [rideSample, setRideSample] = useState<undefined | Sampler>();

  useEffect(() => {
    if (!bass.current) {
      bass.current = new Tone.Synth().toDestination();
    }
  }, []);

  useEffect(() => {
    if (kickSample) {
      kickSample.volume.value = kickVol;
    }
    if (snareSample) {
      snareSample.volume.value = snareVol;
    }
    if (hatSample) {
      hatSample.volume.value = hatVol;
    }
    if (bassSample) {
      bassSample.volume.value = bassVol;
    }
    if (rideSample) {
      rideSample.volume.value = rideVol;
    }
  }, [
    hatVol,
    snareVol,
    kickVol,
    bassVol,
    kickSample,
    snareSample,
    hatSample,
    bassSample,
    rideSample,
    rideVol,
  ]);

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
          [...pat.ride],
          [...pat.hat],
          [...pat.snare],
          [...pat.kick],
        ];
      });
    }
  }, [pattern]);

  useEffect(() => {
    if (!bassSample) {
      const sampler = new Tone.Sampler({
        urls: {
          'A#2': 'bass/As2.mp3',
          'A#3': 'bass/As3.mp3',
          'A#4': 'bass/As4.mp3',
          'C#2': 'bass/Cs2.mp3',
          'C#3': 'bass/Cs3.mp3',
          'C#4': 'bass/Cs4.mp3',
          E2: 'bass/E2.mp3',
          E3: 'bass/E3.mp3',
          E4: 'bass/E4.mp3',
          G2: 'bass/G2.mp3',
          G3: 'bass/G3.mp3',
          G4: 'bass/G4.mp3',
        },
        baseUrl: '/',
        onload: () => {},
      }).toDestination();
      setBassSample(sampler);
    }
    if (!kickSample) {
      const sampler = new Tone.Sampler({
        urls: {
          A1: 'kick.wav',
        },
        baseUrl: '/',
      }).toDestination();
      setKickSample(sampler);
    }
    if (!snareSample) {
      const sampler = new Tone.Sampler({
        urls: {
          A1: 'snare.wav',
        },
        baseUrl: '/',
      }).toDestination();
      setSnareSample(sampler);
    }
    if (!kickSample) {
      const sampler = new Tone.Sampler({
        urls: {
          A1: 'hit.wav',
        },
        baseUrl: '/',
      }).toDestination();
      setHatSample(sampler);
    }
    if (!rideSample) {
      const sampler = new Tone.Sampler({
        urls: {
          E1: 'ride.wav',
        },
        baseUrl: '/',
      }).toDestination();
      setRideSample(sampler);
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
          const bassNote = pat.bass[bassStep.current + col];
          if (bassNote && bassNote.duration !== 0) {
            const note = calculateBass(key, Number(bassNote.note));
            Bass(note, time, bassSample, bassVol);
          }
          if (pat.bass.length > 16) {
            if (col === 15 && bassStep.current === 0) {
              bassStep.current = 16;
            } else if (col == 15 && bassStep.current === 16) {
              bassStep.current = 0;
            }
          }
        }
        steps.forEach((row, i) => {
          if (row[col]) {
            if (i === 0) {
              Cymbal(ctx.current, time, cymbalVol);
            }
            if (i === 1) {
              Ride(time, rideVol, rideSample);
            }
            if (i === 2) {
              HiHat(time, hatVol, hatSample);
            }
            if (i === 3) {
              Snare(time, snareVol, snareSample);
            }
            if (i === 4) {
              Kick(time, kickVol, kickSample);
            }
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      '16n'
    );

    if (isPlaying) {
      Tone.start().then(() => {
        loop.start(0);
        Tone.Transport.start();
      });
    } else {
      Tone.Transport.stop();
    }

    return () => {
      loop.dispose();
    };
  }, [
    isPlaying,
    tempo,
    steps,
    bassStep,
    cymbalVol,
    hatVol,
    snareVol,
    kickVol,
    bassVol,
    rideVol,
    pattern,
    key,
    bassSample,
    kickSample,
    hatSample,
    snareSample,
    rideSample,
  ]);

  const start = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setStepp(0);
    bassStep.current = 0;
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
          <PlayingIcon playing={isPlaying} />
        </button>
        <button
          className={`${
            isPlaying ? 'hover:cursor-pointer' : 'hover:cursor-default'
          }`}
          onClick={() => stop()}
        >
          <StopIcon isPlaying={isPlaying} />
        </button>
        <button onClick={() => clear()}>
          <ClearIcon />
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
        <div className="ml-4 flex flex-col items-center">
          <span>Bass Vol</span>
          <div>
            <SpeakerIcon mute={bassVol === -40} />
          </div>
          <input
            type="range"
            min="-40"
            max="10"
            step="1"
            value={bassVol}
            list="volumes"
            name="volume"
            onChange={(e) => setBassVol(Number(e.target.value))}
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
                  sampleFunction={() => Cymbal(ctx.current, 0, 1)}
                />
              ) : null}
              {rindx === 1 ? (
                <InstrumentControl
                  name="Ride"
                  vol={rideVol}
                  volControl={setRideVol}
                  sampleFunction={() => Ride(0, 1, rideSample)}
                />
              ) : null}
              {rindx === 2 ? (
                <InstrumentControl
                  name="HiHat"
                  vol={hatVol}
                  volControl={setHatVol}
                  sampleFunction={() => HiHat(0, 1, hatSample)}
                />
              ) : null}
              {rindx === 3 ? (
                <InstrumentControl
                  name="Snare"
                  vol={snareVol}
                  volControl={setSnareVol}
                  sampleFunction={() => Snare(0, 1, snareSample)}
                />
              ) : null}
              {rindx === 4 ? (
                <InstrumentControl
                  name="Kick"
                  vol={kickVol}
                  volControl={setKickVol}
                  sampleFunction={() => Kick(0, 1, kickSample)}
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
  sampleFunction?: () => void;
}

const InstrumentControl: React.FC<IProps> = (props: IProps) => {
  const { name, vol, volControl, sampleFunction } = props;
  const [show, setShow] = useState(true);

  return (
    <div className="flex gap-4 p-4">
      <div
        className="font-semibold text-lg hover:cursor-pointer"
        onClick={sampleFunction ? () => sampleFunction() : null}
      >
        {name}
      </div>
      <div onClick={() => setShow((cur) => !cur)}>
        <WrenchIcon />
      </div>
      {show && (
        <div className="flex gap-4">
          <div>
            <SpeakerIcon mute={vol === -10} />
          </div>
          <div>
            <input
              type="range"
              min="-10"
              max="40"
              step="1"
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
