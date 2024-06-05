import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { Button } from '../Buttons/Buttons';
import { ArrowDown } from '../Icons/icons';
import { useSelectedLink, useToggleModal } from '../../hooks/useSettingsList';
import { handleDeleteAccount } from '../../hooks/useDeleteAccount';
import { useDropdownSettings } from '../../hooks/useDropdownSettings';

export const SettingsListMobile = () => {
  const { userData } = useContext(UserContext);
  const { selectedLink } = useSelectedLink();
  const { showModal, toggleModal } = useToggleModal();
  const { handleClickMenu, dropdownOpen, menuRef } = useDropdownSettings();

  return (
    <div className="user-mobile">
      <button onClick={handleClickMenu} className="dropdown-btn-settings">
        <div>{selectedLink}</div>
        <div><ArrowDown/></div>
      </button>
      {dropdownOpen && (
        <ul ref={menuRef} className="menu-list-mobile">
          <li className="menu-list-mobile__item">
            <Link
              to={`general`}
              className={selectedLink === 'General' ? 'active' : ''}
              onClick={handleClickMenu}
            >
              General
            </Link>
          </li>
          <li className="menu-list-mobile__item">
            <Link
              to={`profile`}
              className={selectedLink === 'Profile' ? 'active' : ''}
              onClick={handleClickMenu}
            >
              Profile
            </Link>
          </li>
          {userData?.provider !== 'google' && (
            <li className="menu-list-mobile__item">
              <Link
                to={`password`}
                className={selectedLink === 'Password' ? 'active' : ''}
                onClick={handleClickMenu}
              >
                Password
              </Link>
            </li>
          )}
          <li className="menu-list-mobile__item">
            <Link
              to={`sessions`}
              className={selectedLink === 'Sessions' ? 'active' : ''}
              onClick={handleClickMenu}
            >
              Sessions
            </Link>
          </li>
        </ul>
      )}
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
