// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
          },
        },
      ],
    ],
  };
};
