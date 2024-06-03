import { useCallback } from 'react';

const useOfficialPageLink = (artId: string) => {
  const linkToOfficialInfo = useCallback(() => {
    const officialPageURL = `https://collections.vam.ac.uk/item/${artId}`;
    window.open(officialPageURL, '_blank');
  }, [artId]);

  return linkToOfficialInfo;
};

export default useOfficialPageLink;
