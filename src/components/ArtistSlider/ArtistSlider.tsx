import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistItem, ArtistSliderItem, ArtistSliderItemFromApi } from '../../models/artist-slider';
import { ArtistCard } from './ArtistCard';
import { formatAuthorName } from '../../utils/format-author-name';
import { Link } from 'react-router-dom';

export const mapArtistApitoSlider = (artist: ArtistSliderItemFromApi): ArtistSliderItem[] => {
  const arrayMapping: Record<string, boolean> = {};
  const uniqueArtists: ArtistSliderItem[] = [];

  // Avoid duplicated artist
  artist.records.forEach((artistItem: ArtistItem) => {
    // Fixing author format from 'Lastname, Name' => 'Name Lastname'
    const author = formatAuthorName(artistItem._primaryMaker.name);

    if (!arrayMapping[author]) {
      arrayMapping[author] = true;
      uniqueArtists.push({
        slider_id: uniqueArtists.length + 1,
        author: author,
        imageId: artistItem._primaryImageId,
        id: artistItem.systemNumber,
      });
    }
  });

  return uniqueArtists;
};

export const ArtistSlider = () => {
  const [artist, setArtist] = useState<ArtistSliderItem[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const apiURL = `https://api.vam.ac.uk/v2/objects/search?order_sort=asc&page=1&page_size=10&images_exist=true`;

      try {
        const response = await axios.get<ArtistSliderItemFromApi>(apiURL);
        const mappedArtist = mapArtistApitoSlider(response.data);

        setArtist(mappedArtist);
        console.log(mappedArtist);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchArtist();
  }, []);

  return (
    <div className="slider">
      {artist.map((artistItem: ArtistSliderItem) => (
        <Link key={artistItem.id} to={`/art-piece/${artistItem.id}`}>
          <ArtistCard author={artistItem.author} imageId={artistItem.imageId} />
        </Link>
      ))}
      {artist.map((artistItem: ArtistSliderItem) => (
        <Link key={artistItem.id} to={`/art-piece/${artistItem.id}`}>
          <ArtistCard author={artistItem.author} imageId={artistItem.imageId} />
        </Link>
      ))}
    </div>
  );
};
