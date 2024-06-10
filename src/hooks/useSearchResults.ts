import { useCallback, useEffect, useState } from "react"
import { ResultListFromApi, ResultsListItem } from "../models/results-list"
import axios from "axios";
import { mapResultsFromApi } from "../utils/maps/mapResultsFromApi";
import { useClearsMessage } from "./useClearMessage";

export const useSearchResults = (apiUrl: string) => {
    const [searchResults, setSearchResults] = useState<ResultsListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { error, setError } = useClearsMessage();
  
    const getResults = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.get<ResultListFromApi>(apiUrl);
        const mappedResults = mapResultsFromApi(response.data);
        setSearchResults(prevResults => apiUrl.includes("&page=1&") ? mappedResults : [...prevResults, ...mappedResults]);      
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }, [apiUrl]);
  
    useEffect(() => {
      getResults();
    }, [getResults]);

    if (error) return (error);
  
    return { searchResults, setSearchResults, loading };
  };