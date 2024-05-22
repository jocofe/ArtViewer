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
  _primaryTitle: string;
  systemNumber: string;
  _primaryMaker: string;
  _primaryDate: string;
  _primaryImageId: string;
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
    const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?kw_system_number=${artPieceId}`); 
    const data = await response.json();
    const records = data.records;
    
    if (records && records.length > 0) {
      const artPiece = records[0];
      return {
        _primaryTitle: artPiece._primaryTitle,
        systemNumber: artPiece.systemNumber,
        _primaryMaker: artPiece._primaryMaker.name,
        _primaryDate: artPiece._primaryDate,
        _primaryImageId: artPiece._primaryImageId,
      };
      } else {
        console.warn(`No results found for artPieceid: ${artPieceId}`);
        return null;
      }
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
            <Link key={index} to={`/art-piece/${artPiece.systemNumber}`}>
              <ArtCard
                key={index}
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