export interface FilterCollectionBarProps {
  size: 'normal' | 'small';
  placeholder: string;
  onSearch: (searchTerm: string) => void; // Nueva prop onSearch
}
