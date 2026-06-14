import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,ts}"],
    plugins: { js },
    extends: [
      "js/recommended",
      tseslint.configs.recommended,
      stylistic.configs.customize({
        indent: 2,
        quotes: "double",
        semi: true,
        jsx: true,
      })],
    languageOptions: { globals: globals.nodeBuiltin },
  },
]);
