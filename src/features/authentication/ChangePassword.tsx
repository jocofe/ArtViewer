import { getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/cordova";
import { db } from "../../config/config";
import { doc, getDoc } from "firebase/firestore";

// Función para cambiar la contraseña del usuario
export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Verificar si el usuario está autenticado
    if (user && user.email) {
        // Verificar si el usuario tinenela prop manual-register
        const userDocRef = doc(db, 'users', user.email)
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        const isManualRegister = userData?.provider === 'manual-register';

        if (isManualRegister) {
            try {
                // Reautenticar al usuario con su contraseña actual antes de cambiarla
                if (user.email) {
                    const credential = EmailAuthProvider.credential(user.email, oldPassword);
                    await reauthenticateWithCredential(user, credential);
                    
                    // Cambiar la contraseña del usuario
                    await updatePassword(user, newPassword);
                    console.log('Contraseña cambiada exitosamente.');
                } else {
                    console.log('El usuario no tiene una dirección de correo electrónico asociada.');
                }
            } catch (error) {
                console.error('Error al cambiar la contraseña:', error);
                throw error;
            }
        }
        } else {
            console.log('No hay usuario logeado');
        }
};