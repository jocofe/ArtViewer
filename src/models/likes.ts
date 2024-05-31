import { ReactNode } from 'react';

export interface Favourite {
  artPieceId: string;
}

export interface ArtPieceFavourites {
  _primaryTitle: string;
  systemNumber: string;
  _primaryMaker: string;
  _primaryDate: string;
  _primaryImageId: string;
}

export interface Favourite {
  artPieceId: string;
  id?: string;
}

export interface LikesContextProps {
  favourites: Favourite[];
  toggleLike: (artPieceId: string) => void;
}

export interface LikesProviderProps {
  children: ReactNode;
}
