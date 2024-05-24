import React, { useState } from 'react';
import { CollectionUser } from '../Dialogs/Collection Modal/AddCollection';

interface TabsProps {
  collections: CollectionUser[];
  likes: React.ReactNode;
}

const Tabs = ({ collections, likes }: TabsProps) => {
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
              <div key={index}>
                {/* Renderiza aquí los detalles de cada colección */}
                {collection.name}
              </div>
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
