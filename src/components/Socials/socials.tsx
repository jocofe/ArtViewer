import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState, useEffect, useContext, useCallback } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { AddCollectionModal } from '../Dialogs/Collection Modal/AddCollection';
import { UserContext } from '../../context/UserContextProvider';
import { useLikes } from '../Likes/LikesContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/config';

interface SocialProps {
  artPieceId: string;
}

export const Socials = ({ artPieceId }: SocialProps) => {
  const [isOnSaved, setIsOnSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { userData } = useContext(UserContext);

  const { favourites, toggleLike } = useLikes();
  const isFavourite = favourites.some(fav => fav.artPieceId === artPieceId);

  const checkIfArtPieceIsSaved = useCallback(async () => {
    if (!userData) return;

    try {
      const collectionRef = collection(db, `users/${userData.email}/collections`);
      const collectionSnap = await getDocs(collectionRef);
      const collectionsData = collectionSnap.docs.map(doc => doc.data());

      const isSaved = collectionsData.some(collection =>
        collection.artpieces.some((piece: { artPieceId: string }) => piece.artPieceId === artPieceId),
      );

      setIsOnSaved(isSaved);
    } catch (error) {
      console.error('Error checking if art piece is saved:', error);
    }
  }, [artPieceId, userData]);

  useEffect(() => {
    checkIfArtPieceIsSaved();
  }, [checkIfArtPieceIsSaved]);

  const handleSaved = (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    event.stopPropagation();
    setShowModal(true);
  };

  const handleFav = async (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    toggleLike(artPieceId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    checkIfArtPieceIsSaved();
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
        <AddCollectionModal
          collections={[]}
          artPieceDetails={{ id: artPieceId, imageId: '' }}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </ModalDefault>
    </>
  );
};
