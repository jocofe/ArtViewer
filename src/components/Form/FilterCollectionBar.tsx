import classNames from 'classnames';
import { SearchGlass } from '../Icons/icons';
import { useState } from 'react';
import { FilterCollectionBarProps } from '../../models/filters';

export const FilterCollectionBar = ({ placeholder, size, onSearch }: FilterCollectionBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filterCollectionBarClass = classNames('filtercollectionbar', `filtercollectionbar--${size}`);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <form className="filtercollectionbar-wrapper" onSubmit={e => e.preventDefault()}>
      <div className="filtercollectionbar__magnifying">
        <SearchGlass className="icon--absolute" />
      </div>
      <input
        className={filterCollectionBarClass}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
};
