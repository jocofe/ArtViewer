import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResultListFromApi, ResultsListItem } from '../models/results-list';
import { mapResultsFromApi } from '../utils/maps/mapResultsFromApi';

type ActiveFilter = 'author' | 'type' | 'technique' | 'location';

const apiUrlParams: Record<ActiveFilter, string> = {
  author: 'q_actor',
  type: 'q_object_type',
  technique: 'q_material_technique',
  location: 'q_place_name',
};

// Hook para obtener resultados de la API
export const useResults = (apiUrl: string) => {
  const [searchResults, setSearchResults] = useState<ResultsListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ResultListFromApi>(apiUrl);
        const mappedResults = mapResultsFromApi(response.data);
        setSearchResults(prevResults => [...prevResults, ...mappedResults]); // Concatenar nuevos resultados
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    if (apiUrl) {
      setSearchResults([]);
      getResults();
    }
  }, [apiUrl]);

  return { searchResults, loading, setSearchResults };
};

export const useFilters = (searchTerm: string) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter | null>(null);
  const [apiUrl, setApiUrl] = useState('');
  const [page, setPage] = useState(1);

  const { searchResults, loading, setSearchResults } = useResults(apiUrl);

  // Construct APiUrl call depending on searchTerm and filter selected
  useEffect(() => {
    const constructApiUrl = () => {
      let url = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&order_sort=asc&page=${page}&page_size=15&images_exist=true`;
      if (activeFilter) {
        url = `https://api.vam.ac.uk/v2/objects/search?${apiUrlParams[activeFilter]}=${searchTerm}&order_sort=asc&page=${page}&page_size=15&images_exist=true`;
      }
      setApiUrl(url);
    };
    constructApiUrl();
  }, [searchTerm, activeFilter, page]);

  const handleFilterClick = (filter: ActiveFilter) => {
    setActiveFilter(prevFilter => (prevFilter === filter ? null : filter));
    setPage(1); // Reiniciar la página cuando se cambia el filtro
    setSearchResults([]); // Limpiar resultados cuando se cambia el filtro
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  return { searchResults, loading, handleFilterClick, activeFilter, handleLoadMore };
};
