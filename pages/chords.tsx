import { useState } from "react";

const pattern = [
    'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#'
]

const majorScale = [2,2, 1, 2, 2, 2]
const naturalMinorScale = [2,1,2,2,1,2]
const harmonicMinorScale = [2,1,2,2,3,1]
const melodicMinorScale = [2,1,2,2,2,2]

const frets = [
    {
        note: "f"
    },
    {
        note: "c"
    },
    {
        note: "g#"
    },
    {
        note: "d#"
    },
    {
        note: "a#"
    },
    {
        note: "f"
    },
    {
        note: "f#"
    },
    {
        note: "c#"
    },
    {
        note: "a"
    },
    {
        note: "e"
    },
    {
        note: "b"
    },
    {
        note: "f#"
    },
    {
        note: "g"
    },
    {
        note: "d"
    },
    {
        note: "a#"
    },
    {
        note: "f"
    },
    {
        note: "c"
    },
    {
        note: "g"
    },
    {
        note: "g#"
    },
    {
        note: "d#"
    },
    {
        note: "b"
    },
    {
        note: "f#"
    },
    {
        note: "c#"
    },
    {
        note: "g#"
    },
    {
        note: "a"
    },
    {
        note: "e"
    },
    {
        note: "c"
    },
    {
        note: "g"
    },
    {
        note: "d"
    },
    {
        note: "a"
    },
    {
        note: "a#"
    },
    {
        note: "f"
    },
    {
        note: "c#"
    },
    {
        note: "g#"
    },
    {
        note: "d#"
    },
    {
        note: "a#"
    },
    {
        note: "b"
    },
    {
        note: "f#"
    },
    {
        note: "d"
    },
    {
        note: "a"
    },
    {
        note: "e"
    },
    {
        note: "b"
    },
    {
        note: "c"
    },
    {
        note: "g"
    },
    {
        note: "d#"
    },
    {
        note: "a#"
    },
    {
        note: "f"
    },
    {
        note: "c"
    },
    {
        note: "c#"
    },
    {
        note: "g#"
    },
    {
        note: "e"
    },
    {
        note: "b"
    },
    {
        note: "f#"
    },
    {
        note: "c#"
    },
    {
        note: "d"
    },
    {
        note: "a"
    },
    {
        note: "f"
    },
    {
        note: "c"
    },
    {
        note: "g"
    },
    {
        note: "d"
    },
    {
        note: "d#"
    },
    {
        note: "a#"
    },
    {
        note: "f#"
    },
    {
        note: "c#"
    },
    {
        note: "g#"
    },
    {
        note: "d#"
    },
    {
        note: "e"
    },
    {
        note: "b"
    },
    {
        note: "g"
    },
    {
        note: "d"
    },
    {
        note: "a"
    },
    {
        note: "e"
    }
    
]

export default function() {

    function generateString(start: string, high: boolean = false, tones?: any[], isRosewood?: boolean) {

        let patternStart = pattern.findIndex((note) => note === start);

        let notes = [];

        while (notes.length < 13) {
            if (patternStart > 11) {
                patternStart = 0;
            }

            notes.push(pattern[patternStart])
            patternStart += 1;
        }

        let height = 'h-[3px]';
        if (start === 'e' && high) {
            height = 'h-[0.5px]';
        }
        if (start === 'b') {
            height = 'h-[1px]';
        }
        if (start === 'g') {
            height = 'h-[1.5px]';
        }
        if (start === 'd') {
            height = 'h-[2px]';
        }
        if (start === 'a') {
            height = 'h-[2.5px]';
        }

        return notes.map((note, indx) => { 
            let extraClass = '';
            if (indx === 0) {
                extraClass += 'flex-none w-4';
            }

            let notee = note;
            let extra = '';
            if (tones && tones.length && tones.findIndex((tone) => tone.note === note) >= 0) {
                extra += 'text-red-600';
                notee = tones.find((tone) => tone.note === note).position;
            }

            let noneScaleNote = '';
            if (tones && tones.length > 0 && tones.findIndex((tone) => tone.note === note) < 0 && indx > 0) {
                noneScaleNote = 'opacity-30'
            }

            const thing = start === 'g' && (indx === 3 || indx === 5 || indx === 7 || indx === 9 || indx === 12);
            const thing2 = start === 'd' && (indx === 3 || indx === 5 || indx === 7 || indx === 9 || indx === 12);

            const isFirst = indx === 0;

            const noteBorder = isFirst ? '' : 'bg-blue-200 w-6 h-6 m-auto rounded-full opacity-90';
            const inlayColor = isRosewood ? 'bg-white': 'bg-black';

            return (
                <div className={`flex-1 relative text-center ${extraClass}`}>
                    {indx > 0 ? <div className={`${height} w-full bg-slate-400 top-5 absolute`}/> : ''}
                    <div className={`top-2 h-6 w-full absolute z-50 ${extra}`}>
                        <div className={`${noteBorder} ${noneScaleNote}`}>
                            {notee}
                        </div>
                    </div>
                    {indx > 0 ? <div className="h-[40px] w-1 bg-slate-300"/> : ''}
                    {thing && <div className={`h-1 w-2 ${inlayColor} inset-x-1/2 bottom-0 rounded-tl-full rounded-tr-full m-auto absolute`} />}
                    {thing2 && <div className={`h-1 w-2 ${inlayColor} inset-x-1/2 top-0  rounded-bl-full rounded-br-full m-auto absolute`} />}
                </div>
            )
        })
    }

    function generateScaleTones(key: string, scale: string) {
        if (!key || key.length === 0 || !scale) {
            return [];
        }

        let patternStart = pattern.findIndex((note) => note === key);
        let notes = [{
            note: key,
            position: 1
        }];


        let selectedScale = [];
        if (scale === 'major') {
            selectedScale = majorScale
        }
        if (scale === 'natMinor') {
            selectedScale = naturalMinorScale
        }
        if (scale === 'harmMinor') {
            selectedScale = harmonicMinorScale
        }
        if (scale === 'melodMinor') {
            selectedScale = melodicMinorScale
        }

        selectedScale.forEach((deg, indx) => {
            let x = patternStart + deg;
            if (x > 11) {
                x = x - 12;
            }

            patternStart = x;

            notes.push({
                note: pattern[x],
                position: indx+2
            });
        })

        return notes;
    }


    function generateFretboard2(key?: string, scale?: string, rosewoodNeck?: boolean) {

        const neckStyle = rosewoodNeck ? 'bg-yellow-900' : 'bg-yellow-50';
        const tones = generateScaleTones(key, scale);

        return (
            <div className="p-4">
                <div className={neckStyle}>
                    <div className="flex">
                        {generateString('e', true, tones, rosewoodNeck)}
                        </div>
                    <div className="flex">
                        {generateString('b', false, tones, rosewoodNeck)}
                    </div>
                    <div className="flex">
                        {generateString('g', false, tones, rosewoodNeck)}
                    </div>
                    <div className="flex">
                        {generateString('d', false, tones, rosewoodNeck)}
                    </div>
                    <div className="flex">
                        {generateString('a', false, tones, rosewoodNeck)}
                    </div>
                    <div className="flex">
                        {generateString('e', false, tones, rosewoodNeck)}
                    </div>
                </div>
                <div>
                    <div className="flex">
                        <div className="flex-1 w-4 text-center"></div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center">3</div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center">5</div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center">7</div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center">9</div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center"></div>
                        <div className="flex-1 text-center">12</div>
                    </div>
                </div>
            </div>
        )
    }

    function generateFretboard() {
        return (
            <div className="p-4 bg-amber-50">
                <div className="grid grid-rows-6 grid-flow-col gap-0 justify-start items-center">
                    <div>e</div>
                    <div>b</div>
                    <div>g</div>
                    <div>d</div>
                    <div>a</div>
                    <div>e</div>
                    <div className="h-[1px] w-4 bg-slate-400"/>
                    <div className="h-[1.2px] w-4 bg-slate-400"/>
                    <div className="h-[2px] w-4 bg-slate-400"/>
                    <div className="h-[3px] w-4 bg-slate-400"/>
                    <div className="h-[3.5px] w-4 bg-slate-400"/>
                    <div className="h-[4.6px] w-4 bg-slate-400"/>
                    <div className="h-[40px] w-1 bg-slate-600"/>
                    <div className="h-[40px] w-1 bg-slate-600"/>
                    <div className="h-[40px] w-1 bg-slate-600"/>
                    <div className="h-[40px] w-1 bg-slate-600"/>
                    <div className="h-[40px] w-1 bg-slate-600"/>
                    <div className="h-[40px] w-1 bg-slate-600"/>
                    {
                        frets.map((fret, x) => {
                            const height = "h-[1px]"
                            console.log(fret);
                            console.log(x);

                            if (x == 6 || x == 12 || x == 18 || x == 24 || x == 30 || x == 36 || x == 42 || x == 48 || x == 54 || x == 60 || x == 66 || x == 72) {
                                return <>
                                            <div className="h-[40px] w-1 bg-slate-600"/>
                                            <div className="h-[40px] w-1 bg-slate-600"/>
                                            <div className="h-[40px] w-1 bg-slate-600"/>
                                            <div className="h-[40px] w-1 bg-slate-600"/>
                                            <div className="h-[40px] w-1 bg-slate-600"/>
                                            <div className="h-[40px] w-1 bg-slate-600"/>
                                            <div className="place-items-center relative w-10 h-10 text-center">
                                                <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                                <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                            </div>
                                       </>
                            }

                            if (x == 17) {
                                return <div className="place-items-center relative w-10 h-10 text-center">
                                    <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                    <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                    <div className="absolute top-10 w-10 text-center">3</div>
                                </div>
                            }

                            
                            if (x == 29) {
                                return <div className="place-items-center relative w-10 h-10 text-center">
                                    <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                    <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                    <div className="absolute top-10  w-10 text-center">5</div>
                                </div>
                            }

                            
                            if (x == 41) {
                                return <div className="place-items-center relative w-10 h-10 text-center">
                                    <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                    <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                    <div className="absolute top-10  w-10 text-center">7</div>
                                </div>
                            }

                            
                            if (x == 53) {
                                return <div className="place-items-center relative w-10 h-10 text-center">
                                    <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                    <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                    <div className="absolute top-10  w-10 text-center">9</div>
                                </div>
                            }

                            if (x == 71) {
                                return <div className="place-items-center relative w-10 h-10 text-center">
                                    <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                    <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                    <div className="absolute top-10  w-10 text-center">12</div>
                                </div>
                            }


                            return <div className="place-items-center relative w-10 h-10 text-center">
                                    <div className={`${height} h-1 w-10 bg-slate-400 absolute top-5`}/>
                                    <div className="top-2 absolute h-6 w-10">{fret.note}</div>
                                </div>
                        })
                    }
                    {/* <div className="h-[1px] w-4 bg-slate-400"/>
                    <div className="h-[1.2px] w-4 bg-slate-400"/>
                    <div className="h-[2px] w-4 bg-slate-400"/>
                    <div className="h-[3px] w-4 bg-slate-400"/>
                    <div className="h-[3.5px] w-4 bg-slate-400"/>
                    <div className="h-[4.6px] w-4 bg-slate-400"/>
                    <div className="h-[1px] w-4 bg-slate-400"/>
                    <div className="h-[1.2px] w-4 bg-slate-400"/>
                    <div className="h-[2px] w-4 bg-slate-400"/>
                    <div className="h-[3px] w-4 bg-slate-400"/>
                    <div className="h-[3.5px] w-4 bg-slate-400"/>
                    <div className="h-[4.6px] w-4 bg-slate-400"/>                     */}
                </div>
            </div>
        )
    }

    const [key, setKey] = useState('');
    const [scale, setScale] = useState<string | undefined>(undefined)

    const [neckWood, setNeckWood] = useState('maple');

    const tones = generateScaleTones(key, scale);
    console.log(tones);

    return (
        <div>
            <select value={key} onChange={(e) => setKey(e.target.value)}>
                <option value=''></option>
                {pattern.map((note) => (<option value={note}>{note}</option>))}
            </select>

            <select value={scale} onChange={(e) => setScale(e.target.value)}>
                <option value=''></option>
                <option value='major'>Major</option>
                <option value='natMinor'>Natural Minor</option>
                <option value='melodMinor'>Melodic Minor</option>
                <option value='harmMinor'>Harmonic Minor</option>
            </select>

            <form>
                <input type="radio" name="wood" id="maple" value="maple" checked={neckWood === 'maple'} onChange={() => {setNeckWood('maple')}} />
                <label htmlFor="maple">Maple</label>
                <input type="radio" name="wood" id="rosewood" value="rosewood" checked={neckWood === 'rosewood'} onChange={() => setNeckWood('rosewood')} />
                <label htmlFor="rosewood">Rosewood</label>
            </form>

            {key && scale && <div>
                Scale Degrees: {majorScale.join(' - ')}
                <br/>
                Notes: {tones.join(' - ')}
                </div>}

            {generateFretboard2(key, scale, neckWood === 'rosewood')}
        </div>
    )


}