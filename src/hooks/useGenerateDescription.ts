import { useState, useEffect } from 'react';
import { generateArtworkDescription } from '../features/openai/openai';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { ArtObjectDetails } from '../models/art-list';
import { useGetArtPageInfo } from './useGetArtPageInfo';

const useGenerateDescription = () => {
  const { artDetails } = useGetArtPageInfo();
  const artDetailsInfo: ArtObjectDetails | undefined = artDetails?.[0];
  const [description, setDescription] = useState('');

  useEffect(() => {
    const generateDescription = async (title: string, author: string, imageId: string) => {
      try {
        const description = await generateArtworkDescription(title, author, imageId);
        setDescription(description);
        const artworkRef = doc(db, 'artworks', artDetailsInfo.id);
        await setDoc(artworkRef, {
          title: artDetailsInfo.title,
          artist: artDetailsInfo.artist,
          date: artDetailsInfo.date,
          dimensions: artDetailsInfo.dimensions,
          type: artDetailsInfo.type,
          description: description,
        });
      } catch (error) {
        console.error('Error generating or saving artwork description:', error);
      }
    };

    const fetchDescription = async () => {
      try {
        const artworkRef = doc(db, 'artworks', artDetailsInfo.id);
        const artworkSnapshot = await getDoc(artworkRef);
        if (artworkSnapshot.exists()) {
          const artworkData = artworkSnapshot.data();
          setDescription(artworkData.description);
        }
        generateDescription(artDetailsInfo.title, artDetailsInfo.artist, artDetailsInfo.imageId);
      } catch (error) {
        console.error('Error generating or retrieving artwork description:', error);
      }
    };

    if (artDetailsInfo) {
      fetchDescription();
    }
  }, [artDetailsInfo]);

  return description;
};

export default useGenerateDescription;
