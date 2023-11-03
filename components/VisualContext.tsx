import React, { createContext, useReducer, useContext } from 'react';

const VisualContext = createContext<{
  state: State;
  dispatch: Dispatch | undefined;
}>(undefined);

interface IProps {
  children: React.ReactNode;
}

type Action = {
  type:
    | 'toggleFretboardWoodChange'
    | 'changeFadedNoteOpacity'
    | 'changeShowRootNotes'
    | 'changeShowDegreeOrNote';
  payload?: any;
};
type Dispatch = (action: Action, value?: any) => void;
interface State {
  fretboardWood: 'Maple' | 'Rosewood';
  highlightRootNotes: boolean;
  fadedNoteOpacity: number;
  noteDegreeOrNote: 'Degree' | 'Note';
}

const VisualReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'toggleFretboardWoodChange': {
      return {
        ...state,
        fretboardWood: action.payload,
      };
    }
    case 'changeFadedNoteOpacity': {
      return {
        ...state,
        fadedNoteOpacity: action.payload,
      };
    }
    case 'changeShowRootNotes': {
      return {
        ...state,
        highlightRootNotes: action.payload,
      };
    }
    case 'changeShowDegreeOrNote': {
      return {
        ...state,
        noteDegreeOrNote: action.payload,
      };
    }
  }
};

const VisualContextProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(VisualReducer, {
    fretboardWood: 'Maple',
    highlightRootNotes: true,
    fadedNoteOpacity: 20,
    noteDegreeOrNote: 'Degree',
  });

  return (
    <VisualContext.Provider value={{ state, dispatch }}>
      {children}
    </VisualContext.Provider>
  );
};

const useVisualContext = () => {
  const context = useContext(VisualContext);
  if (context === undefined) {
    throw new Error('ouch');
  }

  return context;
};

export { VisualContext, VisualContextProvider, useVisualContext };
