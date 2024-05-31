import { useState, useEffect } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/config';
import { Favourite } from '../models/likes';

const getFavourites = async (userEmail: string) => {
  try {
    const userDocRef = doc(db, 'users', userEmail);
    const favouritesRef = collection(userDocRef, 'favourites');
    const querySnapshot = await getDocs(favouritesRef);
    return querySnapshot.docs.map(doc => doc.data() as Favourite);
  } catch (error) {
    console.error('Error fetching favourites:', error);
    return [];
  }
};

export const useFavourites = (userEmail: string | null) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  useEffect(() => {
    if (userEmail) {
      getFavourites(userEmail).then(setFavourites);
    }
  }, [userEmail]);

  return favourites;
};
