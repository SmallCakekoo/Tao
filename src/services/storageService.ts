import { supabase } from "../lib/supabaseClient";

export const uploadDiaryImage =
  async (
    userId: string,
    file: Blob
  ) => {
    const fileName =
      `${userId}/${Date.now()}.jpg`;

    const { error } =
      await supabase.storage
        .from("polaroid")
        .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data } =
      supabase.storage
        .from("journal-images")
        .getPublicUrl(fileName);

    return data.publicUrl;
  };