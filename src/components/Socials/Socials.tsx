import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState, useEffect, useContext, useCallback } from 'react';
import { ModalDefault } from '../Dialogs/ModalDefault';
import { AddCollectionModal } from '../Dialogs/Collection Modal/AddCollection';
import { CollectionUser } from '../../models/collection';
import { UserContext } from '../../context/UserContextProvider';
import { useLikes } from '../../hooks/useLikes';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/config';
import { SocialProps } from '../../models/socials';
import { Toaster } from '../Dialogs/Toaster Message/ToasterMessage';
import { Button } from '../Buttons/Buttons';
import { NavLink } from 'react-router-dom';

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { isLoggedIn, userData } = useContext(UserContext);

  const { favourites, toggleLike } = useLikes();
  const isFavourite = favourites.some(fav => fav.artPieceId === artPieceId);

  const [animateSaveIcon, setAnimateSaveIcon] = useState(false);
  const [animateFavIcon, setAnimateFavIcon] = useState(false);

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
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      setShowLoginModal(true);
    }
    setAnimateSaveIcon(true);
  };

  const handleFav = async (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    toggleLike(artPieceId);
    setAnimateFavIcon(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleSave = () => {
    checkIfArtPieceIsSaved();
    setShowModal(false);
  };

  const copyArtworkLink = () => {
    if (!navigator.clipboard) {
      console.error('Clipboard API not supported');
      return;
    }

    const baseUrl = window.location.origin;
    const copiedUrl = `${baseUrl}/art-piece/${artPieceId}`;
    navigator.clipboard
      .writeText(copiedUrl)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error copying link:', error);
      });
  };

  return (
    <>
      <div className="socials-wrapper">
        <div onClick={copyArtworkLink} className="icon-wrapper">
          <CopyLink className="icon" />
        </div>
        <div onClick={handleSaved} className="icon-wrapper">
          {isOnSaved ? <FullBookmark className={`icon icon-effect ${animateSaveIcon? 'animate' : ''}`} /> : <Bookmark className="icon" />}
        </div>
        <div onClick={handleFav} className="icon-wrapper button-icon">
          {isFavourite ? <FullHeart className={`icon icon-effect ${animateFavIcon? 'animate' : ''}`} /> : <Heart className="icon" />}
        </div>
      </div>
      {isLinkCopied && <Toaster message="Copied Link!" onClose={() => setIsLinkCopied(false)} />}
      {isLoggedIn ? (
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
      ) : (
        <ModalDefault onClose={closeLoginModal} show={showLoginModal} size="md" title="Join ArtViewer now!">
          <p className="modal-signup__content">
            Register to discover your <span>favorite</span> art pieces and create your own{' '}
            <span>unique collections</span>.
          </p>
          <div className="modal-signup__btn">
            <Button component={NavLink} to="/signup" className="btn-link--white">
              Sign Up
            </Button>
          </div>
        </ModalDefault>
      )}
    </>
  );
};
