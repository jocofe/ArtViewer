import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/config';
import { Button } from '../../components/Buttons/Buttons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import { Collection } from '../../models/collection';
import { UserContext } from '../../context/UserContextProvider';

export const UserCollection = ({ id }: Collection) => {
  const { userData } = useContext(UserContext);
  const [collectionData, setCollectionData] = useState<Collection | null>(null);

  useEffect(() => {
    if (userData) {
      const fetchCollection = async () => {
        try {
          const collectionRef = collection(db, `users/${userData.email}/collections/${id}`);
          const collectionSnapshot = await getDocs(collectionRef);
          const collectionDoc = collectionSnapshot.docs[0];
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
  }, [userData, id]); // Agregar id como una dependencia

  if (!collectionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="usercollection-wrapper">
      <div className="usercollection-card">
        <div className="usercollection__info">
          <h1 className="usercollection__name">{collectionData.name}</h1>
          <p className="usercollection__description">{collectionData.description}</p>
        </div>
        <Button>Edit Collection</Button>
        <Button>Delete Collection</Button>
      </div>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {collectionData.artpieces.map(artpiece => (
              <ArtCard
                key={artpiece.id}
                title={artpiece.title}
                imageId={artpiece.imageId}
                author={artpiece.author}
                date={artpiece.date}
                id={artpiece.id}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};
