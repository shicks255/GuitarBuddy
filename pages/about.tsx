import PageHeader from '../components/pageHeader';
import Image from 'next/image';
import PageImage from '../components/PageImage';

const About = () => {
  return (
    <div className="p-4">
      <PageHeader headline="About" />
      <h2 className="font-semibold text-lg p-2">Guitar Pal</h2>
      <p className="p-2">
        Hello, I&apos;m Steven. If you&apos;re on the this site you probably
        have some sort of interest or curiosity in music theory or guitar
        playing I wanted to put together a site for myself that could be the
        only thing I needed anytime I pick up my guitar. I strived to make this
        site <span className="italic">simple</span> and{' '}
        <span className="italic">easy to navigate</span> just as easily on
        desktop or a mobile device.
        <br />
      </p>
      <h2 className="font-semibold text-lg p-2">Me</h2>
      <p className="p-2">
        I started playing guitar when I was in 7th grade. I went through a
        typical transition of musical tastes, starting with mostly Punk, going
        through a hippie Classic Rock Phase in the first half of high school.
        Later I got into emo and post-hardcore music. After high school I got
        into Metal for a while, with small dabbles into classical and jazz. A
        few years later I was on a big country kick, primarily classic country
        from the 50&apos;s to 70&apos;s.
        <br />
        <br />
        I&apos;ve been in a few bands over the years, most currently{' '}
        <a
          target="_blank"
          className="text-orange-700 font-bold"
          href="https://linktr.ee/wearehavens"
          rel="noreferrer"
        >
          Havens
        </a>
      </p>
      <h2 className="font-semibold text-lg p-2">My Guitars</h2>
      <PageImage imageFloat="LEFT" src="/pics/guitars.jpg" alt="My guitar">
        My girst guitar was a MiM Fender stratocaster I had to share with my
        brother. It wasn&apos;t long before my mother realized sharing the
        guitar was not going to work so I was able to get my own used Ibanez
        AX120.
      </PageImage>
      <PageImage
        imageFloat="RIGHT"
        src="/pics/strat_1.jpg"
        alt="My first strat"
      >
        A year or 2 later I got my own MiM Fender Strat in Midknight blue. I
        don&apos;t recall why I wanted something else besides the Ibanez, but I
        would guess because most of my guitar heros at that time used strats.
      </PageImage>
      <PageImage imageFloat="LEFT" src="/pics/martin.jpg" alt="My Martin">
        My first acoustic was another used blue Ibanez acoustic-electric. It got
        a lot of use and I still have it today, but it did not stay in the
        greatest shape. My next acoustic after that was a Martin.
      </PageImage>
      <PageImage imageFloat="RIGHT" src="/pics/mexiStrat1.jpg" alt="My strat">
        When I was getting into heavier music I bought a Schecter C-1 Hellraiser
        which was great for a while, but eventually I ended up not being a big
        fan of the active pickups. Also the neck seemed to give off too much
        friction after a while. My MiM strat underwent a few cosmetic and
        functional upgrades over the years. I added locking tuners and a set of
        fender samarium cobalt noiseless pickups. I also decided to paint it
        green and use a black pickgaurd. It seems a bit unusual and I liked the
        uniqueness of it. This strat served me very well for many years, but
        unfortunately was stolen while I was at college.
      </PageImage>
      <PageImage
        imageFloat="LEFT"
        src="/pics/deluxe_strat.jpg"
        alt="American Strat"
      >
        After graduating college and getting my first real job, I rewarded
        myself with the purchase of an American Deluxe Strat in a HSS
        configuration. This served me very well for a long time and I never had
        any complaints about it. One thing that was interesting was the string
        nut was a piece of metal with small ball bearings that would grip each
        string. Fneder seems to have abandoned this, but it always felt very
        stable.
      </PageImage>
      <PageImage imageFloat="RIGHT" src="/pics/les_paul.jpg" alt="Les Paul">
        About 6 years later, after intense preparation I switched jobs and
        rewarded myself with a Gibson Les Paul Classic. I wanted something
        better suited for heavy music with humbuckers and I really liked this
        guitar at first. After a while though, I found myself less & less
        inspired to play it. I think part of it was the weight, and another part
        was that it always felt a bit fragile regardless of whether or not that
        was the case. With my fenders, I was never at all worried about banging
        it hard or moving around or accidentally smacking it against something.
        The Les Paul never gave me this confidence.
      </PageImage>
      <PageImage imageFloat="LEFT" src="/pics/tele.jpg" alt="Telecaster">
        I eventually sold the Les Paul, and when selling it, I was told the neck
        had gone awry. This was dissapointing because I had only had it about a
        year. It is safe to say that was my first and probably last Gibson
        guitar. The reason I sold it was to help fund my more recent purchase, a
        Ultra Lux Telecaser in Transparent Surf Green. I used to find Teles
        really ugly when I was younger, but as I aged I started finding them to
        be a more timeless and classic look compared to strats. This tele is
        absolutely amazing and everything I could want in a guitar. I took a
        chance, buying it without ever playing one, but I find myself liking it
        more & more everytime I play.
      </PageImage>
      <h2 className="font-semibold text-lg p-2">Amps</h2>
      <PageImage imageFloat="RIGHT" src="/pics/marshall.jpg" alt="Marshall">
        My first amps were the typical practice amps, some type of 15 watt solid
        state peavey. Other than this, I mainly used my father&apos;s Danelectro
        DS-50 from the 1960&apos;s. During my time in my second band in High
        School, I bought a Marshall MG100HDFX half stack. I thought it was great
        at the time before I knew much about amps, and it did a perfectly
        servicable job for what it was. It has been collecting dust since the
        late 2000&apos;s.
      </PageImage>
      <PageImage
        imageFloat="LEFT"
        src="/pics/blues_deluxe.jpg"
        alt="Blues Deluxe"
      >
        A few weeks after moving into a new place for college I purchased my
        first real amp, a used Fender Blues Deluxe. For many years this was my
        go-to amp. I think there are some mixed opinions on this amp in the
        online community, but personally I have always been really fond of this
        amp. It just has such a great sound.
      </PageImage>
      <PageImage imageFloat="RIGHT" src="/pics/twin.jpg" alt="Fender Twin">
        When I wanted something a little more portable, I bought a Fender Super
        Champ X2. This amp is pretty cool, a nice mix of tube power and digital
        effects. The combination of effects and amp modeling of different types
        make this a really versatile, pick-up-and-go amplifier. I tend to not
        use this amp very much these days, but I had no complaints ever. My next
        purchase was Fender Twin Reverb Reissue from a bandmade. I needed
        something clean and loud and this fit the bill.
      </PageImage>
      <PageImage
        imageFloat="LEFT"
        src="/pics/emperor.jpg"
        alt="Emperor cabinet"
      >
        It has a great tone, but is definitely heavy. What I actually ended up
        doing was buying a new head from{' '}
        <a
          href="https://www.mojotone.com/"
          target="_blank"
          className="text-orange-700 font-bold"
          rel="noreferrer"
        >
          Mojotone
        </a>{' '}
        and put the amp chassis in there. I paid this with an{' '}
        <a
          href="https://emperorcabinets.com/"
          target="_blank"
          className="text-orange-700 font-bold"
          rel="noreferrer"
        >
          Emperor Cab
        </a>{' '}
        and is my current band practice and gigging rig. It is a bit louder than
        needed for gigs since the venues are always miced, but it sure looks
        cool on stage.
      </PageImage>
      <PageImage imageFloat="RIGHT" src="/pics/champ.jpg" alt="Champ">
        My next amp was one I bought myself from a kit. It was a clone of the
        fender 5f1 champ, again from{' '}
        <a
          href="https://www.mojotone.com/Tweed-Champ-5F1-Style-Amp-Kit"
          target="_blank"
          className="text-orange-700 font-bold"
          rel="noreferrer"
        >
          Mojotone
        </a>{' '}
        This was another fun and very educational experience, and produced a
        great sounding extremely protable amp. Although only 5 watts, this is a
        really great practice amp with all kinds of squish and compression.
      </PageImage>
      <PageImage imageFloat="LEFT" src="/pics/blondes.jpg" alt="Blondes">
        My next 2 amps are the real top dogs, and I bought them pretty close to
        the same time. After a while, I really got in the mood for a vintage
        Fender amp, something old and classic that has stood the test of time
        with handwired design that would always be easy to fix. This was when I
        bought a 1962 Blonde Tremolux, and a fwe months later a 1961 Blonde
        Bandmaster.
      </PageImage>
      <PageImage imageFloat="RIGHT" src="/pics/blondes2.jpg" alt="blondes">
        These amps needed a few fixes, for example 3 prong powerchord conversion
        on the tremolux and a few out of spec resistors along with other small
        things and maintenance, but it was a good learning oppourtinity. Both
        amps are amazingly wonderful, and surprisngly different sounding from
        eachother. I find the Bandmaster a bit colder sounding but very
        punctual. It also has a very unique tremolo circuit, one that Fender
        only released for a short period. It is known as &apos;harmonic&apos;
        tremolo, which instead of the entire signal oscillating in volume, it
        splits the signal so that the high notes increase and decrease in volume
        at the opposite time the low notes do. It sounds very phasey and creates
        a super pleasing sound. The Tremolux just knocks it out of the park. The
        tube rectification gives it a very warm and compressed sound. It&apos;s
        also on the smaller and lighter side, so not a pain to move it around. I
        really like the Fender piggyback series, and have been extremely happy
        with both of these amps. They should serve me well for another 60 years
        I imagine.
      </PageImage>
      <h2 className="font-semibold text-lg p-2">Other Gear</h2>
      <p className="p-2">
        I have never been a huge pedal and effects junkie but have had my share
        over the years including:
      </p>
      <div className="flex flex-wrap items-center justify-center mb-4">
        <div className="w-auto md:w-2/5">
          <ul className="list-disc">
            <li>Boss DS-1</li>
            <li>Boss GE-7</li>
            <li>Boss NS-2</li>
            <li>Boss CS-2</li>
            <li>Boss AW-3 (sold)</li>
            <li>Truetone Jekyll and Hyde 2</li>
            <li>Hao Rust Driver (stolen)</li>
            <li>Retro-Sonic Phaser (stolen)</li>
            <li>Dunlap 95Q Cry Baby (returned) </li>
            <li>Catalinbread Semaphore Tremolo (sold)</li>
            <li>VoodooLabs Sparkle Drive</li>
            <li>Korg Pitchblack Tuner*</li>
            <li>Fender Ag6 Tuner</li>
            <li>Joyo Phaser</li>
            <li>Joyo Ultimate Drive</li>
            <li>Joyo </li>
          </ul>
        </div>
        <div className="w-auto md:w-2/5">
          <ul className="list-disc">
            <li>Electro-Harmonix Pitch Fork</li>
            <li>AMT WH-1 (sold)</li>
            <li>Electro-Harmonix Big Muff Pi</li>
            <li>Dunlop Cry Baby</li>
            <li>Walrus Audio Monument V2 Tremolo*</li>
            <li>Empress Effects Tape Delay*</li>
            <li>MXR Reverb*</li>
            <li>MXR Phase 95*</li>
            <li>Tc Elec Ditto+*</li>
            <li>Walrus Audio Julia Chorus (returned)</li>
            <li>Wampler Tumnus Deluxe*</li>
            <li>Wampler Clarksdale*</li>
            <li>Ernie Ball VP jr</li>
            <li>Dawner Prince Red Rox</li>
            <li>Fender Starcaset Chorus</li>
          </ul>
        </div>
      </div>
      <PageImage imageFloat="LEFT" src="/pics/pedals.jpg" alt="Pedals">
        I also made a homemade Boost pedal from{' '}
        <a
          href="https://buildyourownclone.com/"
          target="_blank"
          className="text-orange-700 font-bold"
          rel="noreferrer"
        >
          BYOC
        </a>
        which was a frustrating but very fun and informative experience. I will
        most likely build more in the future if I need to.
      </PageImage>
      <PageImage imageFloat="RIGHT" src="/pics/board.jpg" alt="Pedals">
        I like most effects, but find myself using reverb and tremolo the most.
        Delay is also one that can be very fun to mess around with. The amount
        of crunch or drive I use always varies. Recently I just plug straight
        into one of my amps and jam around without any pedals at all.
      </PageImage>
    </div>
  );
};

export default About;
