module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    'no-console': 'off', // Allow console in plugin code
    'import/no-unresolved': 'off', // Plugin may use special resolution
  },
};
