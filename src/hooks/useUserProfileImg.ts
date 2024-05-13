import { useEffect, useState } from 'react';
import { auth, db } from '../config/config'; // Asegúrate de importar db desde tu configuración
import { doc, getDoc } from 'firebase/firestore';

export interface ProfileImageProps {
  imageUrl: string;
}

export const useUserProfilePhoto = (): ProfileImageProps | null => {
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfilePhoto = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userEmail = currentUser.email;
        if (userEmail) {
          const userRef = doc(db, 'users', userEmail);
          try {
            const userDocSnapshot = await getDoc(userRef);
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              if (userData && userData.picture) {
                setUserPhotoURL(userData.picture);
              }
            } else {
              console.log('El documento del usuario no existe');
            }
          } catch (error) {
            console.error('Error al obtener el documento del usuario:', error);
          }
        }
      }
    };

    getUserProfilePhoto();
  }, []);

  return userPhotoURL ? { imageUrl: userPhotoURL } : null;
};
