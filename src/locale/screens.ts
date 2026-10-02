import type { ProjectScreen } from '@/types'

// Every cover is exported at 16:10 - 2400x1500, or a
// larger multiple - and turned into one AVIF per width by
// `pnpm covers` (scripts/covers.sh), whose WIDTHS must stay
// in step with the list below.
//
// The *-cover originals are never imported, so they never
// ship. Only the alt text is translated: each locale
// spreads one of these and adds its own
type Screen = Omit<ProjectScreen, 'alt'>

const WIDTHS = [ 960, 1600, 2400 ] as const

const DIR = '../assets/img/projects'

const files = import.meta.glob<string>(
  '../assets/img/projects/*.avif',
  { eager: true, import: 'default' })

const fileFor = (name: string, width: number) => {
  const file = files[`${DIR}/${name}-${width}.avif`]

  // Fail at load, not with a broken image in a card
  if (!file) throw new Error(
    `Missing ${name}-${width}.avif - see screens.ts`)

  return file
}

const screen = (name: string): Screen => ({
  src: fileFor(name, 1600),
  srcset: WIDTHS
    .map(width => `${fileFor(name, width)} ${width}w`)
    .join(', '),

  // Only the ratio is read from these, and every cover
  // shares it
  width: 2400,
  height: 1500
})

export const screens = {
  bulletin: screen('bulletin'),
  grimoire: screen('grimoire'),
  libellus: screen('libellus'),
  ierik: screen('ierik'),
  medley: screen('medley'),
  tidder: screen('tidder')
}
