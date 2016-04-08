import { join, dirname } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const basedir = dirname(__dirname);
const srcdir  = join(basedir, 'src');
const distdir = join(basedir, 'dist');

const config = {
  entry:    [ './' ],
  target:   'node',

  cache:    false,
  debug:    false,

  context:  srcdir,
  devtool:  'source-map',

  output: {
    path:          distdir,
    libraryTarget: 'commonjs2',
    filename:      'index.js',
  },

  stats: {
    colors:        true,
    reasons:       true,
    //hash:          true,
    //version:       true,
    timings:       true,
    //chunks:        true,
    //chunkModules:  true,
    //cached:        true,
    //cachedAssets:  true,
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.json$/, loader: 'json'  },
    ],
  },

  externals: [
    nodeExternals(),
  ],

  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
    extensions: [
      '',
      '.js',
      '.json',
      '.jsx',
    ],
  },

  node: {
    console:     false,
    global:      false,
    process:     false,
    Buffer:      false,
    __filename:  false,
    __dirname:   false,
    fs:          'empty',
  },

  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.cache   = true;
  config.debug   = true;
  config.devtool = 'cheap-module-eval-source-map';
}

export default config;
