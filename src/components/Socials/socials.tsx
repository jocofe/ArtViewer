import 'firebase/firestore';
import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState } from 'react';
import { useLikes } from '../Likes/LikesContext';

interface SocialProps {
  artPieceId: string;
}

export const Socials = ({ artPieceId }: SocialProps) => {
  const [isSaved, setIsSaved] = useState(false);

  // useLikes from LikesContext.tsx
  const { favourites, toggleLike } = useLikes();
  const isFavourite = favourites.some(fav => fav.artPieceId === artPieceId);


  const handleSaved = (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    setIsSaved(!isSaved);
  };

  const handleFav = async (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    toggleLike(artPieceId);
  };

  return (
    <>
      <div className="socials-wrapper">
        <i>
          <CopyLink className="icon" />
        </i>
        <i onClick={handleSaved}>{isSaved ? <FullBookmark className="icon" /> : <Bookmark className="icon" />}</i>
        <i onClick={handleFav}>{isFavourite ? <FullHeart className="icon" /> : <Heart className="icon" />}</i>
      </div>
    </>
  );
};
