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

// LOCAL to this port, not from Originkit.
//
// Limits how far a cell may sit *above its neighbours*,
// leaving its overall level alone, so specular highlights
// stop reading as hard patches.
//
// A global tone curve cannot do this job on this image: the
// bright wall behind the subject and the highlights on his
// face occupy the same luminance range (measured: wall
// median 218, face 99th percentile 221), so any curve that
// tames one flattens the other.
//
// `amount` 0 leaves the grid untouched.
export function compressLocalHighlights(
  lum: Float32Array,
  cols: number,
  rows: number,
  amount: number,
  radius = 4
) {
  if (amount <= 0 || radius < 1) return

  const keep = 1 - Math.min(1, amount)
  const span = radius * 2 + 1
  const pass = new Float32Array(lum.length)
  const blur = new Float32Array(lum.length)

  // Separable box blur: the "surroundings" each cell is
  // measured against
  for (let r = 0; r < rows; r++) {
    const row = r * cols
    for (let c = 0; c < cols; c++) {
      let sum = 0
      for (let k = -radius; k <= radius; k++) {
        const x = Math.min(cols - 1, Math.max(0, c + k))
        sum += lum[row + x]
      }
      pass[row + c] = sum / span
    }
  }

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let sum = 0
      for (let k = -radius; k <= radius; k++) {
        const y = Math.min(rows - 1, Math.max(0, r + k))
        sum += pass[y * cols + c]
      }
      blur[r * cols + c] = sum / span
    }
  }

  for (let i = 0; i < lum.length; i++) {
    const local = blur[i]
    const deviation = lum[i] - local

    // Only the bright side - shadows keep their depth
    if (deviation > 0) lum[i] = local + deviation * keep
  }
}

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
