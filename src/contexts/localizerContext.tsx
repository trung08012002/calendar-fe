import { createContext, ReactNode, useContext } from 'react';
import { DateLocalizer } from 'react-big-calendar';
import { useState } from 'react';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

interface LocalizerContextType {
  localizer: DateLocalizer;
}

export const LocalizerContext = createContext<LocalizerContextType>({
  localizer: momentLocalizer(moment),
});

export const LocalizerContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [localizer] = useState(momentLocalizer(moment));
  return (
    <LocalizerContext.Provider value={{ localizer }}>
      {children}
    </LocalizerContext.Provider>
  );
};

export const useLocalizerContext = () => useContext(LocalizerContext);
