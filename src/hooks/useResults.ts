import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResultListFromApi, ResultsListItem } from '../models/results-list';
import { mapResultsFromApi } from '../utils/maps/mapResultsFromApi';

export const useResults = (apiUrl: string) => {
  const [searchResults, setSearchResults] = useState<ResultsListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ResultListFromApi>(apiUrl);
        const mappedResults = mapResultsFromApi(response.data);
        setSearchResults(mappedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    if (apiUrl) {
      getResults();
    }
  }, [apiUrl]);

  return { searchResults, loading };
};
