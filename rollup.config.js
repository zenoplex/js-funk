import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'jsFunk',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    babel({ extensions: ['.ts'], exclude: ['node_modules/**'] }),
    terser(),
  ],
};
