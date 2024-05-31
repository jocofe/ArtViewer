import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { Button } from '../Buttons/Buttons';
import { auth, db } from '../../config/config';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../context/UserContextProvider';
import { useContext, useEffect } from 'react';

export const SettingsListMobile = () => {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [selectedLink, setSelectedLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Set selected link based on actual location
  useEffect(() => {
    setSelectedLink(location.pathname.split('/').pop() || '');
  }, [location]);

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  // Obtain provider from firebase
  useEffect(() => {
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
  }, [userData]);

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
        await deleteDoc(userRef);
        await user.delete();
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="user__menu">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-button">
        Menu
      </button>
      {dropdownOpen && (
        <ul className="menu-list">
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
          {provider !== 'google' && (
            <li className="menu-list__item">
              <Link
                to={`password`}
                className={selectedLink === 'password' ? 'active' : ''}
                onClick={() => handleLinkClick('password')}
              >
                Password
              </Link>
            </li>
          )}
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
      )}
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
