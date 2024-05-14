import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import '../../styles/index.scss';
import { Button } from '../../components/Buttons/Buttons';
import { Logotype, IconLogotype, SearchGlass } from '../../components/Icons/icons';
import { TopBarProps } from '../../models/topbar';
import { SearchBar } from '../../components/Form/SearchBar';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContextProvider';
import { DropdownProfileButton } from '../../components/Buttons/DropdownProfile';

export const TopBar = (props: TopBarProps) => {
  const { isLoggedIn } = useContext(UserContext);
  const { size } = props;
  const topBarClass = classNames('topbar', `topbar--${size}`, {
    'topbar--login': isLoggedIn,
    'topbar--without-login': !isLoggedIn,
  });
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsCollapse(window.matchMedia('(max-width: 1100px)').matches);
    };

    checkWindowSize();

    const resizeListener = () => {
      checkWindowSize();
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <div className={topBarClass}>
      <div className="topbar__logo">
        <Link to={'/'}>{isCollapse ? <IconLogotype className="icon" /> : <Logotype className="logotype" />}</Link>
      </div>
      {!isCollapse && <SearchBar size="large" placeholder="Search..." />}
      {isCollapse && !isLoggedIn && (
        <div className="signup-wrapper">
          <Link to={'/search'}>
            <SearchGlass className="icon" />
          </Link>
          <Link to={'/signup'}>
            <Button onClick={() => {}}>Sign Up</Button>
          </Link>
        </div>
      )}
      {isCollapse && isLoggedIn && (
        <div className="profile-wrapper">
          <Link to={'/search'}>
            <SearchGlass className="icon" />
          </Link>
          <DropdownProfileButton />
        </div>
      )}
      {!isCollapse && !isLoggedIn && (
        <div className="signup-wrapper">
          <Link to={'/signup'}>
            <Button onClick={() => {}}>Sign Up</Button>
          </Link>
          <Link to={'/signin'}>
            <Button type="sub_primary" onClick={() => {}}>
              Sign In
            </Button>
          </Link>
        </div>
      )}
      {!isCollapse && isLoggedIn && (
        <div className="profile-wrapper">
          <DropdownProfileButton />
        </div>
      )}
    </div>
  );
};
