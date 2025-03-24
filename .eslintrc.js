module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
    ],
    plugins: ["react", "@typescript-eslint", "jsx-a11y", "import", "react-hooks"],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "jsx-a11y/anchor-is-valid": [
            "error",
            {
                components: ["Link"],
                specialLink: ["to"],
            },
        ],
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
                alphabetize: { order: "asc", caseInsensitive: true },
            },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-console": ["warn", { allow: ["warn", "error"] }],
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/no-var-requires": "off",
            },
        },
        {
            files: ["**/*.ts", "**/*.tsx"],
            rules: {
                // TypeScript-specific rules here
            },
        },
    ],
};
