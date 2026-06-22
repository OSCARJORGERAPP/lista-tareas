import js from "@eslint/js";
import react from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [
      ".next",
      "node_modules",
      "dist",
      "build",
      ".git",
      ".cache",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      react,
      "@next/next": nextPlugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
