import { useEffect, useState } from 'react';
import { Record, State } from '../models/mosaic-images';

export const useRandomImagesApi = (apiUrl: string) => {
  const [state, setState] = useState<State>({ imageIds: [], loading: true });

  useEffect(() => {
    const fetchRandomImagesApi = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const images = data.records.map((record: Record) => record._primaryImageId);
        const randomImageIds: string[] = [];
        while (randomImageIds.length < 6) {
          const randomIndex = Math.floor(Math.random() * images.length);
          if (!randomImageIds.includes(images[randomIndex])) {
            randomImageIds.push(images[randomIndex]);
          }
        }
        setState({ imageIds: randomImageIds, loading: false });
      } catch (error) {
        console.error('Error fetching random images:', error);
      }
    };

    fetchRandomImagesApi().catch(error => console.error(error));

    const intervalId = setInterval(() => {
      fetchRandomImagesApi().catch(error => console.error(error));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [apiUrl]);

  return state;
};
