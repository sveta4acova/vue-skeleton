const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@containers': path.resolve(__dirname, './src/containers/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@config': path.resolve(__dirname, './src/config/'),
      '@store': path.resolve(__dirname, './src/store/'),
      '@api': path.resolve(__dirname, './src/api/'),
    },
  },
};
