import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { Button } from '../Buttons/Buttons';
import { auth, db } from '../../config/config';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../context/UserContextProvider';
import { ArrowDown } from '../Icons/icons';

export const SettingsListMobile = () => {
  const location = useLocation();
  const { userData } = useContext(UserContext);
  const [selectedLink, setSelectedLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // Set selected link based on actual location
  useEffect(() => {
    setSelectedLink(location.pathname.split('/').pop() || '');
  }, [location]);

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
    setDropdownOpen(false); // Close menu when link is clicked
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

  // Dropdown menu btn
  const settingMenu = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="user-mobile">
      <button onClick={settingMenu} className="dropdown-btn-settings">
        <div>{selectedLink}</div>
        <div><ArrowDown/></div>
      </button>
      {dropdownOpen && (
        <ul ref={menuRef} className="menu-list-mobile">
          <li className="menu-list-mobile__item">
            <Link
              to={`General`}
              className={selectedLink === 'General' ? 'active' : ''}
              onClick={() => handleLinkClick('General')}
            >
              General
            </Link>
          </li>
          <li className="menu-list-mobile__item">
            <Link
              to={`Profile`}
              className={selectedLink === 'Profile' ? 'active' : ''}
              onClick={() => handleLinkClick('Profile')}
            >
              Profile
            </Link>
          </li>
          {provider !== 'google' && (
            <li className="menu-list-mobile__item">
              <Link
                to={`Password`}
                className={selectedLink === 'Password' ? 'active' : ''}
                onClick={() => handleLinkClick('Password')}
              >
                Password
              </Link>
            </li>
          )}
          <li className="menu-list-mobile__item">
            <Link
              to={`Sessions`}
              className={selectedLink === 'Sessions' ? 'active' : ''}
              onClick={() => handleLinkClick('Sessions')}
            >
              Sessions
            </Link>
          </li>
        </ul>
      )}
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
