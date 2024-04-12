import classNames from 'classnames';
import "../../styles/index.scss";
import { SearchBarProps } from '../../models/searchbar'
import { SearchGlass } from "../Icons/icons";

export const SearchBar = (props: SearchBarProps) => {

  const {size, placeholder} = props;

  const searchBarClass = classNames(
    'searchbar',
    `searchbar--${size}`,
  );

  return (
    <form className='searchbar-wrapper'>
      < SearchGlass className='icon--absolute'/>
      <input className={searchBarClass} placeholder={placeholder} />
    </form>
  );
};

