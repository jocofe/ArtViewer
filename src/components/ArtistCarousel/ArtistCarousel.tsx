import { Link } from 'react-router-dom';
import { ArtistCard } from './ArtistCard';
import { useFetchArtists } from '../../hooks/useFetchArtist';

export const ArtistCarousel = () => {
  const { artist, error, isLoading } = useFetchArtists(1, 10);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const clonedArtists = [...artist, ...artist];

  return (
    <div className="carousel-container">
      <div className="carousel__track">
        {clonedArtists.map((artistItem, index) => (
          <Link key={index} to={`/art-piece/${artistItem.id}`}>
            <ArtistCard author={artistItem.author} imageId={artistItem.imageId} />
          </Link>
        ))}
      </div>
    </div>
  );
};
