import 'firebase/firestore';
import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { AddCollectionModal } from '../Dialogs/Collection Modal/AddCollection';
import { useLikes } from '../Likes/LikesContext';

interface SocialProps {
  artPieceId: string;
}

export const Socials = ({ artPieceId }: SocialProps) => {
  const [isOnSaved, setIsOnSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useLikes from LikesContext.tsx
  const { favourites, toggleLike } = useLikes();
  const isFavourite = favourites.some(fav => fav.artPieceId === artPieceId);

  const handleSaved = (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    event.stopPropagation();
    setIsOnSaved(!isOnSaved);
    setShowModal(true);
  };

  const handleFav = async (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    toggleLike(artPieceId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="socials-wrapper">
        <i>
          <CopyLink className="icon" />
        </i>
        <i onClick={handleSaved}>{isOnSaved ? <FullBookmark className="icon" /> : <Bookmark className="icon" />}</i>
        <i onClick={handleFav}>{isFavourite ? <FullHeart className="icon" /> : <Heart className="icon" />}</i>
      </div>
      <ModalDefault show={showModal} size="md" onClose={handleCloseModal}>
        <AddCollectionModal />
      </ModalDefault>
    </>
  );
};
