import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import { ResultItem, ResultListFromApi, ResultsListItem } from '../../models/results-list';
import { FilterTag } from '../../components/Filters/FilterTag';
import axios from 'axios';
import { useFilters } from '../../hooks/useFilters';

const mapResultsFromApi = (result: ResultListFromApi): ResultsListItem[] => {
  return result.records.map((resultItem: ResultItem) => {
    return {
      title: resultItem._primaryTitle,
      id: resultItem.systemNumber,
      author: resultItem._primaryMaker.name,
      date: resultItem._primaryDate,
      location: resultItem._primaryPlace,
      imageId: resultItem._primaryImageId,
    };
  });
};

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [searchResults, setSearchResults] = useState<ResultsListItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { apiUrl, handleFilterClick, activeFilter } = useFilters(searchTerm);

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      const response = await axios.get<ResultListFromApi>(apiUrl);
      const mappedResults = mapResultsFromApi(response.data);
      setSearchResults(mappedResults);
      setLoading(false);
    };
    getResults();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='masonry-section'>
      <h2 className='masonry__title'>{searchTerm}</h2>

      <div className='filters'>
        <FilterTag
          className={`filter ${activeFilter === 'author' ? 'active' : ''}`}
          type='author'
          onClick={() => handleFilterClick('author')}
        >
          Artist
        </FilterTag>
        <FilterTag
          className={`filter ${activeFilter === 'type' ? 'active' : ''}`}
          type='type'
          onClick={() => handleFilterClick('type')}
        >
          Type
        </FilterTag>
        <FilterTag
          className={`filter ${activeFilter === 'technique' ? 'active' : ''}`}
          type='technique'
          onClick={() => handleFilterClick('technique')}
        >
          Technique
        </FilterTag>
        <FilterTag
          className={`filter ${activeFilter === 'location' ? 'active' : ''}`}
          type='location'
          onClick={() => handleFilterClick('location')}
        >
          Location
        </FilterTag>
      </div>

      {searchResults && searchResults.length > 0? (
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2, 1200: 3, 1920: 4,}}>
        <Masonry className='masonry__columns' gutter='32px'>
          {searchResults.map((result) => (
            <Link key={result.id} to={`/artwork/${result.id}`}>
              <ArtCard
                title={result.title}
                author={result.author}
                date={result.date}
                imageId={result.imageId}
              />
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    ) : (
      <div className='no-results'>
        <h3>Sorry, no results found</h3>
        <p>Try searching for something else?</p>
      </div>
    )}
  </div>
)}
