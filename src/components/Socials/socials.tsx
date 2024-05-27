import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState, useEffect, useContext, useCallback } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { AddCollectionModal } from '../Dialogs/Collection Modal/AddCollection';
import { CollectionUser } from '../../models/collection';
import { UserContext } from '../../context/UserContextProvider';
import { useLikes } from '../Likes/LikesContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/config';
import { SocialProps } from '../../models/socials';

export const Socials = ({ artPieceId, artPieceImageId, artPieceAuthor, artPieceDate, artPieceTitle }: SocialProps) => {
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
      const collectionsData = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CollectionUser);

      const isSaved =
        collectionsData &&
        collectionsData.some(collection =>
          collection.artpieces?.some((piece: { id: string }) => piece.id === artPieceId),
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
          artPieceDetails={{
            id: artPieceId,
            imageId: artPieceImageId,
            author: artPieceAuthor,
            title: artPieceTitle,
            date: artPieceDate,
          }}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </ModalDefault>
    </>
  );
};
