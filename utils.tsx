    

export const pattern = [
    'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#'
]

export const chords = [
    {
        name: 'major',
        pattern: ['1','3','5'],
        formula: [4,3],
        family: 'Major'
    },
    {
        name: 'major6',
        pattern: ['1','3','5','6'],
        formula: [4,3,2],
        family: 'Major'
    },
    {
        name: 'major6/9',
        pattern: ['1,3,5,6,9'],
        formula: [4,3,2,5],
        family: 'Major'
    },
    {
        name: 'major7',
        pattern: ['1','3','5','7'],
        formula: [4,3,4],
        family: 'Major'
    },
    {
        name: 'major9',
        pattern: ['1','3','5','7','9'],
        formula: [4,3,4,3],
        family: 'Major'
    },
    {
        name: 'major11',
        pattern: ['1','3','5','7','9','11'],
        formula: [4,3,4,3,3],
        family: 'Major'
    },
    {
        name: 'minor',
        pattern: ['1','b3','5'],
        formula: [3,4],
        family: 'Minor'
    },
    {
        name: 'minor6',
        pattern: ['1','b3','5','6'],
        formula: [3,4,2],
        family: 'Minor'
    },
    {
        name: 'minor7',
        pattern: ['1','b3','5','b7'],
        formula: [3,4,3],
        family: 'Minor'   
    },
    {
        name: 'minor9',
        pattern: ['1','b3','5','b7','9'],
        formula: [3,4,3,4],
        family: 'Minor'     
    },
    {
        name: 'minor11',
        pattern: ['1','b3','5','b7','9','11'],
        formula: [3,4,3,4,3],
        family: 'Minor'     
    },
    {
        name: 'dom7',
        pattern: ['1','3','5','b7'],
        formula: [4,3,3],
        family: 'Dominant'
    },
    {
        name: 'dom9',
        pattern: ['1','3','5','b7','9'],
        formula: [4,3,3,4],
        family: 'Dominant'
    },
    {
        name: 'dom11',
        pattern: ['1','3','5','b7','9','11'],
        formula: [4,3,3,4,3],
        family: 'Dominant'
    },
    {
        name: 'dim',
        pattern: ['1','b3','b5'],
        formula: [3,3],
        family: 'Diminished'
    },
    {
        name: 'dim7',
        pattern: ['1','b3','b5','bb7'],
        formula: [3,3,3],
        family: 'Diminished'
    },
    {
        name: 'aug',
        pattern: ['1','3','#5'],
        formula: [4,4],
        family: 'Augmented'
    },
    {
        name: 'aug7',
        pattern: ['1','3','#5','b7'],
        formula: [4,4,2],
        family: 'Augmented'
    },
    {
        name: 'sus2',
        pattern: ['1','2','5'],
        formula: [2,5],
        family: 'Suspended'
    },
    {
        name: 'sus4',
        pattern: ['1','4','5'],
        formula: [5,2],
        family: 'Suspended'
    },
    {
        name: '7sus4',
        pattern: ['1','4','5','b7'],
        formula: [5,2,3],
        family: 'Suspended'
    },
    {
        name: 'add9',
        pattern: ['1','3','5','9'],
        formula: [4,3,7],
        family: 'Other'
    },
    {
        name: 'add11',
        pattern: ['1','3','5','11'],
        formula: [4,3,10],
        family: 'Other'
    }
]

export const chordFamilies = ['Major', 'Minor', 'Dominant', 'Augmented', 'Diminished', 'Suspended', 'Other']

export const majorScale = [2,2, 1, 2, 2, 2]
export const naturalMinorScale = [2,1,2,2,1,2]
export const harmonicMinorScale = [2,1,2,2,3,1]
export const melodicMinorScale = [2,1,2,2,2,2]


export function generateString(
    start: string, 
    high: boolean = false,
    tones?: any[], 
    isRosewood?: boolean
) {

    console.log(tones);

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

            const isFirst = indx === 0;
            
            let notee = note;
            let extra = '';
            if (tones && tones.length && tones.findIndex((tone) => tone.note === note) >= 0) {
                extra += 'text-red-600';
                notee = tones.find((tone) => tone.note === note).position;
            }


            let noteStyle = "bg-blue-200 w-6 h-6 m-auto rounded-full ";
            if (tones && tones.length > 0 && tones.findIndex((tone) => tone.note === note) < 0 && indx > 0) {
                noteStyle += "opacity-30"
            } else {
                noteStyle += "opacity-90";
            }

            const thing = start === 'g' && (indx === 3 || indx === 5 || indx === 7 || indx === 9 || indx === 12);
            const thing2 = start === 'd' && (indx === 3 || indx === 5 || indx === 7 || indx === 9 || indx === 12);


            const inlayColor = isRosewood ? 'bg-white': 'bg-black';

            return (
                <div className={`flex-1 relative text-center ${extraClass}`}>
                    {indx > 0 ? <div className={`${height} w-full bg-slate-400 top-5 absolute`}/> : ''}
                    <div className={`top-2 h-6 w-full absolute z-50 ${extra}`}>
                        <div className={`${noteStyle}`}>
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
    
    export function generateScaleTones(key: string, scale: string) {
        if (!key || key.length === 0 || !scale) {
            return [];
        }

        let patternStart = pattern.findIndex((note) => note === key);
        let notes = [{
            note: key,
            position: '1'
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
                position: '' + indx+2
            });
        })

        return notes;
    }

    export function generateChord(key?: string, chord?: string) {
        const c = chords.find((x) => x.name === chord);

        let patternStart = pattern.findIndex((note) => note === key);
        const notes = [{
            note: key,
            position: '1'
        }];

        if (!c) {
            return [];
        }

        c.formula.forEach((i, indx) => {
            let x = patternStart + i;
            if (x > 11) {
                x = x - 12;
            }

            patternStart = x;

            notes.push({
                note: pattern[x],
                position: c.pattern[indx+1]
            })
        });

        return notes;
    }
    
    export function generateFretboard2(
        key?: string, 
        scale?: string, 
        rosewoodNeck?: boolean,
        chord?: string
    ) {

        const neckStyle = rosewoodNeck ? 'bg-yellow-900' : 'bg-yellow-50';
        const scaleTones = scale ? generateScaleTones(key, scale) : [];
        const chordTones = chord ? generateChord(key, chord) : [];

        let tones = scaleTones;
        if (scaleTones.length === 0) {
            tones = chordTones;
        }

        return (
            <div className="">
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