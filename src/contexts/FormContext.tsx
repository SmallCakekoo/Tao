import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { DailyFormAnswers } from '../types/FormTypes';

interface FormContextType {
  answers: DailyFormAnswers;
  setAnswers: Dispatch<SetStateAction<DailyFormAnswers>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<DailyFormAnswers>({});

  return (
    <FormContext.Provider value={{ answers, setAnswers }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext debe usarse dentro de un FormProvider');
  }
  return context;
};
