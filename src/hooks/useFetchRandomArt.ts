import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArtItem, ArtListItem, ArtListItemFromApi } from '../models/art-list';

const mapArtApiToArtView = (art: ArtListItemFromApi): ArtListItem[] => {
  return art.records.map((artItem: ArtItem) => {
    return {
      title: artItem._primaryTitle,
      imageUrlThumbnail: artItem._images._primary_thumbnail,
      imageUrlBase: artItem._images._iiif_image_base_url,
      id: artItem.systemNumber,
      author: artItem._primaryMaker.name,
      date: artItem._primaryDate,
      location: artItem._primaryPlace,
      imageId: artItem._primaryImageId,
    };
  });
};

export const useFetchArt = (initialPage: number) => {
  const [artList, setArtList] = useState<ArtListItem[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArt = async () => {
      setIsLoading(true);
      try {
        const apiURL = `https://api.vam.ac.uk/v2/objects/search?q_object_type=drawing&order_sort=asc&page=${page}&page_size=15&images_exist=true`;
        const response = await axios.get<ArtListItemFromApi>(apiURL);
        const mappedArtList = mapArtApiToArtView(response.data);
        setArtList(prevArtList => [...prevArtList, ...mappedArtList]);
      } catch (err) {
        setError('Failed to fetch art data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArt();
  }, [page]);

  const loadMore = () => setPage(prevPage => prevPage + 1);

  return { artList, isLoading, error, loadMore };
};
