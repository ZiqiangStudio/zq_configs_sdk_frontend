import { config } from '@zq/configs/eslint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dirName = dirname(fileURLToPath(import.meta.url));

export default config({
  autoImport: {
    path: `${dirName}/.eslintrc-auto-import.json`,
  },
});
