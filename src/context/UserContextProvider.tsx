import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../config/config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import 'firebase/auth';
import { UserContextProviderFirebaseProps } from '../models/usercontext';
import { Collection } from '../models/collection';

interface UserContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
}

export interface UserData {
  picture: string | null;
  photoURL: string | null;
  location: string;
  name: string | null;
  email: string;
  displayName: string;
  username: string;
  collections?: Collection[];
}

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  userData: null,
});

export const UserContextProviderFirebase = ({ children }: UserContextProviderFirebaseProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setIsLoggedIn(!!user);
      if (user) {
        const userEmail = user.email;
        if (userEmail) {
          try {
            const userDoc = await getDoc(doc(db, 'users', userEmail));
            const userDataFromFirestore = userDoc.data() as UserData;

            // Obtener colecciones del usuario
            const collectionsRef = collection(db, `users/${userEmail}/collections`);
            const collectionsSnapshot = await getDocs(collectionsRef);
            const collections: Collection[] = collectionsSnapshot.docs.map(docSnapshot => {
              const collectionData = docSnapshot.data() as Omit<Collection, 'id'>;
              return {
                id: docSnapshot.id,
                ...collectionData,
              };
            });

            // Agregar colecciones a userData sin sobrescribir la propiedad 'id'
            const updatedUserData = { ...userDataFromFirestore, collections };

            setUserData(updatedUserData);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ isLoggedIn, userData }}>{children}</UserContext.Provider>;
};
