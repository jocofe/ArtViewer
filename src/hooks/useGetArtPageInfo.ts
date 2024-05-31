import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ArtArtistItem, ArtObjectDetails } from '../models/art-list';
import { mapArtApiToArtView } from '../utils/mapArtApiToArtView';
import { mapArtObjectApiToArtObject } from '../utils/mapArtObjectApiToArtObject';

export const useGetArtPageInfo = () => {
  const { artId } = useParams();
  const [artDetails, setArtDetails] = useState<ArtObjectDetails[]>([]);
  const [relatedArt, setRelatedArt] = useState<ArtArtistItem[]>([]);

  useEffect(() => {
    const getInforforArtPage = async () => {
      try {
        const apiURL = `https://api.vam.ac.uk/v1/museumobject/${artId}`;
        const response = await axios.get(apiURL);
        const mappedArtObject = mapArtObjectApiToArtObject(response.data);
        setArtDetails(mappedArtObject);

        if (mappedArtObject.length > 0) {
          const artistName = mappedArtObject[0]?.artist;
          const cleanedArtistName = artistName.replace(/[^\w\d]+/g, ',');

          if (artistName) {
            const artistApiUrl = `https://api.vam.ac.uk/v2/objects/search?q_actor=${cleanedArtistName}&images_exist=true`;
            const mapArtist = await axios.get(artistApiUrl);
            const relatedArtObjects = mapArtApiToArtView(mapArtist.data);
            setRelatedArt(relatedArtObjects);
          }
        }
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      }
    };

    if (artId) {
      getInforforArtPage();
    }
  }, [artId]);

  return { artDetails, relatedArt };
};
