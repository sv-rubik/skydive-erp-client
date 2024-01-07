// eslint-disable-next-line
import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  isDataUpdated: boolean;
  setIsDataUpdated: Dispatch<SetStateAction<boolean>>;
}

export const CurrentStateIsDataUpdatedContext = createContext<ContextProps>({
  isDataUpdated: false,
  setIsDataUpdated: () => {},
});
