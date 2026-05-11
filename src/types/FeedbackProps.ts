export type FeedbackProps = {
  message: string;
  type?: 'success' | 'error';
};

export type FeedbackHandlerProps = {
  onSave: (message: string, type: 'success' | 'error') => void;
};

export type ChangePasswordProps = FeedbackHandlerProps & {
  onClose: () => void;
};

export type ErrorContextType = {
  showError: (message: string) => void;
};
