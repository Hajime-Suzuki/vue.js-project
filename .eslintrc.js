module.exports = {
  "env": {
    "browser": true,
    "node":true,
    "es6": true,
    "mocha": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "plugin:vue/recommended"],
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "semi": [
      "error",
      "never"
    ],
    "vue/name-property-casing": ["never", "PascalCase|kebab-case"]
  }
};
