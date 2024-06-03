import { ArtMasonryRandom } from '../../components/ArtMasonry/ArtMasonryRandom';
import { CtaSection } from '../../components/Sections/CtaSection';
import { Hero } from '../../components/Sections/Hero';
import { ArtistCarousel } from '../../components/ArtistCarousel/ArtistCarousel';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';

export const Home = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Hero />
      <ArtistCarousel />
      <ArtMasonryRandom />
      {!isLoggedIn && <CtaSection />}
    </>
  );
};
