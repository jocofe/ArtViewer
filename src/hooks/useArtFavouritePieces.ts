import { useState, useEffect } from 'react';
import { getArtPiece } from './useArtPiece';
import { Favourite, ArtPieceFavourites } from '../models/likes';

const fetchArtFavouritePieces = async (favourites: Favourite[]) => {
  try {
    const artPieces = await Promise.all(favourites.map(favourite => getArtPiece(favourite.artPieceId)));
    return artPieces.filter((artPiece): artPiece is ArtPieceFavourites => artPiece !== null);
  } catch (error) {
    console.error('Error fetching art pieces:', error);
    return [];
  }
};

export const useArtFavouritePieces = (favourites: Favourite[]) => {
  const [artPieces, setArtPieces] = useState<ArtPieceFavourites[]>([]);

  useEffect(() => {
    if (favourites.length > 0) {
      fetchArtFavouritePieces(favourites).then(setArtPieces);
    }
  }, [favourites]);

  return artPieces;
};
