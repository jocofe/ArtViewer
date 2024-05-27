export interface Collection {
  id: string;
  name: string;
  description: string;
  artpieces: { artPieceId: string; imageUrl: string }[];
}

export interface ArtPiece {
  id: string;
  title?: string;
  author?: string;
  date?: string;
  imageId: string;
}

export interface CollectionUser {
  name: string;
  description: string;
  artpieces: ArtPiece[];
  id: string;
}

export interface CollectionCardProps {
  collection: Collection;
}

export interface AddCollectionModalProps {
  collections: CollectionUser[];
  artPieceDetails: ArtPiece;
  onClose: () => void;
  onSave: () => void;
}

export interface NewCollectionFormInputs {
  name: string;
  description: string;
}
