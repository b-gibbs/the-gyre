const {colors} = require('gatsby-theme-apollo-core/src/utils/colors');
const {colors: spaceKitColors} = require('@apollo/space-kit/colors');

exports.colors = {
  ...colors,
  primary: spaceKitColors.blue.dark,
  primaryLight: spaceKitColors.blue.lighter,
  secondary: spaceKitColors.orange.base,
  tertiary: spaceKitColors.yellow.base,
};