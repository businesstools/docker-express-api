import webpack from 'webpack';
import chokidar from 'chokidar';

import webpackConfig from './webpack.config';

let service = require(webpackConfig.output.path);

function watchSourceChanges() {
  webpack(webpackConfig).watch({
    aggregateTimeout: 300,
    poll:             true,
  }, printStats);
}

function printStats(err, stats) {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString(webpackConfig.stats));
  }
}

function watchCompiledService() {
  const watcher = chokidar.watch(webpackConfig.output.path, {
    usePolling: true
  });

  watcher.on('ready', function () {
    watcher.on('all', purgeCache);
  });
}

function purgeCache() {
  cleanup();
  Object.keys(require.cache).forEach(id => {
    if (/[\/\\]dist[\/\\]/.test(id)) {
      delete require.cache[id];
    }
  });
  service = require(webpackConfig.output.path);
  init();
}

watchSourceChanges();
watchCompiledService();

export function init() {
  if (service.init) {
    return service.init()
  } else {
    return Promise.resolve();
  }
}

export function cleanup() {
  if (service.cleanup) {
    service.cleanup();
  }
}

export default function (req, res, next) {
  return require(webpackConfig.output.path).default(req, res, next);
}
