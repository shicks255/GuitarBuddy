import '../styles/globals.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import Head from 'next/document';
import Script from 'next/script';
import Image from 'next/image';
import useIsMobile from '../hooks/useIsMobile';
import useClickOutside from '../hooks/useClickOutside';

export default function MyApp({ Component, pageProps }) {
  const { asPath, push } = useRouter();

  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();

  const sideNavRef = useRef(undefined);
  const hamburgerRef = useRef(undefined);
  useClickOutside([sideNavRef, hamburgerRef], () => {
    if (isMobile) {
      setExpanded(false)
    }
  });

  let width = expanded ? 'w-[150px]' : 'w-[0px]';
  let left = expanded ? 'left-[150px]' : 'left-0';

  let innerWidth = expanded && !isMobile
    ? { width: 'calc(100% - 150px' }
    : { width: '100%' };

  if (isMobile && expanded) {
    width = 'w-7/12'
    innerWidth = {width: '100%'}
    left = 'left-0'
  }

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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5MRWHRJ');`,
          }}
        ></script>
        <title>Guitar Pal</title>
        <meta
          name="description"
          content="Easy to use tools for guitar plays including scales, chords, tuner and chord building."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5MRWHRJ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      ></noscript>
      <div className="flex h-24 border-b-4">
        <div
          className={`hover:cursor-pointer w-[50px] p-2 z-50 flex-none mx-4 m-auto justify-self-center`}
          onClick={() => setExpanded((val) => !val)}
          ref={hamburgerRef}
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
            className="w-full md:w-auto h-full cursor-pointer"
            src="/banner_red.png"
            width={784}
            alt="banner"
            height={161}
            onClick={() => push('/')}
          />
        </div>
      </div>
      <aside ref={sideNavRef}
        className={`transition-all ${width} min-h-screen h-auto absolute top-24 border-r-2 overflow-hidden z-50 bg-white`}
      >
        <div className="flex flex-col h-full">
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
              asPath === '/chordFinder' ? 'font-bold' : ''
            }`}
          >
            <Link className="flex-1" href="/chordFinder">
              Chord Finder
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
      {isMobile && expanded && <div className={`bg-slate-400 h-full w-full absolute z-40 opacity-40`} />}
      <main
        className={`transition-all absolute ${left} top-24 p-2 flex flex-col margin-auto justify-center z-30`}
        style={innerWidth}
      >
          <div className="flex-initial w-auto grow max-w-screen-lg min-h-screen">
            <Component {...pageProps} />
          </div>
          <footer className={`border-t w- text-center`}>
            <div className='mt-4'>
              <a href='https://shicks255.com' target='_blank' rel="noopener noreferrer">&copy; Steven Hicks</a>
            </div>
          </footer>
      </main>
    </>
  );
}
