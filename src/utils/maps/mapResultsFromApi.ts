import { ResultItem, ResultListFromApi, ResultsListItem } from '../../models/results-list';

export const mapResultsFromApi = (result: ResultListFromApi): ResultsListItem[] => {
  return result.records.map((resultItem: ResultItem) => {
    return {
      title: resultItem._primaryTitle,
      id: resultItem.systemNumber,
      author: resultItem._primaryMaker.name,
      date: resultItem._primaryDate,
      location: resultItem._primaryPlace,
      imageId: resultItem._primaryImageId,
    };
  });
};
