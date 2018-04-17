module.exports = {
    // "node": true,
    "env": {
        "browser": true,
        "es6": true,
        "amd":true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "angular"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": false
        },
        "sourceType": "module"
    },
    "plugins": ["angular"],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
