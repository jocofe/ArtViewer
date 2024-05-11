import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { ProfileImageProps, useUserProfilePhoto } from '../../hooks/useUserProfileImg';
import { Link } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

export const DropdownProfileButton: React.FC = () => {
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const userProfilePhoto: ProfileImageProps | null = useUserProfilePhoto();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="profile-wrapper">
      <button className="profile__btn" onClick={toggleMenu}>
        {userProfilePhoto && <img src={userProfilePhoto.imageUrl} alt="User Profile" className="profile-image" />}
      </button>
      {isOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <ul className="dropdown__list">
            <li className="dropdown__item">
              <Link to={'/user-profile'}>Profile</Link>
            </li>
            <li className="dropdown__item">
              <Link to={'/user-profile/settings'}>Settings</Link>
            </li>
            <li className="dropdown__item" onClick={() => signOut(auth)}>
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
