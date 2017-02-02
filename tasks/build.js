import webpack from 'webpack';
import chalk from 'chalk';
import webpackConfig from './webpack.config';

export default async function build() {
  try {
    console.log();
    console.log('Building %s (%s)…', chalk.green('client'), chalk.magenta(process.env.NODE_ENV));

    await buildWebpack(webpackConfig);
  } catch (err) {
    throw err;
  }
}

function buildWebpack(webpackConfig) {
  return new Promise((resolve, reject) => {
    try {
      webpack(webpackConfig, (err, stats) => {
        if (err) {
          console.error(err.stack || err);
          if (err.details) {
            console.error(err.details);
          }
          reject(err);
          return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
          console.error(info.errors);
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings);
        }

        console.log(stats.toString(webpackConfig.stats));

        if (webpackConfig.stats.assetsByChunkName) {
          resolve(stats.toJson(webpackConfig.stats).assetsByChunkName);
          return;
        }

        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
