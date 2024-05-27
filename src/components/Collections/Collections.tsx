import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { CollectionCard } from './CollectionCard';
import { Collection } from '../../models/collection';

interface CollectionsProps {
  collections: Collection[];
}

export const Collections = ({ collections }: CollectionsProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
      <Masonry className="masonry__columns" gutter="32px">
        {collections.map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
