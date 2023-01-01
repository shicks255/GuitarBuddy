
import "../styles/globals.css"
import Link from 'next/link'

export default function MyApp({ Component, pageProps }) {
    console.log(Component);
    console.log(pageProps);
    return <>
    <nav className="w-[100px] h-screen absolute top-4 border-r-2">
        <div className="">
            <div className="w-[25px] h-[3px] bg-black rounded m-[5px] m-auto" />
            <div className="w-[25px] h-[3px] bg-black rounded m-[5px] m-auto" />
            <div className="w-[25px] h-[3px] bg-black rounded m-[5px] m-auto" />
        </div>
        <div className="hover:bg-slate-200 hover:cursor-pointer">
            <Link href="/scales">Scales</Link>
        </div>
        <div className="hover:bg-slate-200 hover:cursor-pointer">
            <Link href="/chords">Chords</Link>
        </div>
        <div className="hover:bg-slate-200 hover:cursor-pointer">
            <Link href="/tuner">Tuner</Link>
        </div>
        <div className="hover:bg-slate-200 hover:cursor-pointer">
            <Link href="/practice">Practice</Link>
        </div>
    </nav>
    <div className='h-16 font-semibold text-red-600 p-3 border-b-4 text-xl left-[100px] absolute' style={{width: 'calc(100% - 100px)'}}>
        Guitar-Buddy
    </div>
    <div className="absolute left-[100px] top-20 p-2" style={{width: 'calc(100% - 100px'}}>
        <Component {...pageProps} />
    </div>
    </>
}