import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import axios from 'axios';
import { ResultItem, ResultListFromApi, ResultsListItem } from '../../models/results-list';


const mapResultsFromApi = (result: ResultListFromApi): ResultsListItem[] => {
  return result.records.map((resultItem: ResultItem) => {
      return {
      title: resultItem._primaryTitle,
      id: resultItem.systemNumber,
      author:resultItem._primaryMaker.name,
      date: resultItem._primaryDate,
      location: resultItem._primaryPlace,
      imageId: resultItem._primaryImageId,
      };
  });
  };

export const SearchPage = () => {

  const [ searchParams ] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const [searchResults, setSearchResults] = useState<ResultsListItem[] | null>(null);
  


  useEffect(() => {
    const getResults = async () => {
        const apiURL = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&images_exist=true`;
        const response = await axios.get<ResultListFromApi>(apiURL);
        const mappedResults = mapResultsFromApi(response.data)
        setSearchResults(mappedResults);

    // Check if term and data are updated each time
      console.log('Search Term:', searchTerm); 
      console.log('Results:', searchResults);
    }; 
  
    getResults();
  }, [searchTerm]);


  if (searchResults && searchResults.length > 0) {
    return (
      <div className='masonry-section'>
        <h2 className='masonry__title'>{searchTerm}</h2>
        <div className='masonry-wrapper'>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2, 1200: 3, 1920: 4,}}>
            <Masonry className='masonry__columns' gutter='32px'>
            {searchResults.map((resultItem: ResultsListItem) => (
              <Link key={resultItem.id} to={`/art-piece/${resultItem.id}`}>
              <ArtCard
              key={resultItem.id}
              title={resultItem.title}
              imageId={resultItem.imageId}
              author={resultItem.author}
              date={resultItem.date}
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
        <h2 className='masonry__title'>We're sorry, no results were found for your search</h2>
      </div>
    );
  }
}
