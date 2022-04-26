// generateUniqueID returns a unique enough string
// to populate "key" prop for each child in a list.
export const generateUniqueID = (): string => {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);

  return `${date}-${rand}`;
};
