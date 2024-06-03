import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/config';
import { ArtistCardDetails } from '../models/artist-card';

const useArtistCarousel = () => {
  const [artists, setArtists] = useState<ArtistCardDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistSnapshot = await getDocs(collection(db, 'artists'));
        const artistsData: ArtistCardDetails[] = [];

        artistSnapshot.forEach(doc => {
          const artistData = doc.data() as ArtistCardDetails;
          artistsData.push(artistData);
        });

        setArtists(artistsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artist data:', error);
        setError('Error fetching artist data');
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, error, isLoading };
};

export default useArtistCarousel;
