import '../styles/globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function MyApp({ Component, pageProps }) {
  console.log(Component);
  console.log(pageProps);

  const { asPath } = useRouter();

  const [expanded, setExpanded] = useState(true);

  const width = expanded ? 'w-[100px]' : 'w-[0px]';
  const left = expanded ? 'left-[100px]' : 'left-0';

  const innerWidth = expanded
    ? { width: 'calc(100% - 100px' }
    : { width: '100%' };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        this.navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log('all good');
          },
          function (error) {
            console.log('did not work", error');
          }
        );
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Guitar-Pal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-24 border-b-4">
        <div
          className={`hover:cursor-pointer w-[50px] p-2 z-50 flex-none mx-4 m-auto justify-self-center`}
          onClick={() => setExpanded((val) => !val)}
        >
          <div
            className={`transition-all w-[25px] h-[3px] bg-black rounded m-[5px] m-auto origin-center ${
              expanded ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <div
            className={`transition-all w-[25px] h-[3px] bg-black rounded m-[5px] m-auto ${
              expanded ? 'invisible' : ''
            }`}
          />
          <div
            className={`transition-all w-[25px] h-[3px] bg-black rounded m-[5px] m-auto origin-center ${
              expanded ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </div>
        <div className="flex-1 justify-self-center">
          <Image
            className="w-full md:w-1/2 h-full"
            src="/banner_red.png"
            width={784}
            alt="banner"
            height={161}
          />
        </div>
      </div>
      <aside
        className={`transition-all ${width} h-screen absolute top-24 border-r-2 overflow-hidden`}
      >
        <div className="flex flex-col h-screen">
          <div
            className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/scales' ? 'font-bold' : ''
            }`}
          >
            <Link className="flex-1" href="/scales">
              Scales
            </Link>
          </div>
          <div
            className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/chords' ? 'font-bold' : ''
            }`}
          >
            <Link className="flex-1" href="/chords">
              Chords
            </Link>
          </div>
          <div
            className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/tuner' ? 'font-bold' : ''
            }`}
          >
            <Link className="flex-1" href="/tuner">
              Tuner
            </Link>
          </div>
          <div
            className={`hover:bg-slate-200 h-10 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/practice' ? 'font-bold' : ''
            }`}
          >
            <Link className="flex-1" href="/practice">
              Practice
            </Link>
          </div>
        </div>
      </aside>
      <main
        className={`transition-all absolute ${left} top-24 p-2`}
        style={innerWidth}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
