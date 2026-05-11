export const base64ToBlob = async (base64: string) => {
  const response = await fetch(base64);

  return await response.blob();
};
