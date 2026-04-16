const normalizeLocation = (str: string) =>
  str.split(', ').toReversed().join(', ');

export { normalizeLocation };
