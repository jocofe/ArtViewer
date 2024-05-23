import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/config';
import { UserContext } from '../../context/UserContextProvider';
import Tabs from '../../Tabs.tsx/Tabs';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Likes } from '../../components/Likes/Likes';

export interface Collection {
  id: string;
  name: string;
  artpieces: { artPieceId: string; imageUrl: string }[];
}

export const UserPage: React.FC = () => {
  const { userData } = useContext(UserContext);
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

  return (
    <div>
      <ProfileCard />
      <Tabs collections={collections} likes={<Likes />} />
    </div>
  );
};
