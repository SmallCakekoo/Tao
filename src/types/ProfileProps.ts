// ProfileProps.ts
export interface EditProfileProps {
    setUserName: (name: string) => void;
    setUserQuote: (quote: string) => void;
    setUserQuoteAuthor: (author: string) => void;
}

export interface EditProfileFormProps {
    setUserName: (name: string) => void;
}

export interface EditQuoteProps {
    setQuote: (quote: string) => void;
    setAuthor: (author: string) => void;
}

export interface DotsProps {
  cx?: number;
  cy?: number;
  payload?: {
    value: number;
  };
}