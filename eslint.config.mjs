import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
  { ignores: ["dist/", "node_modules/"] },
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  // { extends: ["eslint:recommended", "plugin:prettier/recommended"], },
  {
    rules: {
      "eslint-disable-next-line: no-undef": "off"
    }
  }
]);