import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/config";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { ArtCard } from "../ArtCard/ArtCard";
import { ResponsiveMasonry } from "react-responsive-masonry";

interface Favourite {
  artPieceId: string;
}

interface ArtPiece {
  title: string;
  id: string;
  author: string;
  date: string;
  imageId: string;
}

const getFavourites = async (userEmail: string) => {
  try {
    const userDocRef = doc(db, "users", userEmail);
    const favouritesRef = collection(userDocRef, "favourites");
    const querySnapshot = await getDocs(favouritesRef);
    return querySnapshot.docs.map((doc) => doc.data() as Favourite);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return [];
  }
};

const getArtPiece = async (artPieceId: string) => {
  try {
    const response = await fetch(`https://api.vam.ac.uk/v1/museumobject/${artPieceId}`);
    const data = await response.json();
    return data[0].fields as ArtPiece;
  } catch (error) {
    console.error("Error fetching art piece:", error);
    return null;
  }
};

const fetchArtPieces = async (favourites: Favourite[]) => {
    try {
      const artPieces = await Promise.all(favourites.map((favourite) => getArtPiece(favourite.artPieceId)));
      const filteredArtPieces = artPieces.filter((artPiece): artPiece is ArtPiece => artPiece!== null);
      return filteredArtPieces;
    } catch (error) {
      console.error("Error fetching art pieces:", error);
      return [];
    }
};

export const Likes = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);

  useEffect(() => {
    if (user) {
      const userEmail = user.email!;
      getFavourites(userEmail).then((favourites) => setFavourites(favourites));
    } else {
      console.error("No user signed in");
    }
  }, [user]);

  useEffect(() => {
    if (favourites.length > 0) {
      fetchArtPieces(favourites).then((artPieces) => setArtPieces(artPieces));
    }
  }, [favourites]);

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
        <Masonry className="masonry__columns" gutter="32px">
          {artPieces.map((artPiece, index) => (
            <Link key={index} to={`/art-piece/${artPiece.id}`}>
              <ArtCard
                key={index}
                title={artPiece.title}
                imageId={artPiece.imageId}
                author={artPiece.author}
                date={artPiece.date}
                id={artPiece.id}
              />
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};