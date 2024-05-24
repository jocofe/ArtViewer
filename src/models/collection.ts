export interface Collection {
  id: string;
  name: string;
  description: string;
  artpieces: { artPieceId: string; imageUrl: string }[];
}
