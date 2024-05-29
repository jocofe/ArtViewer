import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { Link } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { DefaultAvatar } from '../Avatar/DefaultAvatar';

export const DropdownProfileButton = () => {
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userData } = useContext(UserContext);
  const [picture, setPicture] = useState<string | undefined>(undefined);
  const username = userData?.username;
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

  useEffect(() => {
    if (userData && userData.picture) {
      setPicture(userData.picture);
    } else {
      setPicture(undefined);
    }
  }, [userData]);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      <button className="profile__btn" onClick={toggleMenu}>
        {picture && picture !== 'default' ? (
          <img src={picture} alt="User Profile" className="profile-image" />
        ) : (
          <DefaultAvatar />
        )}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown__list">
            <li className="dropdown__item">
              <Link to={`/${username}`}>Profile</Link>
            </li>
            <li className="dropdown__item">
              <Link to={`/${username}/settings`}>Settings</Link>
            </li>
            <li className="dropdown__item" onClick={() => signOut(auth)}>
              <Link to="/">Sign Out</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
