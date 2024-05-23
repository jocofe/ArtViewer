import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Toaster } from '../Dialogs/Toaster Message/ToasterMessage';
interface Favourite {
  artPieceId: string;
  id?: string;
}

interface LikesContextProps {
  favourites: Favourite[];
  toggleLike: (artPieceId: string) => void;
}

interface LikesProviderProps {
  children: ReactNode;
}

const LikesContext = createContext<LikesContextProps | undefined>(undefined);

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};

export const LikesProvider: React.FC<LikesProviderProps> = ({ children }) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [toasterMessage, setToasterMessage] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userEmail = user.email!;
        const userDocRef = doc(db, 'users', userEmail);
        const favouritesRef = collection(userDocRef, 'favourites');
        const querySnapshot = await getDocs(favouritesRef);
        setFavourites(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Favourite));
      } else {
        setFavourites([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleLike = async (artPieceId: string) => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email!;
      const userDocRef = doc(db, 'users', userEmail);
      const favouritesRef = collection(userDocRef, 'favourites');
      const existingLike = favourites.find(fav => fav.artPieceId === artPieceId);

      if (existingLike) {
        // Art IS LIKED -> remove like
        if (existingLike.id) {
          const likeDocRef = doc(favouritesRef, existingLike.id);
          await deleteDoc(likeDocRef);
          setFavourites(favourites.filter(fav => fav.artPieceId !== artPieceId));
          setToasterMessage('Art piece removed from favourites');
        }
      } else {
        // Art is NOT LIKED -> like it
        const docRef = await addDoc(favouritesRef, { artPieceId });
        setFavourites([...favourites, { artPieceId, id: docRef.id }]);
        setToasterMessage('Art piece added to favourites');
      }
    }
  };

  return (
    <LikesContext.Provider value={{ favourites, toggleLike }}>
      {children}
      {toasterMessage && <Toaster message={toasterMessage} onClose={() => setToasterMessage(null)} />}
    </LikesContext.Provider>
  );
};
