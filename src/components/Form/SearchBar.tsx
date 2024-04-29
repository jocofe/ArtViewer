import classNames from 'classnames';
import "../../styles/index.scss";
import { SearchBarProps } from '../../models/searchbar'
import { SearchGlass } from "../Icons/icons";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar = (props: SearchBarProps) => {

  const {size, placeholder} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const searchBarClass = classNames(
    'searchbar',
    `searchbar--${size}`,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Avoid empty input to search
    if (searchTerm.trim() === '') { 
      return;
    }
    navigate(`/search/=${searchTerm}`);

    try {
      const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&images_exist=true`);
      const data = await response.json();
      localStorage.setItem('searchResults', JSON.stringify(data));

      // Check if term and data are updated each time
      console.log('Termino:', searchTerm); 
      console.log('Resultado:', data); 
    } catch(error) {
      console.error('Error fetching search results', error);
    }
    searchParams;
    setSearchParams({ search: searchTerm });
    };

  return (
    <form className='searchbar-wrapper' onSubmit={handleSubmit}>
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

