import { Link, useLocation } from 'react-router-dom';
import { auth, db } from '../../config/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { Button } from '../Buttons/Buttons';

export const SettingsList = () => {
  // Keep track of actual route
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Set selected link based on actual ubication
  useEffect(() => {
    setSelectedLink(location.pathname.split('/').pop() || '');
  }, [location]);

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  // Show and close delete account modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle delete account for button in modal
  const handleDeleteAccount = () => {
    deleteAccount();
  };

  // Delete account logic
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
