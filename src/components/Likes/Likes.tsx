import { getAuth } from 'firebase/auth';
import Masonry from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import { ArtCard } from '../ArtCard/ArtCard';
import { ResponsiveMasonry } from 'react-responsive-masonry';
import { useFavourites } from '../../hooks/useFavourites';
import { useArtFavouritePieces } from '../../hooks/useArtFavouritePieces';

export const Likes = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail = user ? user.email : null;
  const favourites = useFavourites(userEmail);
  const artPieces = useArtFavouritePieces(favourites);

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
        <Masonry className="masonry__columns" gutter="32px">
          {artPieces.map((artPiece, index) => (
            <Link key={index} to={`/art-piece/${artPiece.systemNumber}`}>
              <ArtCard
                title={artPiece._primaryTitle}
                imageId={artPiece._primaryImageId}
                author={artPiece._primaryMaker}
                date={artPiece._primaryDate}
                id={artPiece.systemNumber}
              />
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
