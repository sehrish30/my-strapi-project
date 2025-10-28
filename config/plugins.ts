export default () => ({
  "deep-populate": {
    enabled: true,
    config: {
      useCache: false,
      replaceWildcard: true,
      // contentTypes: {
      //   "api::page.page": {
      //     deny: { relations: ["api::page.page"] }, // Prevent circular references
      //   },
      // },
    },
  },
});
