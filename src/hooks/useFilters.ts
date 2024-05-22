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

  useEffect(() => {
    const constructApiUrl = () => {
      let url = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&images_exist=true`;
      if (activeFilter) {
        url = `https://api.vam.ac.uk/v2/objects/search?${apiUrlParams[activeFilter]}=${searchTerm}&images_exist=true`;
      }
      setApiUrl(url);
    };
    constructApiUrl();
  }, [searchTerm, activeFilter]);

  const handleFilterClick = (filter: ActiveFilter) => {
    setActiveFilter(prevFilter => (prevFilter === filter ? null : filter));
  };

  return { apiUrl, handleFilterClick, activeFilter };
};
