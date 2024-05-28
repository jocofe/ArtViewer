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
import { Toaster } from '../Dialogs/Toaster Message/ToasterMessage';

export const Socials = ({
  artPieceId,
  artPieceImageId,
  artPieceAuthor,
  artPieceDate,
  artPieceTitle,
  artPieceImageUrl,
}: SocialProps) => {
  const [isOnSaved, setIsOnSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false); // Nuevo estado para controlar si el enlace se ha copiado
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

  const copyArtworkLink = () => {
    const baseUrl = location.origin;
    const copiedUrl = `${baseUrl}/art-piece/${artPieceId}`;
    navigator.clipboard
      .writeText(copiedUrl)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 3000); // Duración del mensaje en milisegundos
      })
      .catch(error => {
        console.error('Error copying link:', error);
      });
  };

  return (
    <>
      <div className="socials-wrapper">
        <i onClick={copyArtworkLink}>
          <CopyLink className="icon" />
        </i>
        <i onClick={handleSaved}>{isOnSaved ? <FullBookmark className="icon" /> : <Bookmark className="icon" />}</i>
        <i onClick={handleFav}>{isFavourite ? <FullHeart className="icon" /> : <Heart className="icon" />}</i>
      </div>
      {isLinkCopied && <Toaster message="Copied Link!" onClose={() => setIsLinkCopied(false)} />}{' '}
      {/* Mostrar el Toaster si isLinkCopied es true */}
      <ModalDefault title="Add this Piece to a Collection" show={showModal} size="md" onClose={handleCloseModal}>
        <AddCollectionModal
          collections={[]}
          artPieceDetails={{
            id: artPieceId,
            imageId: artPieceImageId,
            author: artPieceAuthor,
            title: artPieceTitle,
            date: artPieceDate,
            imageUrl: artPieceImageUrl,
          }}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </ModalDefault>
    </>
  );
};
