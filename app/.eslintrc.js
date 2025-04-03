// .eslintrc.js
module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:vue/recommended",
      "plugin:vue/base",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
      "vue",
      "vuetify",
      "@typescript-eslint"
    ],
    overrides: [
      {
        files: ["*.vue"],
        parser: "vue-eslint-parser",
        parserOptions: {
          parser: "@typescript-eslint/parser",
          sourceType: "module",
          ecmaVersion: 2020
        },
        rules: {
          "vue/component-tags-order": ["error", { "order": ["template", "script", "style"] }]
        }
      },
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          "@typescript-eslint/explicit-function-return-type": ["warn", {
            "allowExpressions": true,
            "allowTypedFunctionExpressions": true
          }],
          "@typescript-eslint/no-explicit-any": "warn",
          "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
          "@typescript-eslint/explicit-module-boundary-types": "warn",
          "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-ignore": "allow-with-description",
            "minimumDescriptionLength": 10
          }],
          "@typescript-eslint/naming-convention": [
            "error",
            {
              "selector": "interface",
              "format": ["PascalCase"],
              "prefix": ["I"]
            },
            {
              "selector": "typeAlias",
              "format": ["PascalCase"]
            }
          ]
        }
      }
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module"
    },
    env: {
      es2021: true,
      browser: true,
      node: true,
      meteor: true,
      mocha: true
    },
    rules: {
      "quotes": ["error", "single"],
      "no-var": "error",
      "prefer-const": "error"
    }
  }