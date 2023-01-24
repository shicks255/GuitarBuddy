import React, { useState } from 'react';

interface IProps {
  headline: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<IProps> = (props: IProps) => {
  const { headline, children } = props;
  const [collapse, setCollapse] = useState(true);

  return (
    <div
      className={`relative rounded-lg border-2 p-4 overflow-hidden transition ${
        collapse ? 'h-20' : ''
      }`}
    >
      <div
        className="flex justify-between"
        onClick={() => {
          if (children) {
            setCollapse((cur: boolean) => !cur);
          }
        }}
      >
        <h1 className="text-4xl font-semibold mb-4 text-slate-600">
          {headline}
        </h1>
        {children && (
          <div
            className={`transition my-auto font-bold ${
              collapse ? 'rotate-90' : ''
            }`}
          >
            V
          </div>
        )}
      </div>
      <div className="max-w-md">{children}</div>
    </div>
  );
};

export default PageHeader;
