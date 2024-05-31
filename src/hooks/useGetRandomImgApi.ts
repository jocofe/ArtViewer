import { useEffect, useState } from 'react';
import { Record } from '../models/mosaic-images';

interface ImageRecord extends Record {
  primaryImageUrl: string;
  primaryImageWidth: number;
  primaryImageHeight: number;
  systemNumber: string;
  _primaryImageId: string; // Añadido _primaryImageId aquí si es parte del modelo
}

export const useGetRandomImgApi = (apiUrl: string) => {
  const [state, setState] = useState<{ systemNumber: string | null; imageId: string | null; loading: boolean }>({
    imageId: null,
    loading: true,
    systemNumber: null,
  });

  useEffect(() => {
    const fetchRandomImageApi = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const images = data.records.map((record: ImageRecord) => record);

        // Filtrar imágenes por altura mínima
        const filteredImages = images.filter((image: ImageRecord) => image.primaryImageHeight > 1200);

        let randomImageId: string;
        let randomSystemNumber: string;

        if (filteredImages.length > 0) {
          // Seleccionar una imagen aleatoria del conjunto filtrado
          const randomIndex = Math.floor(Math.random() * filteredImages.length);
          randomImageId = filteredImages[randomIndex]._primaryImageId;
          randomSystemNumber = filteredImages[randomIndex].systemNumber;
        } else if (images.length > 0) {
          // Si no se encuentran imágenes que cumplan con la altura mínima, seleccionar una imagen aleatoria de las disponibles
          console.warn('No images found with the specified height. Selecting a random image from available set.');
          const randomIndex = Math.floor(Math.random() * images.length);
          randomImageId = images[randomIndex]._primaryImageId;
          randomSystemNumber = images[randomIndex].systemNumber;
        } else {
          throw new Error('No images available.');
        }

        setState({ systemNumber: randomSystemNumber, imageId: randomImageId, loading: false });
      } catch (error) {
        console.error('Error fetching random image:', error);
        setState({ systemNumber: null, imageId: null, loading: false });
      }
    };

    fetchRandomImageApi().catch(error => console.error(error));
  }, [apiUrl]);

  return state;
};
