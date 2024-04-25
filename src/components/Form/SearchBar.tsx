import classNames from 'classnames';
import "../../styles/index.scss";
import { SearchBarProps } from '../../models/searchbar'
import { SearchGlass } from "../Icons/icons";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = (props: SearchBarProps) => {

  const {size, placeholder} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const searchBarClass = classNames(
    'searchbar',
    `searchbar--${size}`,
  );

  return (
    <form className='searchbar-wrapper' 
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/search/?search=${searchTerm}`)
      }}
    >
      < SearchGlass className='icon--absolute' />
      <input 
        className={searchBarClass} 
        placeholder={placeholder} 
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
    </form>
  );
};

