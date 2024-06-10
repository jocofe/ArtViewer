export const useImageUrl = (imageId: string): string => {
  const constructImageUrl = (imageId: string) => {
    return `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;
  };

  return constructImageUrl(imageId);
};
