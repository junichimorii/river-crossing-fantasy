import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
    ...pluginVue.configs["flat/recommended"],
    ...vueTsEslintConfig({
        extends: [
          "recommended",
        ]
    }),
    "eslint:recommended",
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },

        rules: {
            "vue/multi-word-component-names": "off",
        },
    }
];