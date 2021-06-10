import { readFileSync } from 'fs'

const VUE_DEMI_IIFE = readFileSync(
  require.resolve('vue-demi/lib/index.iife.js'),
  'utf-8'
)

/** @type {import('rollup').Plugin} */
export const injectVueDemi = {
  name: 'inject-vue-demi',
  banner (): string {
    return `${VUE_DEMI_IIFE};\n;`
  }
}

const EMPTY_FILE_ID = '__rollup_empty__'

/** @type {import('rollup').Plugin} */
export const ingoreCss = {
  name: 'ignore-css',
  resolveId (source: string): null | string {
    if (source.endsWith('.css')) {
      return EMPTY_FILE_ID
    }
    return null
  },
  load (id: unknown): null | string {
    return id === EMPTY_FILE_ID ? '' : null
  }
}
