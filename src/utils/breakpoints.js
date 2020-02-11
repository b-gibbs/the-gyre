const sizes = {
  xs: 0,
  sm: 576,
  nm: 620,
  md: 768,
  lg: 992,
  xl: 1200,
};

export default Object.keys(sizes).reduce(
  (acc, key) => ({
    ...acc,
    [key]: `@media (max-width: ${sizes[key]}px)`
  }),
  {}
);