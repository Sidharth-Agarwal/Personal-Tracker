import { createContext, useContext, useState } from 'react';

const FocusModeContext = createContext();

export const useFocusMode = () => {
  const context = useContext(FocusModeContext);
  if (!context) {
    throw new Error('useFocusMode must be used within FocusModeProvider');
  }
  return context;
};

export const FocusModeProvider = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);

  const toggleFocusMode = () => {
    setIsFocusMode(prev => !prev);
  };

  const value = {
    isFocusMode,
    toggleFocusMode,
  };

  return <FocusModeContext.Provider value={value}>{children}</FocusModeContext.Provider>;
};
