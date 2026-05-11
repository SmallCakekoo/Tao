import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type PropsWithChildren,
} from 'react';
import { ErrorToast } from '../components/ErrorToast/ErrorToast';
import type { ErrorContextType } from '../types/FeedbackProps';

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  }, []);

  useEffect(() => {
    // Intercepts console.error
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      originalConsoleError(...args); // keeps showing in devtools
      const message = args
        .map((a) => (a instanceof Error ? a.message : String(a)))
        .join(' ');
      showError(message);
    };

    // Intercepts uncaught global errors
    const handleGlobalError = (event: ErrorEvent) => {
      showError(event.message ?? 'Unexpected error');
    };

    // Intercepts uncaught promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message =
        event.reason instanceof Error ? event.reason.message : String(event.reason);
      showError(message);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      console.error = originalConsoleError; // restores on unmount
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
