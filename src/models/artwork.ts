export type Artwork = {
  title: string;
  artist: string;
  date: string;
  dimensions: string;
  type: string;
  description: string;
};

export type ArtworksCollection = {
  [id: string]: Artwork;
};
