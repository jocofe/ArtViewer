import { useEffect, useState } from 'react';
import { generateArtworkDescription } from '../features/openai/openai';

export const useGenerateArtworkDescription = (artTitle: string) => {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const setDescriptionAsync = async () => {
      try {
        const generatedDescription = await generateArtworkDescription(artTitle);
        setDescription(generatedDescription);
      } catch (error) {
        console.error('Error generating artwork description:', error);
      }
    };

    setDescriptionAsync();
  }, [artTitle]);

  return description;
};
