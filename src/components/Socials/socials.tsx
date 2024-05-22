import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { AddCollectionModal } from '../Dialogs/Collection Modal/AddCollection';

export const Socials = () => {
  const [isOnFav, setIsOnFav] = useState(false);
  const [isOnSaved, setIsOnSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSaved = (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    event.stopPropagation();
    setIsOnSaved(!isOnSaved);
    setShowModal(true);
  };

  const handleFav = (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    event.stopPropagation();
    setIsOnFav(!isOnFav);
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
        <i onClick={handleFav}>{isOnFav ? <FullHeart className="icon" /> : <Heart className="icon" />}</i>
      </div>
      <ModalDefault show={showModal} size="md" onClose={handleCloseModal}>
        <AddCollectionModal collections={[]} />
      </ModalDefault>
    </>
  );
};
