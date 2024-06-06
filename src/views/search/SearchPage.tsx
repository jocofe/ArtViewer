import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import { FilterTag } from '../../components/Filters/FilterTag';
import { Button } from '../../components/Buttons/Buttons';
import { ActiveFilter, useApiUrl } from '../../hooks/useApiUrl';
import { useSearchResults } from '../../hooks/useSearchResults';
import { UserContext } from '../../context/UserContextProvider';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter | null>(null);
  const [page, setPage] = useState(1);
  const { userData } = useContext(UserContext);

  const searchTerm = searchParams.get('search') || '';

  const apiUrl = useApiUrl(searchTerm, activeFilter, page);
  const { searchResults, setSearchResults, loading } = useSearchResults(apiUrl);

  const handleFilterClick = (filter: ActiveFilter) => {
    setActiveFilter(prevFilter => (prevFilter === filter ? null : filter));
    setPage(1); // Reset the page when the filter changes
    setSearchResults([]); // Clear previous results when the filter changes
  };

  const handleLoadMore: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="masonry-section">
      {searchTerm.trim() === '' ? (
        <h2 className="masonry__title">Try to search something</h2>
      ) : (
        <h2 className="masonry__title">{searchTerm}</h2>
      )}

      <div className="filters">
        <FilterTag
          className={`filter ${activeFilter === 'author' ? 'active' : ''}`}
          type="author"
          onClick={() => handleFilterClick('author')}
        >
          Artist
        </FilterTag>
        <FilterTag
          className={`filter ${activeFilter === 'type' ? 'active' : ''}`}
          type="type"
          onClick={() => handleFilterClick('type')}
        >
          Type
        </FilterTag>
        <FilterTag
          className={`filter ${activeFilter === 'technique' ? 'active' : ''}`}
          type="technique"
          onClick={() => handleFilterClick('technique')}
        >
          Technique
        </FilterTag>
        <FilterTag
          className={`filter ${activeFilter === 'location' ? 'active' : ''}`}
          type="location"
          onClick={() => handleFilterClick('location')}
        >
          Location
        </FilterTag>
      </div>

      {searchResults && searchResults.length > 0 ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {searchResults.map(result => (
              <Link key={result.id} to={`/art-piece/${result.id}`}>
                <ArtCard
                  key={`art-item-${result.id}`}
                  title={result.title}
                  author={result.author}
                  date={result.date}
                  imageId={result.imageId}
                  id={result.id}
                />
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="no-results">
          <h3>Sorry, no results found</h3>
          <p>Try searching for something else?</p>
        </div>
      )}
      <div className='masonry__button'>
      {userData && (
        <Button type='button' onClick={handleLoadMore}>Load More</Button>
      )}
      {!userData && (
        <Button color="sub_primary" component={NavLink} to="/signup" className="btn-link--black">
          Sign Up to continue
        </Button>
      )}
      </div>
    </div>
  );
};
