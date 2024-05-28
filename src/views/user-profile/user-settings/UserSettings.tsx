import { useContext, useEffect, useState } from 'react';
import { DefaultAvatar } from '../../../components/Avatar/DefaultAvatar';
import { UserContext } from '../../../context/UserContextProvider';
import { Outlet } from 'react-router-dom';
import { SettingsList } from '../../../components/List/SettingsList';

export const UserSettings = () => {
  const { userData } = useContext(UserContext);
  const [fullName, setFullName] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (userData) {
      setFullName(userData.name || null);
      setPicture(userData.picture || undefined);
    }
  }, [userData]);

  return (
    <div className="settings-wrapper">
      <div className="settings-menu-wrapper">
        <div className="profile-wrapper">
          <div className="profile-picture">
            {picture && picture !== 'default' ? (
              <img src={picture} alt="User Profile" className="profilecard-image" />
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
