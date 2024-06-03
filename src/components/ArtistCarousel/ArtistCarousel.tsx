import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArtistCard } from './ArtistCard';
import { useFetchArtists } from '../../hooks/useFetchArtist';

export const ArtistCarousel = () => {
  const { artist, error, isLoading } = useFetchArtists(1, 10);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    let animationFrameId: number;

    const scroll = () => {
      if (track && track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      } else if (track) {
        track.scrollLeft += 1;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const clonedArtists = [...artist, ...artist];

  return (
    <div className="carousel-container" ref={trackRef}>
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
