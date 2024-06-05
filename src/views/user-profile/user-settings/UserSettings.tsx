import { useContext, useMemo } from 'react';
import { DefaultAvatar } from '../../../components/Avatar/DefaultAvatar';
import { UserContext } from '../../../context/UserContextProvider';
import { Outlet, useLocation } from 'react-router-dom';
import { SettingsList } from '../../../components/List/SettingsList';
import { SettingsListMobile } from '../../../components/List/SettingsListMobile';
import useWindowSize from '../../../hooks/useWindowSize';

export const UserSettings = () => {
  const { userData } = useContext(UserContext);
  const { width } = useWindowSize(); // TODO change -> window.size?
  const location = useLocation();
  const picture = userData?.picture;


  const description = useMemo(() => {
    const path = location.pathname.split('/').pop(); // Array de strings del pathname y coger el ultimo string de la lista
    switch (path) {
    case 'profile':
        return 'Update your username and manage your email account';
      case 'general':
        return 'Set up your profile information';
      case 'password':
        return 'Manage your password';
      case 'sessions':
        return 'Manage your sessions';
      default:
        return 'Set up your profile information';
    }
  }, [location.pathname]);


  return (
    <div className="settings-wrapper">
      <div className="settings-menu-wrapper">
        <div className="profile-wrapper-settings">
          <div className="profile-picture-settings">
            {picture && picture !== 'default' ? (
              <img src={picture} alt="User Profile" className="profilecard-image" />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <div className="profile-info">
            <h1 className="h3 profile__name">{userData?.name}</h1>
            <h5 className="profile__general">{description}</h5>
          </div>
        </div>
        <div className="user-settings">
          {width <= 768 ? <SettingsListMobile /> : <SettingsList />}
          <div className="user__settings">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
