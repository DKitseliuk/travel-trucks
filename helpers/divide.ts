const divide = (str: string) => {
  return str.slice(0, str.length - 1) + ' ' + str.charAt(str.length - 1);
};

export { divide };
