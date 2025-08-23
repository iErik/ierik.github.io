import { resolve } from 'path'
import { cwd } from 'process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svg from './vite/svg-plugin'
import glsl from 'vite-plugin-glsl'

import paths from './paths.json'
import pkg from './package.json'


const HOST = pkg.env.HOST
const PORT = pkg.env.PORT
const WS = pkg.env.WS

const path = (p: string) => resolve(cwd(), p)

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    glsl(),
    svg({
      defaultImport: 'component',
      wrapped: false,
      wrapperClass: 'svg-wrapper'
    })
  ],

  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.ts',
      '.scss',
      '.json'
    ],

    alias: Object.entries(paths.compilerOptions.paths)
      .reduce((acc, [ key, value ]) => {
        const removeTrailingSlash = (s: string) =>
          s.replace('/*', '')

        return {
          ...acc,
          [removeTrailingSlash(key)]: path(
            removeTrailingSlash(value[0] || ''))
        }
      }, {})
  },

  server: {
    port: PORT || 3000,
    strictPort: true,

    host: HOST || false,
    hmr: !HOST ? undefined : {
      protocol: "ws",
      host: HOST,
      port: WS || 3001,
    },

    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
})
