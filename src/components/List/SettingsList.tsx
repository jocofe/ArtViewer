import { Link } from 'react-router-dom';
import { auth, db } from '../../config/config';
import { doc, deleteDoc } from 'firebase/firestore';

export const SettingsList = () => {
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await deleteDoc(userRef); // Utiliza la función deleteDoc para eliminar el documento
        await user.delete();
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="user__menu">
      <ul className="menu-list">
        <li className="menu-list__item">
          <Link to={`general`}>General</Link>
        </li>
        <li className="menu-list__item">
          <Link to={`profile`}>Edit Profile</Link>
        </li>
        <li className="menu-list__item">
          <Link to={`password`}>Password</Link>
        </li>
        <li className="menu-list__item">
          <Link to={`sessions`}>Sessions</Link>
        </li>
      </ul>
      <button onClick={handleDeleteAccount}>Delete account</button>
    </div>
  );
};
