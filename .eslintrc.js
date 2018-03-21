module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "extends": [ "eslint:recommended", "prettier" ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-return-assign": 0,
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      "bracketSpacing": false,
      "parser": "flow"
    }]
  },
}
