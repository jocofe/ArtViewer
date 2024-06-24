import { useEffect, useRef, useState, useCallback } from 'react';
import { ArtistCard } from './ArtistCard';
import useArtistCarousel from '../../hooks/useArtistCarousel';
import { Loading } from '../Icons/icons';

export const ArtistCarousel = () => {
  const { artists, error, isLoading } = useArtistCarousel();
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const speed = 0.25;
  const positionRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    animateScroll();
  };

  const animateScroll = useCallback(() => {
    if (!trackRef.current || !containerRef.current) return;

    positionRef.current += speed;

    if (positionRef.current >= trackRef.current.scrollWidth / 2) {
      positionRef.current = 0;
    }

    trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;

    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animateScroll);
    }
  }, [isPaused]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateScroll]);

  if (isLoading) {
    return (
      <div className="loading">
        <Loading className="loading-animation loading-md" />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div
      className="carousel-container"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel__track" ref={trackRef}>
        {artists.map((artistItem, index) => (
          <ArtistCard key={index} author={artistItem.author} imageId={artistItem.imageId} imageUrl={''} id={''} />
        ))}
        {artists.map((artistItem, index) => (
          <ArtistCard
            key={`clone-${index}`}
            author={artistItem.author}
            imageId={artistItem.imageId}
            imageUrl={''}
            id={''}
          />
        ))}
      </div>
    </div>
  );
};
