const CracoAntDesignPlugin = require("craco-antd");
const CracoAlias = require("craco-alias");

module.exports = {
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#9B27B0",
          "@error-color": "#B00020",
          "@border-radius-base": "4px",
          "@table-border-radius-base": "8px",
          "@font-size-base": "14px",
          "@text-color": "rgba(0, 0, 0, 0.6)",
          "@table-header-sort-bg": "#fafafa",
          "@table-body-sort-bg": "#fff",
          "@table-body-selected-sort-bg": "#fff",
        },
      },
    },
  ],
};
