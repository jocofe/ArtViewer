import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../config/config';
import 'firebase/auth';
import { UserContextProviderFirebaseProps } from '../models/usercontext';
import { registerLoginSession, getUserLoginSessions } from '../components/Services/Sessions';
import { doc, getDoc } from 'firebase/firestore';
import { UserSessions } from '../models/userSessions';

export interface UserData {
  location: string;
  name: string | null;
  email: string;
  displayName: string;
  username: string;
  photoURL: string;
  // Otros datos que deseas del usuario
}

// Context del usuario
interface UserContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  updateUserProfilePhoto: (newPhotoURL: string) => void; // Nuevo método
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

// Componente de proveedor de usuario con Firebase
export const UserContextProviderFirebase: React.FC<UserContextProviderFirebaseProps> = ({ children }) => {
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
            setUserData(userDataFromFirestore);

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

  const updateUserProfilePhoto = (newPhotoURL: string) => {
    setUserData((prevData) => prevData ? { ...prevData, photoURL: newPhotoURL } : prevData);
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