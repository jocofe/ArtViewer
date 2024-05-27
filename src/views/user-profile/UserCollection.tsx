import { Collection } from '../../models/collection';
import { Button } from '../../components/Buttons/Buttons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';

interface UserCollectionProps {
  collection: Collection;
}

export const UserCollection = ({ collection }: UserCollectionProps) => {
  return (
    <div className="usercollection-wrapper">
      <div className="usercollection-card">
        <div className="usercollection__info">
          <h1 className="usercollection__name">{collection.name}</h1>
          <p className="usercollection__description">{collection.description}</p>
        </div>
        <Button>Edit Collection</Button>
        <Button>Delete Collection</Button>
      </div>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {collection.artpieces.map(artpiece => (
              <ArtCard
                key={artpiece.id}
                title={artpiece.title}
                imageId={artpiece.imageId}
                author={artpiece.author}
                date={artpiece.date}
                id={artpiece.id}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};
