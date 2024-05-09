import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../config/config';
import 'firebase/auth';
import { UserContextProviderFirebaseProps } from '../models/usercontext';

// Creamos el contexto de usuario
interface UserContextType {
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType>({ isLoggedIn: false });

// Componente de proveedor de usuario con Firebase
export const UserContextProviderFirebase: React.FC<UserContextProviderFirebaseProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ isLoggedIn }}>{children}</UserContext.Provider>;
};
