import PageHeader from '../components/pageHeader';

const AboutMe = () => {
  return (
    <div className="p-4">
      <PageHeader headline="About me" />
      <p>
        Hello, I&apos;m Steven. If you&apos;re on the this site you probably
        have some sort of interest or curiosity in music theory or guitar
        playing I wanted to put together a site for myself that could be the
        only thing I needed anytime I pick up my guitar.
        <br />
        <br />I started playing guitar when I was in 7th grade. My girst guitar
        was a MiM Fender stratocaster I had to share with my brother. It
        wasn&apos;t long before my mother realized sharing the guitar was not
        going to work so I was able to get my own used Ibanez A27XGN. A year or
        2 later I got my own MiM Fender Strat in Midknight blue. I don&apos;t
        recall why I wanted something else besides the Ibanez, but I would guess
        because most of my guitar heros at that time used strats.
      </p>
    </div>
  );
};

export default AboutMe;
