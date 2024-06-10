import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { Button } from '../Buttons/Buttons';
import { handleDeleteAccount } from '../../hooks/useDeleteAccount';
import { useSelectedLink, useToggleModal } from '../../hooks/useSettingsList';

export const SettingsList = () => {
  const { userData } = useContext(UserContext);
  const { selectedLink } = useSelectedLink();
  const { showModal, toggleModal } = useToggleModal();

  return (
    <div className="user__menu">
      <ul className="menu-list">
        <li className="menu-list__item">
          <Link
            to={`general`}
            className={selectedLink === 'general' ? 'active' : ''}
          >
            General
          </Link>
        </li>
        <li className="menu-list__item">
          <Link
            to={`profile`}
            className={selectedLink === 'profile' ? 'active' : ''}
          >
            Edit Profile
          </Link>
        </li>
        {userData?.provider !== 'google' && (
          <li className="menu-list__item">
            <Link
              to={`password`}
              className={selectedLink === 'password' ? 'active' : ''}
            >
              Password
            </Link>
          </li>
        )}
        <li className="menu-list__item">
          <Link
            to={`sessions`}
            className={selectedLink === 'sessions' ? 'active' : ''}
          >
            Sessions
          </Link>
        </li>
      </ul>
      <hr className="settings-hr" />
      <button onClick={toggleModal} className="user__delete">
        Delete account
      </button>
      <ModalDefault show={showModal} title="Are you sure?" onClose={toggleModal}>
        <p>
          You are about to delete your account. This actions is <strong>permanent</strong> and{' '}
          <strong>unrecoverable</strong>.
        </p>
        <div className="delete-user__btn">
          <Button onClick={handleDeleteAccount} color="sub_primary">
            Delete account
          </Button>
          <Button onClick={toggleModal}>Cancel</Button>
        </div>
      </ModalDefault>
    </div>
  );
};
