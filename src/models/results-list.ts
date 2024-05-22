export interface ResultsListItem {
  imageId: string;
  title: string;
  author: string;
  date: string;
  location: string;
  id: string;
}

export interface ResultListFromApi {
  clusters: object;
  records: ResultItem[];
}

export interface ResultItem {
  _primaryDate: string;
  _primaryImageId: string;
  _primaryMaker: {
    association: string;
    name: string;
  };
  _primaryPlace: string;
  _primaryTitle: string;

  systemNumber: string;
}
