import { useState } from "react";
import { Result } from "../../models/result-list";


export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artPieces, setArtPieces] = useState([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => setArtPieces(data.records))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="search-bar">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </form>
      </div>

      {artPieces.map((artPiece: Result) => (
  <div className="art-piece" key={artPiece._primaryImageId}>
    <img src={artPiece._images._iiif_image_base_url} alt={artPiece._primaryTitle} className="art-img" />
    <h4 className="art-tittle">{artPiece._primaryTitle}</h4>
    <p className="art-author">{artPiece._primaryMaker.name}</p>
  </div>
))}
    </div>
  );
};