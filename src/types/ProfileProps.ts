// ProfileProps.ts
export interface EditProfileProps {
  setUserName: (name: string) => void;
  setUserQuote: (quote: string) => void;
  setUserQuoteAuthor: (author: string) => void;
}

export interface EditProfileFormProps {
  name: string;
  userId: string;
}

export interface EditQuoteProps {
  userId: string;
}

export interface DotsProps {
  cx?: number;
  cy?: number;
  payload?: {
    value: number;
  };
}
