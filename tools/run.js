import { join } from 'path';

async function run(func, options) {
  const start = new Date();
  console.log(`[${format(start)}] Starting '${func.name}'...`);
  await func(options);
  const end = new Date();
  const time = end.getTime() - start.getTime();
  console.log(`[${format(end)}] Finished '${func.name}' after ${time} ms`);
}

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

if (module.parent === null && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = process.argv[2];

  const filename = join(__dirname, `${module}.js`);
  const func = require(filename).default;

  run(func).catch(err => console.error(err.stack));
}

export default run;
