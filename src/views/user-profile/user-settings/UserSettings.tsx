import { useContext, useEffect, useState } from 'react';
import { DefaultAvatar } from '../../../components/Avatar/DefaultAvatar';
import { ProfileImageProps, useUserProfilePhoto } from '../../../hooks/useUserProfileImg';
import { UserContext } from '../../../context/UserContextProvider';
import { Outlet, useLocation } from 'react-router-dom';
import { SettingsList } from '../../../components/List/SettingsList';

export const UserSettings = () => {
  const { userData } = useContext(UserContext);
  const [fullName, setFullName] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('Descripción')
  const userProfilePhoto: ProfileImageProps | null = useUserProfilePhoto();
  const location = useLocation();

  useEffect(() => {
    if (userData && userData.name) {
      setFullName(userData.name);
    }
  }, [userData]);

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'profile':
        setDescription('Update your username and manage your email account');
        break;
      case 'general':
        setDescription('Set up your profile information')
        break;
      case 'password':
        setDescription('Manage your password')
        break;
      case 'sessions':
        setDescription('Manage your sessions')
        break;
    }
},[location]);

  return (
    <div className="settings-wrapper">
      <div className="settings-menu-wrapper">
        <div className="profile-wrapper">
          <div className="profile-picture-settings">
            {userProfilePhoto && userProfilePhoto.imageUrl !== 'default' ? (
              <img src={userProfilePhoto.imageUrl} alt="User Profile" className="profilecard-image" />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <div className="profile-info">
            <h1 className="h3 profile__name">{fullName}</h1>
            <h5 className="profile__general">{description}</h5>
          </div>
        </div>
        <div className="user-settings">
          <SettingsList />
          <div className="user__settings">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
