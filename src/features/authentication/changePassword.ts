import { getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth/cordova';
import { db } from '../../config/config';
import { doc, getDoc } from 'firebase/firestore';

// Interface error
interface Error {
  code: string;
  message: string;
}
// Función para cambiar la contraseña del usuario
export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  const auth = getAuth();
  const user = auth.currentUser;

  // Verificar si el usuario está autenticado
  if (user && user.email) {
    // Verificar si el usuario tinenela prop manual-register
    const userDocRef = doc(db, 'users', user.email);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    const isManualRegister = userData?.provider === 'manual-register';

    if (isManualRegister) {
      try {
        // Reautenticar al usuario con su contraseña actual antes de cambiarla

        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        console.log(oldPassword);
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
        console.log('Contraseña cambiada exitosamente.');
      } catch (error: unknown) {
        console.log('ME mata', error);
        const firebaseError = error as Error;
        if (firebaseError.code === 'auth/invalid-credential') {
          throw new Error('Incorrect old password.');
        }
        console.error('error cambiando la contraseña');
        throw new Error('Incorrect old password.');
      }
    } else {
      console.log('usuario registrado no manualmente');
    }
  } else {
    console.log('No hay usuario logeado');
    throw new Error('el usuario no esta logeado');
  }
};
