import { FC } from 'react';

interface ArtPiece {
  artPieceId: string;
  imageUrl: string;
}

interface Collection {
  name: string;
  artpieces: ArtPiece[];
}

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard: FC<CollectionCardProps> = ({ collection }) => {
  const { name, artpieces } = collection;
  const firstArtPiece = artpieces && artpieces.length > 0 ? artpieces[0] : null;
  console.log('Imagen URL:', firstArtPiece?.imageUrl);

  return (
    <div className="collectioncard-wrapper">
      <div className="collectioncard__img">
        {firstArtPiece ? (
          <img src={firstArtPiece.imageUrl} alt={`Art Piece ${firstArtPiece.artPieceId}`} />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="collectioncard__name">{name}</div>
      <div className="collectioncard__count">{artpieces ? artpieces.length : 0} pieces</div>
    </div>
  );
};
