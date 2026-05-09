export type DiaryContent = {
  area1: string;
  area2: string;
}

export type SaveDiaryEntryParams = {
  userId: string;
  date: Date;
  intention: string;
  content: DiaryContent;
  image_url?: string;
};