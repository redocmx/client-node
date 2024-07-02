import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'esm',
            exports: 'named'
        },
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            exports: 'default'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        terser()
    ]
};
