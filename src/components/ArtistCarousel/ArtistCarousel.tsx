import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtistCard } from './ArtistCard';
import useArtistCarousel from '../../hooks/useArtistCarousel';

export const ArtistCarousel = () => {
  const { artists, error, isLoading } = useArtistCarousel();
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const speed = 0.25;
  const positionRef = useRef(0); // Ref para almacenar la posición

  let startX = 0;
  let currentX = 0;

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    currentX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX - currentX;

    if (diff > 50) {
      // Swipe right
      positionRef.current += 100;
    } else if (diff < -50) {
      // Swipe left
      positionRef.current -= 100;
    }

    if (positionRef.current < 0) {
      positionRef.current = 0;
    } else if (positionRef.current > trackRef.current!.scrollWidth - containerRef.current!.offsetWidth) {
      positionRef.current = trackRef.current!.scrollWidth - containerRef.current!.offsetWidth;
    }

    trackRef.current!.style.transform = `translateX(-${positionRef.current}px)`;
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        positionRef.current += speed;

        if (positionRef.current > trackRef.current!.scrollWidth - containerRef.current!.offsetWidth) {
          positionRef.current = 0;
        }

        trackRef.current!.style.transform = `translateX(-${positionRef.current}px)`;
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="carousel-container"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel__track" ref={trackRef}>
        {artists.map((artistItem, index) => (
          <Link key={index} to={`/artist/${artistItem.id}`}>
            <ArtistCard author={artistItem.author} imageId={artistItem.imageId} imageUrl={''} id={''} />
          </Link>
        ))}
      </div>
    </div>
  );
};
