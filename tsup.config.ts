import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: false,
  sourcemap: false,
  minify: true,
  clean: true,
  esbuildOptions: (options) => {
   options.footer = {
      js: 'module.exports = module.exports.default;',
    }
  },
  entry: ['src/index.ts'],
})