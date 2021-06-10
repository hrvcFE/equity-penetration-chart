/* eslint-disable */
import typescript from 'rollup-plugin-typescript2'
import { terser, Options } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import { injectVueDemi, ingoreCss } from './scripts/rollup'

/** @type {import('rollup').RollupOptions} */
const options = [
  {
    input: 'src/index.ts',
    plugins: [typescript(), postcss()],
    external: ['vue-demi'],
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [
          terser({
            format: {
              comments: false
            }
          } as Options)
        ]
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/index.cjs.min.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        plugins: [
          terser({
            format: {
              comments: false
            }
          } as Options)
        ]
      }
    ]
  },
  {
    input: 'src/global.ts',
    plugins: [resolve(), typescript(), postcss()],
    external: ['vue-demi', 'echarts', 'echarts/core'],
    output: [
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'EquityPenetrationChart',
        exports: 'default',
        sourcemap: true,
        globals: {
          'vue-demi': 'VueDemi'
        },
        plugins: [injectVueDemi]
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'EquityPenetrationChart',
        exports: 'default',
        sourcemap: true,
        globals: {
          'vue-demi': 'VueDemi'
        },
        plugins: [
          injectVueDemi,
          terser({
            format: {
              comments: false
            }
          } as Options)
        ]
      }
    ]
  },
  {
    input: 'src/index.ts',
    plugins: [ingoreCss, dts()],
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    }
  }
]

export default options
