import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useContext, useRef } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import { FilterTag } from '../../components/Filters/FilterTag';
import { SearchBar } from '../../components/Form/SearchBar';
import { useFilters } from '../../hooks/useFilters';
import { Button } from '../../components/Buttons/Buttons';
import { CtaSection } from '../../components/Sections/CtaSection';
import { UserContext } from '../../context/UserContextProvider';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const { searchResults, loading, handleFilterClick, activeFilter, handleLoadMore } = useFilters(searchTerm);
  const { isLoggedIn } = useContext(UserContext);


  if (loading && searchResults.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="masonry-section">
      {searchTerm.trim() === '' ? (
        <h2 className="masonry__title">Try to search something</h2>
      ) : (
        <h2 className="masonry__title">{searchTerm}</h2>
      )}
      <div className="searchbar-mobile">
        <SearchBar size="small" placeholder="Search for art..." />
      </div>
      <div className="filters-container">
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
      </div>

      {searchResults && searchResults.length > 0 ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {searchResults.map(result => (
              <div className="relative" key={result.id}>
                <ArtCard
                  key={`art-item-${result.id}`}
                  title={result.title}
                  imageId={result.imageId}
                  author={result.author}
                  date={result.date}
                  id={result.id}
                />
                <Link className="expanded-anchor" to={`/art-piece/${result.id}`} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        !loading && (
          <div className="no-results">
            <h3>Sorry, no results found</h3>
            <p>Try searching for something else?</p>
          </div>
        )
      )}
      {isLoggedIn && searchResults.length > 0 && (
        <div className="masonry__button">
          <Button  onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <div className="masonry__button">
            <Button color="sub_primary" component={NavLink} to="/signup" className="btn-link--black">
              Sign Up to continue
            </Button>
          </div>
          <CtaSection />
        </div>
      )}
      {loading && <div>Loading more results...</div>}
    </div>
  );
};
