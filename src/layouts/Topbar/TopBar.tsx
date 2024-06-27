import { useContext } from 'react';
import classNames from 'classnames';
import '../../styles/index.scss';
import { Button } from '../../components/Buttons/Buttons';
import { Logotype, IconLogotype } from '../../components/Icons/icons';
import { TopBarProps } from '../../models/topbar';
import { SearchBar } from '../../components/Form/SearchBar';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContextProvider';
import { DropdownProfileButton } from '../../components/Buttons/DropdownProfile';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const TopBar = (props: TopBarProps) => {
  const { isLoggedIn } = useContext(UserContext);
  const { size } = props;
  const topBarClass = classNames('topbar', `topbar--${size}`, {
    'topbar--login': isLoggedIn,
    'topbar--without-login': !isLoggedIn,
  });

  const isCollapse = useMediaQuery('(max-width: 1100px)');

  return (
    <div className={topBarClass}>
      <div className="topbar__logo">
        <Link to={'/'}>{isCollapse ? <IconLogotype className="icon" /> : <Logotype className="logotype" />}</Link>
      </div>
      {!isCollapse && <SearchBar size="large" placeholder="Search..." />}
      {isCollapse && !isLoggedIn && (
        <>
          <SearchBar size="small" placeholder="Search..." />
          <Link to={'/signup'}>
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
      {isCollapse && isLoggedIn && (
        <>
          <SearchBar size="small" placeholder="Search..." />
          <DropdownProfileButton />
        </>
      )}
      {!isCollapse && !isLoggedIn && (
        <>
          <Link to={'/signup'}>
            <Button>Sign Up</Button>
          </Link>
          <Link to={'/signin'}>
            <Button color="sub_primary">Sign In</Button>
          </Link>
        </>
      )}
      {!isCollapse && isLoggedIn && (
        <div className="profile-wrapper">
          <DropdownProfileButton />
        </div>
      )}
    </div>
  );
};
