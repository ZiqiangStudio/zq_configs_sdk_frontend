import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/eslint/index.ts', 'src/prettier/index.ts'],
});
