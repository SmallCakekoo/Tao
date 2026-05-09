export type SaveDiaryEntryParams = {
  userId: string;
  date: Date;
  intention: string;
  content: string;
  image_url?: string;
};