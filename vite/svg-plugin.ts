// Taken from github.com/jpkleemans/vite-svg-loader
// and slightly adapted to better fulfill my needs

import fs from 'fs/promises'
import { compileTemplate } from 'vue/compiler-sfc'
import { optimize as optimizeSvg } from 'svgo'
import _debug from 'debug'

const debug = _debug('vite-svg-loader')

const SVG_REGEX = /\.svg(\?(raw|component|skipsvgo))?$/

type SVGLoaderOptions = {
  // True: Enables SVGO, False: Disables it
  svgo?: boolean

  // Whether the wrap the SVG around a custom component,
  // for convinience
  wrapped?: boolean,
  wrapperClass?: string,

  svgoConfig?: { multipass: boolean },
  defaultImport?: 'raw' | 'component' | 'skipsvgo'
}

export default ({
  svgoConfig,
  svgo,
  defaultImport,
  wrapped,
  wrapperClass
}: SVGLoaderOptions = {}) => ({
  name: 'svg-loader',
  enforce: 'pre',
  load: async (id: string) => {
    if (!id.match(SVG_REGEX)) {
      return
    }

    const [ path, typeOverride ] = id.split('?', 2)
    const importType = typeOverride || defaultImport

    if (importType === 'url') {
      // Use Vite's default svg loader
      return
    }

    let svg = await fs.readFile(`${path}`, 'utf-8')
      .catch(_ => debug('\n',
        `${id} couldn't be loaded by vite-svg-loader, ` +
        `fallback to default loader`))

    if (!svg) return

    if (importType === 'raw') {
      return `export default ${JSON.stringify(svg)}`
    }

    if (svgo !== false && typeOverride !== 'skipsvgo')
      svg = optimizeSvg(svg, {
        ...svgoConfig,
        path
      }).data

    // To prevent compileTemplate from removing the style
    // tag
    svg = svg
      .replace(/<style/g, '<component is="style"')
      .replace(/<\/style/g, '</component')

    // remove hardcoded fill and stroke colors to allow
    // us to better control coloring from within SCSS/CSS
    svg = svg
      .replace(/fill="#\d{1,6}"/, '')
      .replace(/stroke="#\d{1,6}"/, '')

    let filename = path.split('/').pop()?.replace('.svg', '')

    const wrapClass = wrapperClass || 'icn-wrapper'
    svg = !wrapped ? svg : `
        <span class="${wrapClass} ${filename || ''}">
          ${svg}
        </span>

      <script setup>
      </script>
    `

    const { code } = compileTemplate({
      id: JSON.stringify(id),
      source: svg,
      filename: path,
      transformAssetUrls: false
    })

    return `${code}\nexport default { render: render }`
  }
})
