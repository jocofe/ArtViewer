import React, { useState } from 'react';
import { Collection } from '../views/user-profile/UserPage';
import { CollectionCard } from '../components/Collections/CollectionCard';

interface TabsProps {
  collections: Collection[];
  likes: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ collections, likes }) => {
  const [selectedTab, setSelectedTab] = useState('collections');

  return (
    <div className="tabs">
      <div className="tablist" role="tablist">
        <button
          role="tab"
          className={`tab ${selectedTab === 'collections' ? 'tab--selected' : ''}`}
          onClick={() => setSelectedTab('collections')}
        >
          Collections
        </button>
        <button
          role="tab"
          className={`tab ${selectedTab === 'likes' ? 'tab--selected' : ''}`}
          onClick={() => setSelectedTab('likes')}
        >
          Likes
        </button>
      </div>
      <div className="tab-panel" role="tabpanel">
        {selectedTab === 'collections' ? (
          <div>
            {collections.map((collection, index) => (
              <CollectionCard key={index} collection={collection} />
            ))}
          </div>
        ) : (
          likes
        )}
      </div>
    </div>
  );
};

export default Tabs;
