import Image from 'next/image';

interface IProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  imageFloat: 'LEFT' | 'RIGHT';
}

const PageImage: React.FC<IProps> = ({
  src,
  alt,
  children,
  imageFloat,
}: IProps) => {
  const image = <Image width={300} height={300} src={src} alt={alt} />;
  return (
    <div className="mb-2 flex border-2 flex-wrap md:flex-nowrap  p-2 rounded-lg items-center justify-center">
      {imageFloat === 'LEFT' && (
        <>
          {image}
          <p className="p-4">{children}</p>
        </>
      )}
      {imageFloat === 'RIGHT' && (
        <>
          <p className="p-4">{children}</p>
          {image}
        </>
      )}
    </div>
  );
};

export default PageImage;
