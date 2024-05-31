import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { CollectionCard } from './CollectionCard';
import { CollectionsProps } from '../../models/collection';
import { Link } from 'react-router-dom';

export const Collections = ({ collections }: CollectionsProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
      <Masonry className="masonry__columns" gutter="32px">
        {collections.map(collection => (
          <div className="relative" key={collection.id}>
            <CollectionCard key={collection.id} collection={collection} />
            <Link className="expanded-anchor" to={`/collection/${collection.id}`} />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
