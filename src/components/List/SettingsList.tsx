import { Link, useLocation } from 'react-router-dom';
import { auth, db } from '../../config/config';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { Button } from '../Buttons/Buttons';
import { UserContext } from '../../context/UserContextProvider';

export const SettingsList = () => {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [selectedLink, setSelectedLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);


  // Set selected link based on actual ubication
  useEffect(() => {
    setSelectedLink(location.pathname.split('/').pop() || '');
  }, [location]);

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };


  // Obtain provider from firebase
  useEffect(() => {
    // Obtener el proveedor de autenticación del usuario desde Firestore
    const fetchUserProvider = async () => {
      if (userData) {
        const userRef = doc(db, 'users', userData.email);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProvider(userData.provider);
        }
      }
    };

    fetchUserProvider();
  }, [userData, SettingsList]);


  // Show and close delete account modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  // Delete account logic
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
          <Link
            to={`General`}
            className={selectedLink === 'General' ? 'active' : ''}
            onClick={() => handleLinkClick('General')}
          >
            General
          </Link>
        </li>
        <li className="menu-list__item">
          <Link
            to={`Profile`}
            className={selectedLink === 'Profile' ? 'active' : ''}
            onClick={() => handleLinkClick('Profile')}
          >
            Edit Profile
          </Link>
        </li>
        {provider !== 'google' && (
          <li className="menu-list__item">
            <Link
              to={`Password`}
              className={selectedLink === 'Password' ? 'active' : ''}
              onClick={() => handleLinkClick('Password')}
            >
              Password
            </Link>
          </li>
        )}
        <li className="menu-list__item">
          <Link
            to={`Sessions`}
            className={selectedLink === 'Sessions' ? 'active' : ''}
            onClick={() => handleLinkClick('Sessions')}
          >
            Sessions
          </Link>
        </li>
      </ul>
      <hr className="settings-hr" />
      <button onClick={handleShowModal} className="user__delete">
        Delete account
      </button>
      <ModalDefault show={showModal} title="Are you sure?" onClose={handleCloseModal}>
        <p>
          You are about to delete your account. This actions is <strong>permanent</strong> and{' '}
          <strong>unrecoverable</strong>.
        </p>
        <div className="delete-user__btn">
          <Button onClick={handleDeleteAccount} color="sub_primary">
            Delete account
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </ModalDefault>
    </div>
  );
};
