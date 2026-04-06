import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Form.css';
import type { DailyFormAnswers } from '../../types/FormTypes';

export const Form = () => {
  const [answers, setAnswers] = useState<DailyFormAnswers>({});

  return <Outlet context={{ answers, setAnswers }} />;
};
