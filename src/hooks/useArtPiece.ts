import { useState, useEffect } from 'react';
import { ArtPieceFavourites } from '../models/likes';

export const getArtPiece = async (artPieceId: string): Promise<ArtPieceFavourites | null> => {
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
    console.error('Error fetching art piece:', error);
    return null;
  }
};

export const useArtPiece = (artPieceId: string) => {
  const [artPiece, setArtPiece] = useState<ArtPieceFavourites | null>(null);

  useEffect(() => {
    getArtPiece(artPieceId).then(setArtPiece);
  }, [artPieceId]);

  return artPiece;
};
