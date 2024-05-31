import { useState } from 'react';
import { Collections } from '../Collections/Collections';
import { TabsProps } from '../../models/tabs';

export const Tabs = ({ collections, likes, className }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState('collections');

  return (
    <div className={`tabs ${className}`}>
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
        {selectedTab === 'collections' ? <Collections collections={collections} /> : likes}
      </div>
    </div>
  );
};
