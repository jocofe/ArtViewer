import { Link, useLocation } from 'react-router-dom';
import { auth, db } from '../../config/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';

export const SettingsList = () => {
  // Keep track of actual route
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState('');
  const { userData } = useContext(UserContext);

  const userEmail = userData?.email;
  // get Doc


  // Set selected link based on actual ubication
  useEffect(() => {
    setSelectedLink(location.pathname.split('/').pop() || '');
  }, [location]);

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  }

  const deleteAccount = async () => {
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
        {}
        <li className="menu-list__item">
          <Link 
            to={`general`}
            className={selectedLink === 'general' ? 'active' : ''}
            onClick={() => handleLinkClick('general')}
          >
            General
          </Link>
        </li>
        <li className="menu-list__item">
          <Link 
            to={`profile`}
            className={selectedLink === 'profile' ? 'active' : ''}
            onClick={() => handleLinkClick('profile')}
          >
            Edit Profile
          </Link>
        </li>
        <li className="menu-list__item">
          <Link 
            to={`password`}
            className={selectedLink === 'password' ? 'active' : ''}
            onClick={() => handleLinkClick('password')}
          >
            Password
          </Link>
        </li>
        <li className="menu-list__item">
          <Link 
            to={`sessions`}
            className={selectedLink === 'sessions' ? 'active' : ''}
            onClick={() => handleLinkClick('sessions')}
          >
            Sessions
          </Link>
        </li>
      </ul>
      <hr className='settings-hr'/>
      <button onClick={handleDeleteAccount} className='user__delete'>Delete account</button>
    </div>
  );
};
