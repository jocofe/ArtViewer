import { useCallback, useEffect, useState } from "react"
import { ResultListFromApi, ResultsListItem } from "../models/results-list"
import axios from "axios";
import { mapResultsFromApi } from "../utils/maps/mapResultsFromApi";

export const useSearchResults = (apiUrl: string) => {
    const [searchResults, setSearchResults] = useState<ResultsListItem[]>([]);
    const [loading, setLoading] = useState(false);
  
    const getResults = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.get<ResultListFromApi>(apiUrl);
        const mappedResults = mapResultsFromApi(response.data);
        setSearchResults(prevResults => [...prevResults, ...mappedResults]);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }, [apiUrl]);
  
    useEffect(() => {
      getResults();
    }, [getResults]);
  
    return { searchResults, setSearchResults, loading };
  };