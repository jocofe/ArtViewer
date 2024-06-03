import { ReactNode } from 'react';
import { Collection } from './collection';
import { UserSessionsProps } from './userSessions';

export interface UserContextProviderFirebaseProps {
  children: ReactNode;
}

export interface UserContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  updateUserProfilePhoto: (newPhotoURL: string | null) => void; // Nuevo método
  updateUserProfileName: (newName: string) => void;
  getUserLoginSessions: (userEmail: string) => Promise<UserSessionsProps[]>;
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
