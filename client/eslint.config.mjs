import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import stylistic from "@stylistic/eslint-plugin";
import { fixupConfigRules } from "@eslint/compat";

export default [
  stylistic.configs['recommended-flat'],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      '@stylistic/indent': ['error', 4],
      '@stylistic/jsx-indent': ['error', 4],
      '@stylistic/jsx-indent-props': ['error', 4],
      '@typescript-eslint/no-unused-vars': 'warn'
    },
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  }
];