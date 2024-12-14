module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './renderer/src/assets/clear-icon'
        }
      }
    }
  ]
}
