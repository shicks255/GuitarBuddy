import { useRouter } from 'next/router';

export default function Home() {
  const { push } = useRouter();

  return (
    <div className="font-sans m-auto">
      <main className="p-2">
        <h1 className="text-3xl font-semibold font-sans">
          Welcome to Guitar Pal
        </h1>
        <p className="p-2 mb-8">
          It is my hope that this page will become your go-to resource for all
          things guitar education
        </p>
        <div className="flex m-auto flex-wrap w-full md:flex-nowrap place-content-center place-items-center">
          <div
            onClick={() => push('/scales')}
            className="rounded-lg border-2 p-4 w-full text-center flex-col md:basis-1/2 h-36 md:mr-1 mb-2 cursor-pointer hover:bg-slate-100 transition hover:scale-110"
          >
            <h2 className="font-semibold text-xl">Scales</h2>
            <p className="mt-2 font-light">
              Check out the basic scales in any key, along with the diatonic
              chords
            </p>
          </div>
          <div
            onClick={() => push('/chords')}
            className="rounded-lg border-2 p-4 w-full text-center flex-col md:basis-1/2 h-36 ml-1 mb-2 cursor-pointer hover:bg-slate-100 transition hover:scale-110"
          >
            <h2 className="font-semibold text-xl">Chords</h2>
            <p className="mt-2 font-light">
              Look up a large amount of chords and see all the notes that make
              up each chord as well as some common shapes
            </p>
          </div>
        </div>
        <div
          onClick={() => push('/chordFinder')}
          className="flex m-auto flex-wrap w-full md:flex-nowrap place-content-center place-items-center"
        >
          <div className="rounded-lg border-2 p-4 w-full text-center flex-col md:basis-1/2 h-36 md:mr-1 mb-2 cursor-pointer hover:bg-slate-100 transition hover:scale-110">
            <h2 className="font-semibold text-xl">Chord Finder</h2>
            <p className="mt-2 font-light">
              Enter a few notes on a guitar neck to see the closest matching
              chord.
            </p>
          </div>
          <div
            onClick={() => push('/tuner')}
            className="rounded-lg border-2 p-4 w-full text-center flex-col md:basis-1/2 h-36 md:ml-1 mb-2 cursor-pointer hover:bg-slate-100 transition hover:scale-110"
          >
            <h2 className="font-semibold text-xl">Tuner</h2>
            <p className="mt-2 font-light">
              Either sound the various strings, or allow your computer or phone
              to listen to your instrument.
            </p>
          </div>
        </div>
        <div
          onClick={() => push('/practice')}
          className="flex m-auto flex-wrap w-full md:flex-nowrap place-content-center place-items-center"
        >
          <div className="rounded-lg border-2 p-4 w-full text-center flex-col md:basis-1/2 h-36 cursor-pointer hover:bg-slate-100 transition hover:scale-110">
            <h2 className="font-semibold text-xl">Practice</h2>
            <p className="mt-2 font-light">
              Level up your fretboard knowledge with different practice
              excersizes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
