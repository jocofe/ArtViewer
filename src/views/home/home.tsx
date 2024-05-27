import { ArtMasonryRandom } from '../../components/ArtMasonry/ArtMasonryRandom';
import { CtaSection } from '../../components/Sections/CtaSection';
import { Hero } from '../../components/Sections/Hero';
import { ArtistSlider } from '../../components/ArtistSlider/ArtistSlider';
import { useUserAuth } from '../../hooks/useUserAuth';

export const Home = () => {
const { user } = useUserAuth();

  return (
    <>
      <Hero />
      <ArtistSlider />
      <ArtMasonryRandom />
      {!user && (
        <CtaSection />
      )}
    </>
  );
};
