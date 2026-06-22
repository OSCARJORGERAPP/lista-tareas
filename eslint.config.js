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
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
