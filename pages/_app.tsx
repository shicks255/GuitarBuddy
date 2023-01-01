
import "../styles/globals.css"
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
    console.log(Component);
    console.log(pageProps);

    const { asPath } = useRouter();
    console.log(asPath);

    const [expanded, setExpanded] = useState(true);

    const width = expanded ? 'w-[100px]' : 'w-[0px]'
    const left = expanded ? 'left-[100px]' : 'left-0'

    const innerWidth = expanded ? {width: 'calc(100% - 100px'} : {width: '100%'}

    return <>
        <div className="hover:cursor-pointer" onClick={() => (setExpanded((val) => !val))}>
            <div className="w-[25px] h-[3px] bg-black rounded m-[5px] m-auto" />
            <div className="w-[25px] h-[3px] bg-black rounded m-[5px] m-auto" />
            <div className="w-[25px] h-[3px] bg-black rounded m-[5px] m-auto" />
        </div>
    <aside className={`transform ${width} h-screen absolute top-10 border-r-2 overflow-hidden`}>
        <div className="flex flex-col h-screen">
            <div className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${asPath === '/scales' ? 'font-bold' : ''}`}>
                <Link className="flex-1" href="/scales">Scales</Link>
            </div>
            <div className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${asPath === '/chords' ? 'font-bold' : ''}`}>
                <Link className="flex-1" href="/chords">Chords</Link>
            </div>
            <div className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${asPath === '/tuner' ? 'font-bold' : ''}`}>
                <Link className="flex-1" href="/tuner">Tuner</Link>
            </div>
            <div className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${asPath === '/practice' ? 'font-bold' : ''}`}>
                <Link className="flex-1" href="/practice">Practice</Link>
            </div>
        </div>
    </aside>
    <div className={`h-20 font-semibold text-red-600 p-3 border-b-4 text-3xl ${left} absolute`} style={innerWidth}>
        Guitar-Buddy
    </div>
    <div className={`absolute ${left} top-24 p-2`} style={innerWidth}>
        <Component {...pageProps} />
    </div>
    </>
}