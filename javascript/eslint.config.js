import js from "@eslint/js";
import globals from "./globals.js";

export default [
  { ignores: ["coverage/**"] },
  { files: ["scripts/**/*.js"], languageOptions: { globals: { console: "readonly", process: "readonly" } } },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals,
    },
  },
];
