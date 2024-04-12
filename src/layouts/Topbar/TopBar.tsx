import { useState, useEffect } from 'react';
import classNames from 'classnames';
import "../../styles/index.scss";
import { Button } from "../../components/Buttons/Buttons";
import { Logotype, Menu, IconLogotype } from "../../components/Icons/icons";
import { IconButton } from "../../components/Buttons/IconButton";
import { TopBarProps } from "../../models/topbar";
import { SearchBar } from '../../components/Form/SearchBar';

export const TopBar = (props: TopBarProps) => {

  const {size, type} = props;

  const topBarClass = classNames(
    'topbar',
    `topbar--${size}`,
    `topbar--${type}`
  );
 
  const [isCollapse, setIsCollapse] = useState (false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsCollapse(window.matchMedia("(max-width: 1100px)").matches);
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

  if (isCollapse) {
    return (
      <div className={topBarClass}>
        <div className="topbar__logo">
          <IconButton size='medium' position='default' icon= {<Menu className='icon'/>} onClick={() => (console.log('clicked'))} />
            <IconLogotype className='icon-logotype' />
        </div>
        <div className='signup-wrapper'>
          <Button label='Sign Up' size='medium' type='primary' />
        </div>
    </div>
    );
  } return (
    <div className={topBarClass}>
        <div className="topbar__logo">
          <IconButton size='medium' position='default' icon= {<Menu className='icon'/>} onClick={() => (console.log('clicked'))} />
            <Logotype className='logotype' />
        </div>
        <SearchBar size='large' placeholder='Search...'/>
        <div className='signup-wrapper'>
          <Button label='Log In' size='medium' type='sub_primary' />
          <Button label='Sign Up' size='medium' type='primary' />
        </div>
    </div>
  );
};
