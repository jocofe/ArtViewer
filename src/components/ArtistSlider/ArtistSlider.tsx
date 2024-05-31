import { Link } from 'react-router-dom';
import { ArtistCard } from './ArtistCard';
import { useFetchArtists } from '../../hooks/useFetchArtist';

export const ArtistSlider = () => {
  const { artist, error, isLoading } = useFetchArtists(1, 10);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="slider">
      {artist.map(artistItem => (
        <Link key={artistItem.id} to={`/art-piece/${artistItem.id}`}>
          <ArtistCard author={artistItem.author} imageId={artistItem.imageId} />
        </Link>
      ))}
    </div>
  );
};
