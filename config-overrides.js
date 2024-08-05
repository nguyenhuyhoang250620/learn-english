const { alias } = require('react-app-rewire-alias');

module.exports = function override(config,env) {
  config = alias({
    '@core': 'src/core',
    '@constants': 'src/constants',
    '@pages': 'src/pages',
    '@components': 'src/components',
    '@common': 'src/common',
    '@assets': 'src/assets',
    '@redux': 'src/redux',
    '@style':'src/style',
    '@utils':"src/utils",
  })(config);

  return config;
};