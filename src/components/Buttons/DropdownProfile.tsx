import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { ProfileImageProps, useUserProfilePhoto } from '../../hooks/useUserProfileImg';
import { Link } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { DefaultAvatar } from '../Avatar/DefaultAvatar';

export const DropdownProfileButton: React.FC = () => {
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userData } = useContext(UserContext);
  const username = userData?.username;
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
        {userProfilePhoto && userProfilePhoto.imageUrl !== 'default' ? (
          <img src={userProfilePhoto.imageUrl} alt="User Profile" className="profile-image" />
        ) : (
          <DefaultAvatar />
        )}
      </button>
      {isOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <ul className="dropdown__list">
            <li className="dropdown__item">
              <Link to={`/${username}`}>Profile</Link>
            </li>
            <li className="dropdown__item">
              <Link to={`/${username}/settings`}>Settings</Link>
            </li>
            <li className="dropdown__item" onClick={() => signOut(auth)}>
              <Link to='/'>Sign Out</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
