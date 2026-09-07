// Pure helpers copied verbatim from Originkit's
// `ascii-reveal` (preset `base`) - see
// src/components/originkit/README.md.
//
// They live in their own module rather than in the SFC
// because `defineProps`/`withDefaults` are hoisted out of
// setup() and cannot reference locally declared values,
// only imports.

export type ColorMode = 'mono' | 'image'
export type Fit = 'cover' | 'contain'

export interface RevealOptions {
  size: number
  softness: number
}

export const DEFAULTS = {
  fit: 'cover' as Fit,
  focusY: 19,
  columns: 200,
  ramp: ' .:-=+*#%@',
  invert: false,
  contrast: 100,
  colorMode: 'mono' as ColorMode,
  inkColor: '#FFFFFF',
  reveal: true,
  revealOptions: { size: 80, softness: 16 } as RevealOptions
}

export const contrastAt = (value: number) =>
  0.5 + (value / 100) * 2

export const clampFocus = (value: number) =>
  Math.min(100, Math.max(0, typeof value === 'number' ? value : 50))

export function placeRect(
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  fit: Fit,
  focusY: number
) {
  const scale =
    fit === 'contain'
      ? Math.min(boxW / imgW, boxH / imgH)
      : Math.max(boxW / imgW, boxH / imgH)
  const dw = imgW * scale
  const dh = imgH * scale
  const f = fit === 'cover' ? clampFocus(focusY) / 100 : 0.5
  return { dx: (boxW - dw) / 2, dy: (boxH - dh) * f, dw, dh }
}
