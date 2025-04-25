import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
    resolve: true
  },
  outDir: 'dist',
  splitting: false,
  sourcemap: false,
  clean: true,
  target: 'es2020',
});