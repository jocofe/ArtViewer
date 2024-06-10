import { useContext, useEffect } from 'react';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../Buttons/Buttons';
import { UserContext } from '../../context/UserContextProvider';
import { useFetchArt } from '../../hooks/useFetchRandomArt';

export const ArtMasonryRandom = () => {
  const { artList, isLoading, error, loadMore } = useFetchArt(1);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (artList.length > 0) {
      const lastArtItem = document.getElementById(`art-item-${artList.length - 1}.id`);
      if (lastArtItem) {
        lastArtItem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [artList]);

  return (
    <div className="masonry-section">
      <h2 className="masonry__title">Explore some art</h2>
      <div className="masonry-wrapper">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {artList.map(artItem => (
              <div className="relative" key={artItem.id}>
                <ArtCard
                  title={artItem.title}
                  imageId={artItem.imageId}
                  author={artItem.author}
                  date={artItem.date}
                  id={artItem.id}
                />
                <Link className="expanded-anchor" to={`/art-piece/${artItem.id}`} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <div className="masonry__button">
          {isLoggedIn ? (
            <Button color="sub_primary" onClick={loadMore} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          ) : (
            <Button color="sub_primary" component={NavLink} to="/signup" className="btn-link--black">
              Sign Up to continue
            </Button>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};
