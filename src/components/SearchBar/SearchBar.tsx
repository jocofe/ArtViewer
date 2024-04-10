import classNames from 'classnames';
import "../../styles/index.scss";
import { SearchBarProps } from '../../models/searchbar'
import { SearchGlass } from "../Icons/icons";

export const SearchBar = ({size}: SearchBarProps, {placeholder}: SearchBarProps) => {

  const searchBarClass = classNames(
    'searchbar',
    `topbar--${size}`
  );

  return (
    <div>
        <input className={searchBarClass} placeholder={placeholder} />
        < SearchGlass className='icon'/>
    </div>
  );
};

