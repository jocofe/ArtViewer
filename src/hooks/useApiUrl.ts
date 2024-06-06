import { useState, useEffect } from "react";

export type ActiveFilter = 'author' | 'type' | 'technique' | 'location';

const apiUrlParams: Record<ActiveFilter, string> = {
  author: 'q_actor',
  type: 'q_object_type',
  technique: 'q_material_technique',
  location: 'q_place_name',
};

export const useApiUrl = (searchTerm: string, activeFilter: ActiveFilter | null, page: number) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    let apiUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&order_sort=asc&page=${page}&page_size=15&images_exist=true`;
    if (activeFilter) {
      apiUrl = `https://api.vam.ac.uk/v2/objects/search?${apiUrlParams[activeFilter]}=${searchTerm}&order_sort=asc&page=${page}&page_size=15&images_exist=true`;
    }
    setUrl(apiUrl);
  }, [searchTerm, activeFilter, page]);

  return url;
};