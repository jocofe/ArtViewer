import classNames from 'classnames';
import "../../styles/index.scss";
import { Button } from "../../components/Buttons/Buttons";
import { Logotype, Menu } from "../../components/Icons/icons";
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

  return (
    <div className={topBarClass}>
        <div className="topbar__logo">
          <IconButton size='medium' position='default' icon= {<Menu className='icon'/>} onClick={() => (console.log('clicked'))} />
            <Logotype className='icon' />
        </div>
        <SearchBar size='large' placeholder='Search...'/>
        <Button label='Log In' size='small' type='sub_primary' />
        <Button label='Sign Up' size='small' type='primary' />
    </div>
  );
};
