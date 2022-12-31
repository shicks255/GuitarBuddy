
import "../styles/globals.css"
import Link from 'next/link'

export default function MyApp({ Component, pageProps }) {
    console.log(Component);
    console.log(pageProps);
    return <>
    <div className='h-200 font-semibold text-red-600 p-3 border-b-4 text-xl'>
        Guitar-Buddy
    </div>
    <nav className="w-20 h-screen absolute top-14 border-r-2">
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
    <div className="absolute left-20 p-2 w-9/12">
        <Component {...pageProps} />
    </div>
    </>
}