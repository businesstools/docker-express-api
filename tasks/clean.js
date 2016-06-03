import del from 'del';
import fs from 'fs';

async function clean() {
  await del(['.tmp', 'dist/*'], { dot: true });
}

export default clean;
