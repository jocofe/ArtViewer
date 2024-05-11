import { useEffect, useState } from 'react';
import { auth } from '../config/config';

export interface ProfileImageProps {
  imageUrl: string;
}

export const useUserProfilePhoto = (): ProfileImageProps | null => {
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfilePhoto = async () => {
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.photoURL) {
        setUserPhotoURL(currentUser.photoURL);
      }
    };

    getUserProfilePhoto();
  }, []);

  return userPhotoURL ? { imageUrl: userPhotoURL } : null;
};
