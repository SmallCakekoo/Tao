import { Outlet } from 'react-router-dom';
import './Form.css';
import { FormProvider } from '../../contexts/FormContext';

export const Form = () => {
  return (
    <FormProvider>
      <Outlet />
    </FormProvider>
  );
};
