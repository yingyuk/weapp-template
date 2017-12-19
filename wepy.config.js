const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js'),
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    modules: ['node_modules'],
  },
  eslint: true,
  compilers: {
    less: {
      compress: true,
    },
    sass: {
      outputStyle: 'compressed',
    },
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ],
    },
  },
  plugins: {
    replace: [
      {
        filter: /utils\.js$/,
        config: {
          find: /__NODE_ENV__/g,
          replace: process.env.NODE_ENV,
        },
      },
    ],
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
  },
};

if (isProd) {
  delete module.exports.compilers.babel.sourcesMap;

  // 压缩sass
  module.exports.compilers.sass = { outputStyle: 'compressed' };

  // 压缩less
  module.exports.compilers.less = { compress: true };

  // 压缩js
  module.exports.plugins.uglifyjs = {
    filter: /\.js$/,
    config: {},
  };

  // autoprefixer
  module.exports.plugins.autoprefixer = {
    filter: /\.wxss$/,
    config: {
      browsers: ['iOS >= 6', 'Android >= 4.0'],
    },
  };

  // 图片压缩
  // module.exports.plugins.imagemin = {
  //   filter: /\.(jpg|png|jpeg)$/,
  //   config: {
  //     jpg: {
  //       quality: 80,
  //     },
  //     png: {
  //       quality: 80,
  //     },
  //   },
  // };
}
