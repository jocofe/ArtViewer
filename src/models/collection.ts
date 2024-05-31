export interface Collection {
  title: string;
  id: string;
  name: string;
  description: string;
  artpieces: ArtPiece[];
}

export interface ArtPiece {
  id: string;
  title: string;
  author: string;
  date: string;
  imageId: string;
  imageUrl: string;
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

export interface CollectionsProps {
  collections: Collection[];
}

export interface NewCollection {
  name: 'Name';
  description: 'Description (optional)';
}
