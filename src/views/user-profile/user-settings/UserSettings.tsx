import { useContext, useEffect, useState } from 'react';
import { DefaultAvatar } from '../../../components/Avatar/DefaultAvatar';
import { ProfileImageProps, useUserProfilePhoto } from '../../../hooks/useUserProfileImg';
import { UserContext } from '../../../context/UserContextProvider';
import { Outlet } from 'react-router-dom';
import { SettingsList } from '../../../components/List/SettingsList';

export const UserSettings = () => {
  const { userData } = useContext(UserContext);
  const [fullName, setFullName] = useState<string | null>(null);
  const userProfilePhoto: ProfileImageProps | null = useUserProfilePhoto();

  useEffect(() => {
    if (userData && userData.name) {
      setFullName(userData.name);
    }
  }, [userData]);

  return (
    <div className="settings-wrapper">
      <div className="settings-menu-wrapper">
        <div className="profile-wrapper">
          <div className="profile-picture">
            {userProfilePhoto && userProfilePhoto.imageUrl !== 'default' ? (
              <img src={userProfilePhoto.imageUrl} alt="User Profile" className="profilecard-image" />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <div className="profile-info">
            <h1 className="h3 profile__name">{fullName}</h1>
            <h5 className="profile__general">Update your username and manage your email account</h5>
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
