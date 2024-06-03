import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArtistCard } from './ArtistCard';
import useArtistCarousel from '../../hooks/useArtistCarousel';

export const ArtistCarousel = () => {
  const { artists, error, isLoading } = useArtistCarousel();
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const speed = 0.1; // Velocidad del desplazamiento
  let position = 0;
  let isPaused = false;

  const handleMouseEnter = () => {
    isPaused = true;
    cancelAnimationFrame(animationRef.current!);
    animationRef.current = null;
  };

  const handleMouseLeave = () => {
    isPaused = false;
    animateScroll();
  };

  const animateScroll = () => {
    const track = trackRef.current;
    const container = containerRef.current;

    if (!track || !container || isPaused) return;

    position += speed;

    if (position >= track.scrollWidth - container.offsetWidth) {
      position = 0;
      const firstElement = track.children[0] as HTMLElement;
      track.appendChild(firstElement.cloneNode(true));
      track.removeChild(firstElement);
    }

    track.style.transform = `translateX(-${position}px)`;

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  // Llamar a animateScroll aquí para iniciar el bucle de animación
  animateScroll();

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
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
          <Link key={index} to={`/artist/${artistItem.id}`}>
            <ArtistCard author={artistItem.author} imageId={artistItem.imageId} imageUrl={''} id={''} />
          </Link>
        ))}
      </div>
    </div>
  );
};
