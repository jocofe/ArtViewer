import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/config';
import { Collection } from '../models/collection';
import { UserData } from '../models/usercontext';

export const useFetchSingleCollection = (userData: UserData | null) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (userData) {
      const fetchCollections = async () => {
        const collectionRef = collection(db, `users/${userData.email}/collections`);
        const collectionSnap = await getDocs(collectionRef);
        const collectionsData = collectionSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Collection[];
        setCollections(collectionsData);
      };

      fetchCollections();
    }
  }, [userData]);

  return collections;
};
