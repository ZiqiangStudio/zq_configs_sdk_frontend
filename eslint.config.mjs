import { config } from '@zqstudio/configs/eslint';

export default config({
  vue: false,
  ts: true,
  ignores: ['**/__tests__/**', 'docs'],
});
