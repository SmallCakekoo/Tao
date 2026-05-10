import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import type { DiaryContent } from "../types/DiaryEntryParams";

import type {
  DiaryContextType,
} from "../types/DiaryContextTypes";

const DiaryContext = createContext<
  DiaryContextType | undefined
>(undefined);

export const DiaryProvider = ({
  children,
}: PropsWithChildren) => {


  const [entry, setEntry] =
    useState<DiaryContent>({
      area1: "",
      area2: "",
      imageUrl: "",
    });

  return (
    <DiaryContext.Provider
      value={{
        entry,
        setEntry,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context =
    useContext(DiaryContext);

  if (!context) {
    throw new Error(
      "useDiary must be used within DiaryProvider"
    );
  }

  return context;
};