module.exports = {
  extends: ["@verg/eslint-config-react"],
  rules: {
    "no-unsafe-optional-chaining": "off",
    radix: 0,
    // TODO enforce these rule
    "no-underscore-dangle": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-unresolved": "off",
  },
  globals: {
    JSX: true,
    NodeJS: true,
  },
};
