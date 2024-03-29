import '../styles/globals.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import useIsMobile from '../hooks/useIsMobile';
import useClickOutside from '../hooks/useClickOutside';
import { VisualContextProvider } from '../components/VisualContext';

export default function MyApp({ Component, pageProps }) {
  const { asPath, push } = useRouter();
  console.log(asPath);

  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  const sideNavRef = useRef(undefined);
  const hamburgerRef = useRef(undefined);
  useClickOutside([sideNavRef, hamburgerRef], () => {
    if (isMobile) {
      setExpanded(false);
    }
  });

  let width = expanded ? 'w-[150px]' : 'w-[0px]';
  let left = expanded ? 'left-[150px]' : 'left-0';

  let innerWidth =
    expanded && !isMobile ? { width: 'calc(100% - 150px' } : { width: '100%' };

  if (isMobile && expanded) {
    width = 'w-7/12';
    innerWidth = { width: '100%' };
    left = 'left-0';
  }

  const closeIfMobile = () => {
    if (isMobile) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        this.navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            // console.log('all good');
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
        <title>Guitar Pal: Helpful Guitar Tools</title>
        <meta
          name="description"
          content="Easy to use tools for guitar players including scales, chords, tuner and chord building."
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
      <div className={`flex h-24 border-b-4`}>
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
            src="/banner_red_new.png"
            width={784}
            alt="banner"
            height={161}
            onClick={() => push('/')}
          />
        </div>
      </div>
      <aside
        ref={sideNavRef}
        className={`transition-all ${width} min-h-screen h-full absolute top-24 border-r-2 overflow-hidden z-50 bg-white`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath.includes('/Scales')
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/Scales"
              onClick={() => closeIfMobile()}
            >
              Scales
            </Link>
          </div>
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath.includes('/Chords')
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/Chords"
              onClick={() => closeIfMobile()}
            >
              Chords
            </Link>
          </div>
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/ChordFinder'
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/ChordFinder"
              onClick={() => closeIfMobile()}
            >
              Chord Finder
            </Link>
          </div>
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/Tuner'
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/Tuner"
              onClick={() => closeIfMobile()}
            >
              Tuner
            </Link>
          </div>
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/Rhythms'
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/Rhythms"
              onClick={() => closeIfMobile()}
            >
              Rhythms
            </Link>
          </div>
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/Practice'
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/Practice"
              onClick={() => closeIfMobile()}
            >
              Practice
            </Link>
          </div>
          <div
            className={`h-14 hover:cursor-pointer w-full text-center items-center flex ${
              asPath === '/Glossary'
                ? 'font-bold bg-orange-400'
                : 'font-semibold hover:bg-orange-100'
            } ${isMobile ? 'border-b-2' : ''}`}
          >
            <Link
              className="flex-1"
              href="/Glossary"
              onClick={() => closeIfMobile()}
            >
              Glossary
            </Link>
          </div>
        </div>
      </aside>
      {isMobile && expanded && (
        <div
          className={`bg-slate-400 h-full w-full absolute z-40 opacity-40 top-24`}
        />
      )}
      <main
        className={`transition-all absolute ${left} top-24 p-2 flex flex-col m-auto justify-center z-30 overflow-x-hidden`}
        style={innerWidth}
      >
        <div className="flex-initial w-full grow max-w-screen-lg min-h-screen">
          <VisualContextProvider>
            <Component {...pageProps} />
          </VisualContextProvider>
        </div>
        <footer className={`border-t w- text-center h-20`}>
          <div className="mt-4 m-auto">
            <a
              className="text-orange-700 font-bold"
              href="https://shicks255.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              &copy; Steven Hicks
            </a>
          </div>
          <div>
            <Link href="/About">about</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
