import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../config/config';
import { doc, getDoc } from 'firebase/firestore';
import 'firebase/auth';
import { UserContextProviderFirebaseProps } from '../models/usercontext';

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
}

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  userData: null,
});

// Componente de proveedor de usuario con Firebase
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
            setUserData(userDataFromFirestore);
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
