module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': 'vuetify',
  rules: {
    "template-curly-spacing" : "off",
    indent : "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
