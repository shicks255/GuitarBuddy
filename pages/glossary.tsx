import PageHeaderNew from '../components/PageHeaderNew';

const Glossary: React.FC = () => {
  return (
    <div className="p-4">
      <div>
        <PageHeaderNew headline="Glossary" />
        <ul className="list-disc">
          <li>Chord</li>
          <li>Scale</li>
          <li>Diatonic</li>
          <li>Chromatic</li>
          <li>Atonal</li>
          <li>Interval</li>
        </ul>
      </div>
    </div>
  );
};

export default Glossary;
