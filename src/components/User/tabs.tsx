import React, { useState } from "react";

interface TabsProps {
  collections: React.ReactNode;
  likes: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ collections, likes }) => {
  const [selectedTab, setSelectedTab] = useState("collections");

  return (
    <div className="tabs">
        <div className="tablist" role="tablist">
        <button
          role="tab"
          className={`tab ${selectedTab === "collections" ? "tab--selected" : ""}`}
          onClick={() => setSelectedTab("collections")}
        >
          Collections
        </button>
        <button
          role="tablist"
          className={`tab ${selectedTab === "likes" ? "tab--selected" : ""}`}
          onClick={() => setSelectedTab("likes")}
        >
          Likes
        </button>
        </div>
        <div className="tab-panel" role="tabpanel">
        {selectedTab === "collections" ? collections : likes}
        </div>
    </div>
  );
};

export default Tabs;