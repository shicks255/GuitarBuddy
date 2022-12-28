
const pattern = [
    'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b', 'c', 'c#', 'd', 'd#'
]

const majorScale = [2,2, 1, 2, 2, 2]

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

    function generateString(start: string, high: boolean = false, tones?: string[]) {

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

            let extra = '';
            if (tones && tones.includes(note)) {
                extra += 'text-red-600';
            }
            return (
                <div className={`flex-1 relative text-center ${extraClass}`}>
                    {indx > 0 ? <div className={`${height} w-full bg-slate-400 top-5 absolute`}/> : ''}
                    <div className={`top-2 h-6 w-full absolute z-50 ${extra}`}>{note}</div>
                    {indx > 0 ? <div className="h-[40px] w-1 bg-slate-600"/> : ''}
                </div>
            )
        })
    }

    function generateScaleTones(scale: string) {
        let patternStart = pattern.findIndex((note) => note === scale);
        let notes = [scale];

        majorScale.forEach((deg) => {
            let x = patternStart + deg;
            if (x > 11) {
                x = x - 12;
            }

            patternStart = x;

            notes.push(pattern[x]);
        })

        console.log(notes);
        return notes;
    }


    function generateFretboard2() {

        const tones = generateScaleTones('f#');

        return (
            <div className="p-4 bg-amber-50">
                <div className="flex">
                    {generateString('e', true, tones)}
                    </div>
                <div className="flex">
                    {generateString('b', false, tones)}
                </div>
                <div className="flex">
                    {generateString('g', false, tones)}
                </div>
                <div className="flex">
                    {generateString('d', false, tones)}
                </div>
                <div className="flex">
                    {generateString('a', false, tones)}
                </div>
                <div className="flex">
                    {generateString('e', false, tones)}
                </div>
                <div className="flex">
                    <div className="flex-none w-4 text-center"></div>
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

    return (
        <div>
            {/* {generateFretboard()} */}
            {generateFretboard2()}
        </div>
    )


}