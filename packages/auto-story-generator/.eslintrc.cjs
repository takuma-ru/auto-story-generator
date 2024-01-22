/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  root: true,
  rules: {
    "no-console": [
      "error",
      {
        allow: ["error", "warn"],
      },
    ],
    quotes: ["error", "double"],

    "no-restricted-syntax": [
      "warn",
      {
        selector: "Identifier[name='consola']",
        message: "Logs are output on the console.",
      },
    ],

    "no-restricted-imports": [
      "error",
      {
        patterns: ["./", "../"],
      },
    ],

    // - ↓ - Check the order of import statements
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "object",
          "type",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
    // - ↑ - Check the order of import statements
  },
};

module.exports = config;
