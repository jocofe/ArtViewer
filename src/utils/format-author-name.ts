export const formatAuthorName = (authorName: string): string => {
    const [lastName, firstName] = authorName.split(', ');
    return `${firstName} ${lastName}`;
  };