import 'firebase/firestore';
import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from '../Icons/icons';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/config';

interface SocialProps {
  artPieceId: string;
}

async function saveArtPieceToUser(artPieceId: string) {
  const auth = getAuth()
  const user = auth.currentUser;

  if (user) {
    // User's UID
    const uid = user.uid;

    // Reference to the user's document in Firestore
    const userRef = doc(db, 'users', uid);

    // Get the user's email
    const userEmail = user.email;

    // Check if the user is signed in and has an email
    if (userEmail) {
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', userEmail);

      // Reference to the favourites subcollection
      const favouritesRef = collection(userDocRef, 'favourites');

      // Add the art piece to the favourites subcollection
      await addDoc(favouritesRef, { artPieceId });

      // Update the user's document with the email as the ID
      await setDoc(userDocRef, { uid }, { merge: true });
    } else {
      console.error('User is not signed in or does not have an email');
    }
  } else {
    console.error('No user signed in');
  }
}

export const Socials = ({ artPieceId }: SocialProps) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaved = (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    setIsSaved(!isSaved);
  };

  const handleFav = async (event: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    setIsFavourite(!isFavourite);
    // Call the function to add the art piece to user's likes collection
    await saveArtPieceToUser(artPieceId);
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
