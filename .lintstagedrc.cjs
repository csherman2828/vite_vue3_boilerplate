module.exports = {
  '**/*.{js,cjs}': ['eslint --fix', 'prettier --write --ignore-unknown'],
  '**.*': 'prettier --write --ignore-unknown',
};
