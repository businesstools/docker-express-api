import webpack from 'webpack';
import webpackConfig from './webpack.config';

export default function build() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) return reject(err);

      console.log(stats.toString(webpackConfig.stats));
      resolve();
    });
  });
}
