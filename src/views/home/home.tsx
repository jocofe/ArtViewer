import { ArtMasonryRandom } from '../../components/ArtMasonry/ArtMasonryRandom';
import { CtaSection } from '../../components/Sections/CtaSection';
import { Hero } from '../../components/Sections/Hero';
import { ArtistSlider } from '../../components/ArtistSlider/ArtistSlider';

export const Home = () => {
  return (
    <>
      <Hero />
      <ArtistSlider />
      <ArtMasonryRandom />
      <CtaSection />
    </>
  );
};
