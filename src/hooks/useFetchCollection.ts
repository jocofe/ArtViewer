import { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { Collection } from '../models/collection';
import { UserContext } from '../context/UserContextProvider';
import { useParams } from 'react-router-dom';

export const useFetchCollection = () => {
  const { userData } = useContext(UserContext);
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const { collectionId } = useParams<{ collectionId: string }>();

  useEffect(() => {
    if (userData && collectionId) {
      const fetchCollection = async () => {
        try {
          const collectionDoc = await getDoc(doc(db, `users/${userData.email}/collections/${collectionId}`));
          if (collectionDoc.exists()) {
            setCollectionData({ id: collectionDoc.id, ...collectionDoc.data() } as Collection);
          } else {
            console.error('No collection found');
          }
        } catch (error) {
          console.error('Error fetching collection data:', error);
        }
      };

      fetchCollection();
    }
  }, [userData, collectionId]);

  return collectionData;
};
