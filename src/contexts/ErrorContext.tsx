import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type PropsWithChildren,
} from 'react';
import { ErrorToast } from '../components/ErrorToast/ErrorToast';

interface ErrorContextType {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  }, []);

  useEffect(() => {
    // Intercepta console.error
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      originalConsoleError(...args); // sigue mostrando en devtools
      const message = args
        .map((a) => (a instanceof Error ? a.message : String(a)))
        .join(' ');
      showError(message);
    };

    // Intercepta errores globales no capturados
    const handleGlobalError = (event: ErrorEvent) => {
      showError(event.message ?? 'Unexpected error');
    };

    // Intercepta promesas rechazadas no capturadas
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message =
        event.reason instanceof Error ? event.reason.message : String(event.reason);
      showError(message);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      console.error = originalConsoleError; // restaura al desmontar
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [showError]);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errorMessage && <ErrorToast message={errorMessage} />}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('useError must be used within ErrorProvider');
  return context;
};
