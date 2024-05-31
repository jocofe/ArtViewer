import { useEffect, useState } from 'react';
import axios from 'axios';
import { mapArtistApiToSlider } from '../utils/mapArtistApiToSlider';
import { ArtistSliderItem, ArtistSliderItemFromApi } from '../models/artist-slider';

export const useFetchArtists = (initialPage: number = 1, pageSize: number = 10) => {
  const [artist, setArtist] = useState<ArtistSliderItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArtist = async () => {
      setIsLoading(true);
      const apiURL = `https://api.vam.ac.uk/v2/objects/search?order_sort=asc&page=${initialPage}&page_size=${pageSize}&images_exist=true`;

      try {
        const response = await axios.get<ArtistSliderItemFromApi>(apiURL);
        const mappedArtist = mapArtistApiToSlider(response.data);
        setArtist(mappedArtist);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        setError('Error al obtener los datos de la API');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [initialPage, pageSize]);

  return { artist, error, isLoading };
};
