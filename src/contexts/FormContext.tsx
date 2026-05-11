import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { FormOutletContext } from '../types/FormTypes';

const FormContext = createContext<FormOutletContext | undefined>(undefined);

export const FormProvider = ({ children }: PropsWithChildren) => {
  const [answers, setAnswers] = useState<FormOutletContext['answers']>({});

  return (
    <FormContext.Provider value={{ answers, setAnswers }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
