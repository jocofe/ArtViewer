import classNames from 'classnames';
import "../../styles/index.scss";
import { SearchBarProps } from '../../models/searchbar'
import { SearchGlass } from "../Icons/icons";
import { useState } from 'react';

export const SearchBar = (props: SearchBarProps) => {

  const {size, placeholder} = props;

  //Search Term
  const [searchTerm, setSearchTerm] = useState('');


  const searchBarClass = classNames(
    'searchbar',
    `searchbar--${size}`,
  );

  //Submit search and API call
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&images_exist=true`)
      .then(response => response.json())
      .then(data => console.log(data.records))
      .catch(error => console.log(error));
  };

  return (
    <form className='searchbar-wrapper' onSubmit={handleSubmit}>
      < SearchGlass className='icon--absolute'/>
      <input 
        className={searchBarClass} 
        placeholder={placeholder} 
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
    </form>
  );
};

