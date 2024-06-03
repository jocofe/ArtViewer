import { useEffect, useState } from 'react';
import { generateArtworkDescription } from '../features/openai/openai';

export const useGenerateArtworkDescription = (artTitle: string, imageId: string, author: string) => {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const setDescriptionAsync = async () => {
      try {
        const generatedDescription = await generateArtworkDescription(artTitle, author, imageId);
        setDescription(generatedDescription);
      } catch (error) {
        console.error('Error generating artwork description:', error);
      }
    };

    setDescriptionAsync();
  }, [artTitle, author, imageId]);

  return description;
};
