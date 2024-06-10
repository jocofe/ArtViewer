import { deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../config/config"

export const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (user?.email) {
        const userRef = doc(db, 'users', user.email);
        await deleteDoc(userRef); // Utiliza la función deleteDoc para eliminar el documento
        await user.delete();
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

// TODO -> is deleting user account but no userDoc from firebase firestore
// is deleting userDoc info but not the doc