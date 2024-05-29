import classNames from 'classnames';
import { SearchBarProps } from '../../models/searchbar';
import { SearchGlass } from '../Icons/icons';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar = (props: SearchBarProps) => {
  const { size, placeholder } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchBarClass = classNames('searchbar', `searchbar--${size}`);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  const handleIconClick = () => {
    handleSearch();
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      navigate('/search');
    } else {
      navigate(`/search/?query=${searchTerm}`);
      searchParams;
      setSearchParams({ search: searchTerm });
    }
  };

  return (
    <form className="searchbar-wrapper" onSubmit={handleSubmit}>
      <input
        className={searchBarClass}
        placeholder={placeholder}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <SearchGlass onClick={handleIconClick} className="icon--absolute" />
    </form>
  );
};
