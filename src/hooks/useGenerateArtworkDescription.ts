import { useEffect, useState } from 'react';
import { generateArtworkDescription } from '../features/openai/openai';

export const useGenerateArtworkDescription = (title: string, imageId: string, author: string) => {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const setDescriptionAsync = async () => {
      try {
        const generatedDescription = await generateArtworkDescription(title, author, imageId);
        setDescription(generatedDescription);
      } catch (error) {
        console.error('Error generating artwork description:', error);
      }
    };

    setDescriptionAsync();
  }, [title, author, imageId]);

  return description;
};
