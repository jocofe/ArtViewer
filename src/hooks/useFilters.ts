import { useState, useEffect } from 'react';

type ActiveFilter = 'author' | 'type' | 'technique' | 'location';

const apiUrlParams: Record<ActiveFilter, string> = {
  author: 'q_actor',
  type: 'q_object_type',
  technique: 'q_material_technique',
  location: 'q_place_name',
};

export const useFilters = (searchTerm: string) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter | null>(null);
  const [apiUrl, setApiUrl] = useState('');
  const [page, setPage] = useState(15);

  useEffect(() => {
    const constructApiUrl = () => {
      let url = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&order_sort=asc&page=1&page_size=${page}&images_exist=true`;
      if (activeFilter) {
        url = `https://api.vam.ac.uk/v2/objects/search?${apiUrlParams[activeFilter]}=${searchTerm}&order_sort=asc&page=1&page_size=${page}&images_exist=true`;
      }
      setApiUrl(url);
    };
    constructApiUrl();
  }, [searchTerm, activeFilter, page]);

  const handleFilterClick = (filter: ActiveFilter) => {
    setActiveFilter(prevFilter => (prevFilter === filter ? null : filter));
  };

  const handleLoadMore = () => {
    setPage(page * 2);
  }

  return { apiUrl, handleFilterClick, activeFilter, handleLoadMore };
};