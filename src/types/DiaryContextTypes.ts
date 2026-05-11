import type { DiaryContent } from "./DiaryEntryParams";

export type DiaryContextType = {
  entry: DiaryContent;

  setEntry:
    React.Dispatch<
      React.SetStateAction<DiaryContent>
    >;
};