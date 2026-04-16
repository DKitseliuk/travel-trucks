const capitalize = (str: string) =>
  str
    .split('_')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');

export { capitalize };
