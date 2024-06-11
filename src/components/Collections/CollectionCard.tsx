import { useState, useEffect } from 'react';
import { CollectionCardProps } from '../../models/collection';

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { name, artpieces } = collection;
  const [firstArtPiece, setFirstArtPiece] = useState(artpieces && artpieces.length > 0 ? artpieces[0] : null);

  // Recalcula el primer elemento cuando artpieces cambia
  useEffect(() => {
    setFirstArtPiece(artpieces && artpieces.length > 0 ? artpieces[0] : null);
  }, [artpieces]);

  return (
    <div key={collection.id} className="collectioncard-wrapper">
      {firstArtPiece ? (
        <div className="image-wrapper">
          {firstArtPiece.imageUrl ? (
            <img src={firstArtPiece.imageUrl} className="collectioncard__image" alt={`Art Piece ${firstArtPiece.id}`} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      ) : (
        <p>No image available</p>
      )}
      <div className="collectioncard__name">{name}</div>
      <div className="collectioncard__count">{artpieces ? artpieces.length : 0} pieces</div>
    </div>
  );
};
