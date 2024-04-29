import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArtListItemFromApi } from '../../models/art-list';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';


export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  const [searchResults, setSearchResults] = useState<ArtListItemFromApi | null>(null);

  useEffect(() => {
    const results = localStorage.getItem('searchResults');
    if (results) {
      setSearchResults(JSON.parse(results));
    }

    console.log('test de re-renderizado')
  }, [searchTerm]);

  if (searchResults && searchResults.records && searchResults.records.length > 0) {
    return (
      <div className='masonry-section'>
        <h2 className='masonry__title'>Reuslts for {searchTerm}</h2>
        <div className='masonry-wrapper'>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2, 1200: 3, 1920: 4,}}>
            <Masonry className='masonry__columns' gutter='32px'>
            {searchResults.records.map((result) => (
              <Link key={result.systemNumber} to={`/art-piece/${result.systemNumber}`}>
              <ArtCard
              key={result.systemNumber}
              title={result._primaryTitle}
              imageId={result._primaryImageId}
              author={result._primaryMaker.name}
              date={result._primaryDate}
              />
              </Link>
            ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Sorry, no search results found</h2>
      </div>
    );
  }
}
