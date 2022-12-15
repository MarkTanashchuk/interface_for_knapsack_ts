module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/*"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
        },
        react: { version: "detect" },
        "import/resolver": {
          node: {
            extensions: [".png", ".js", ".jsx", ".ts", ".tsx"],
          },
          typescript: {
            directory: "./tsconfig.json",
            alwaysTryTypes: true,
          },
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      rules: {
        "linebreak-style": ["error", "unix"],
        "react/prop-types": "off",

        "import/extensions": [
          "error",
          "ignorePackages",
          {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
          },
        ],
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
            ],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",

        "react/react-in-jsx-scope": "off",

        "jsx-a11y/anchor-is-valid": "off",

        "@typescript-eslint/no-unused-vars": ["warn"],

        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],

        "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      },
    },
  ],
};
