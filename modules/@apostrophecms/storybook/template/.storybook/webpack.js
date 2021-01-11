// This is not named `webpack.config.js` because if I do that, it gets
// automagically loaded by storybook in a mysterious undocumented way,
// IN ADDITION to being loaded the recommended way by main.tmpl.js. Fun. -Tom

const path = require('path');

module.exports = async (config) => {
  config.module.rules.push(
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
        // 'eslint-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('node-sass'),
            // sass-loader 9 changed this option name yet again
            additionalData:
`@import "Modules/@apostrophecms/ui/scss/mixins/import-all.scss";
`
          }
        }
      ]
    }
  );

  // Allow for an npm linked apostrophe module to work
  config.resolve.modules = [
    'node_modules',
    path.resolve(`${process.env.APOS_ROOT}/node_modules/apostrophe/node_modules`),
    path.resolve(`${process.env.APOS_ROOT}/node_modules`)
  ];

  // resolve frontend assets of apostrophe modules as Modules/@apostrophecms/modulename/something
  config.resolve.alias['Modules'] = path.resolve(`${process.env.APOS_ROOT}/apos-build/modules`);

  return config;
};