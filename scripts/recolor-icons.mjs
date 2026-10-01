// Points the icon SVGs at CSS for their colour, by
// rewriting every hardcoded paint in the artwork to
// currentColor. base/_icons.scss then drives the whole set
// from --icon-color.
//
//   pnpm icons:recolor              rewrite in place
//   pnpm icons:recolor --dry-run    report only
//   pnpm icons:recolor --force      include two-tone icons
//
// Why this is needed: the vendored svg plugin only strips
// *hex* paints, and Figma exports these as the named
// colours black and white, so they survive - which is how
// an icon ends up drawn black on a dark header.
//
// Two-tone icons are SKIPPED unless --force. Most of the
// set is one colour and flattening it to currentColor is
// exactly right, but a mark like the iErik cube draws dark
// edges against white faces: collapse both to one colour
// and it turns into a silhouette. Those files name a
// variable per tone instead (see --icon-color-contrast),
// which is why they no longer trip this check.
//
// Left alone on purpose:
//  - anything inside <mask>, <clipPath>, <pattern>,
//    <filter>, <defs> or a gradient: those paints are
//    machinery. Libellus's outline is cut by a mask whose
//    black and white decide what shows, and iErik's art is
//    clipped the same way
//  - fill="none", which is how stroke-only shapes stay
//    unfilled, plus transparent, currentColor and url(...)
//  - the root <svg> fill, which CSS overrides anyway
//  - fill-opacity, stroke-opacity, fill-rule, clip-rule:
//    the tonal structure of each mark lives there and
//    rides along untouched

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = join(ROOT, 'src/assets/icons')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const force = args.includes('--force')

const unknown = args.filter(a =>
  !['--dry-run', '--force'].includes(a))

if (unknown.length) {
  console.error(`unknown option: ${unknown[0]}`)
  console.error('usage: [--dry-run] [--force]')
  process.exit(2)
}

// Elements whose subtree is machinery, not artwork
const SKIP_INSIDE = new Set([
  'mask',
  'clippath',
  'pattern',
  'filter',
  'defs',
  'lineargradient',
  'radialgradient',
  'symbol',
  'marker'
])

// Paint values that mean something other than a colour
const KEEP = new Set([
  'none',
  'transparent',
  'currentcolor',
  'inherit',
  'initial',
  'unset',
  'context-fill',
  'context-stroke'
])

const isColour = value => {
  const v = value.trim().toLowerCase()

  if (!v) return false
  if (KEEP.has(v)) return false
  if (v.startsWith('url(')) return false
  if (v.startsWith('var(')) return false

  return true
}

// Walks the artwork, handing every element's attributes to
// `visit`. Returns whatever the visits accumulated
const walkArtwork = (source, visit) => {
  let depth = 0
  let seenRoot = false

  const out = source.replace(
    /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|[^>"])*)(\/?)>/g,
    (match, closing, rawName, attrs, selfClose) => {
      const name = rawName.toLowerCase()
      const machinery = SKIP_INSIDE.has(name)

      if (closing) {
        if (machinery) depth = Math.max(0, depth - 1)
        return match
      }

      const isRoot = name === 'svg' && !seenRoot
      if (name === 'svg') seenRoot = true

      const inside = depth > 0

      if (machinery && !selfClose) depth += 1

      if (isRoot || machinery || inside) return match

      const next = visit(attrs)
      if (next === undefined) return match

      return `<${rawName}${next}${selfClose}>`
    })

  return out
}

const tonesIn = source => {
  const tones = new Set()

  walkArtwork(source, attrs => {
    for (const [, , value] of attrs
      .matchAll(/\s(fill|stroke)="([^"]*)"/g)) {
      if (isColour(value)) tones.add(value.trim().toLowerCase())
    }

    return undefined
  })

  return tones
}

const recolour = source => {
  let changed = 0

  const out = walkArtwork(source, attrs => {
    let next = attrs

    for (const name of ['fill', 'stroke']) {
      const re = new RegExp(`(\\s${name}=")([^"]*)(")`, 'g')

      next = next.replace(re, (match, open, value, close) => {
        if (!isColour(value)) return match

        changed += 1
        return `${open}currentColor${close}`
      })
    }

    return next
  })

  return { out, changed }
}

const files = readdirSync(DIR)
  .filter(f => f.endsWith('.svg'))
  .sort()

let touched = 0
let total = 0
let skipped = 0

for (const file of files) {
  const path = join(DIR, file)
  const source = readFileSync(path, 'utf8')

  const tones = tonesIn(source)

  if (tones.size > 1 && !force) {
    skipped += 1
    console.log(`skipped ${file}: ${tones.size} tones` +
      ` (${[...tones].join(', ')}) - give each one a` +
      ` variable, or pass --force to flatten them`)
    continue
  }

  const { out, changed } = recolour(source)
  if (!changed) continue

  touched += 1
  total += changed

  console.log(`${dryRun ? 'would rewrite' : 'rewrote'}` +
    ` ${changed} paints in ${file}`)

  if (!dryRun) writeFileSync(path, out)
}

console.log(`${files.length} icons, ${total} paints` +
  ` ${dryRun ? 'to rewrite' : 'rewritten'}, ` +
  `${touched} ${dryRun ? 'affected' : 'changed'}` +
  `, ${skipped} skipped`)
