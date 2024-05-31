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
import { registerLoginSession, getUserLoginSessions } from '../components/Services/sessions';
import { UserSessions } from '../models/userSessions';

export interface UserData {
  picture: string | null;
  location: string;
  name: string | null;
  email: string;
  displayName: string;
  username: string;
  collections?: Collection[];
}

// Context del usuario
interface UserContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  updateUserProfilePhoto: (newPhotoURL: string | null) => void; // Nuevo método
  updateUserProfileName: (newName: string) => void;
  getUserLoginSessions: (userEmail: string) => Promise<UserSessions[]>
}

export const UserContext = createContext<UserContextType>({ 
  isLoggedIn: false, 
  userData: null, 
  updateUserProfilePhoto: () => {},
  updateUserProfileName: () => {},
  getUserLoginSessions: async () => [],
});

export const UserContextProviderFirebase = ({ children }: UserContextProviderFirebaseProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => { // Listen to changes on auth state
      const loggedIn = !!user;
      setIsLoggedIn(loggedIn);

      localStorage.setItem('isLoggedIn', String(loggedIn));

      if (user) { // If user is logged in obtain info from firestore
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

            // Register user's login session
            await registerLoginSession(userEmail);
          } catch (error) {
            console.error('Error fetching user data', error);
          }
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfilePhoto = (newPhotoURL: string | null) => {
    setUserData((prevData) => prevData ? { ...prevData, picture: newPhotoURL } : prevData);
  };

  const updateUserProfileName = (newName: string) => {
    setUserData((prevData) => prevData ? { ...prevData, name: newName } : prevData);
  };

  return (
    <UserContext.Provider value={{
      isLoggedIn,
      userData,
      updateUserProfilePhoto,
      updateUserProfileName,
      getUserLoginSessions
    }}>
      {children}
    </UserContext.Provider>
  );
};