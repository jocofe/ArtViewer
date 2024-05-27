import { CollectionCardProps } from '../../models/collection';

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { name, artpieces } = collection;
  const firstArtPiece = artpieces && artpieces.length > 0 ? artpieces[0] : null;
  console.log('Imagen URL:', firstArtPiece?.imageUrl);

  return (
    <div key={collection.id} className="collectioncard-wrapper">
      {' '}
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
