import { ArtMasonryRandom } from '../../components/ArtMasonry/ArtMasonryRandom';
import { CtaSection } from '../../components/Sections/CtaSection';
import { Hero } from '../../components/Sections/Hero';
import { ArtistSlider } from '../../components/ArtistSlider/ArtistSlider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [user, SetUser] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged( auth, (user) => {
      if (user) {
        SetUser(true);
      } else {
        SetUser(false);
      }
    });

    return () => unsubscribe();
  })

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
