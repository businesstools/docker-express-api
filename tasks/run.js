import { join } from 'path';
import chalk from 'chalk';

async function run(func, options) {
  const start = new Date();
  console.log([
    chalk.blue(format(start)),
    chalk.gray('starting task'),
    chalk.yellow(func.name)
  ].join(' '));

  await func(options);
  const end = new Date();
  const time = end.getTime() - start.getTime();

  console.log([
    chalk.blue(format(end)),
    chalk.gray('task'),
    chalk.yellow(func.name),
    chalk.gray('finished after'),
    chalk.magenta((time * 0.001).toFixed(3) + 's'),
  ].join(' '));
}

export default run;

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

if (module.parent === null && process.argv.length > 2) {
  delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
  const module = process.argv[2];

  const filename = join(__dirname, `${module}.js`); // eslint-disable-line no-underscore-dangle
  const func = require(filename).default; // eslint-disable-line global-require

  run(func).catch(err => console.error(err.stack));
}
