<template>
  <canvas
    ref="canvasEl"
    class="ascii-reveal"
    :aria-label="ariaLabel"
    :style="{ cursor: reveal ? 'crosshair' : 'default' }"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  watch,
  onMounted,
  onUnmounted,
  useTemplateRef
} from 'vue'

// Port of Originkit's `ascii-reveal` (preset `base`):
// https://www.originkit.dev/components/ascii-reveal?preset=base
// Only the framework bindings differ; everything below the
// prop declarations is copied verbatim, apart from the two
// changes marked LOCAL.

import {
  DEFAULTS,
  contrastAt,
  compressLocalHighlights,
  placeRect,
  type ColorMode,
  type Fit,
  type RevealOptions
} from './ascii'

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  fit?: Fit
  focusY?: number
  columns?: number
  ramp?: string
  invert?: boolean
  contrast?: number
  colorMode?: ColorMode
  inkColor?: string
  reveal?: boolean
  revealOptions?: RevealOptions
  // LOCAL: 0 is upstream behaviour untouched
  highlightRolloff?: number
}>(), {
  alt: 'ASCII art',
  fit: DEFAULTS.fit,
  focusY: DEFAULTS.focusY,
  columns: DEFAULTS.columns,
  ramp: DEFAULTS.ramp,
  invert: DEFAULTS.invert,
  contrast: DEFAULTS.contrast,
  colorMode: DEFAULTS.colorMode,
  inkColor: DEFAULTS.inkColor,
  reveal: DEFAULTS.reveal,
  revealOptions: () => DEFAULTS.revealOptions,
  highlightRolloff: 0
})

const canvasEl = useTemplateRef<HTMLCanvasElement>('canvasEl')
const ariaLabel = computed(() => props.alt)

const revealSize = computed(() =>
  props.revealOptions?.size ?? DEFAULTS.revealOptions.size)
const revealSoftness = computed(() =>
  props.revealOptions?.softness ?? DEFAULTS.revealOptions.softness)

const prefersReducedMotion = () => window
  .matchMedia('(prefers-reduced-motion: reduce)')
  .matches

// These were useRefs upstream purely to survive re-renders;
// nothing reads them during render, so plain locals do
let offCanvas: HTMLCanvasElement | null = null
let samplerCanvas: HTMLCanvasElement | null = null
let imgEl: HTMLImageElement | null = null
let revealCanvas: HTMLCanvasElement | null = null
let maskCanvas: HTMLCanvasElement | null = null
let blobs: Array<{ x: number; y: number }> = []
let seeded = false
let pointer = { x: -9999, y: -9999, inside: false }

let stop: (() => void) | null = null

// Stands in for useEffect: everything the effect body did,
// returning what its cleanup did
function start() {
  const canvas = canvasEl.value
  if (!canvas) return null

  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const chars = props.ramp && props.ramp.length > 0
    ? props.ramp
    : DEFAULTS.ramp
  const punch = contrastAt(props.contrast)

  let raf = 0
  let alive = true
  let coverRect = { dx: 0, dy: 0, dw: 0, dh: 0 }

  // LOCAL: upstream runs its loop from image load until
  // unmount, repainting every frame wherever the page is.
  // Background/index.vue already holds a permanent rAF, so
  // this one only runs while it can actually be seen.
  let visible = false
  let observer: IntersectionObserver | null = null

  // LOCAL: without hover the reveal would never appear, so
  // on those devices it walks a slow path of its own. Where
  // hover exists it is hover-only, exactly as upstream.
  const canHover = window
    .matchMedia('(hover: hover)')
    .matches

  let hasPointer = false
  let drift = Math.random() * Math.PI * 2

  const BLOB_COUNT = 5
  blobs = Array.from({ length: BLOB_COUNT }, () => ({ x: 0, y: 0 }))
  seeded = false
  pointer = { x: -9999, y: -9999, inside: false }

  function getSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas!.clientWidth || 600
    const h = canvas!.clientHeight || 600
    return { w, h, dpr }
  }

  function buildAscii() {
    const img = imgEl
    if (!img) return
    const { w, h, dpr } = getSize()
    canvas!.width = Math.max(1, Math.round(w * dpr))
    canvas!.height = Math.max(1, Math.round(h * dpr))

    const cols = Math.max(8, Math.round(props.columns))
    const cellW = (w * dpr) / cols
    const fontPx = cellW * 1.7
    const cellH = fontPx
    const rows = Math.max(1, Math.floor((h * dpr) / cellH))

    let sampler = samplerCanvas
    if (!sampler) {
      sampler = document.createElement('canvas')
      samplerCanvas = sampler
    }
    sampler.width = cols
    sampler.height = rows
    const sctx = sampler.getContext('2d', { willReadFrequently: true })
    if (!sctx) return

    const place = placeRect(
      img.width,
      img.height,
      canvas!.width,
      canvas!.height,
      props.fit,
      props.focusY
    )
    sctx.clearRect(0, 0, cols, rows)
    sctx.drawImage(
      img,
      place.dx / cellW,
      place.dy / cellH,
      place.dw / cellW,
      place.dh / cellH
    )

    let data: Uint8ClampedArray
    try {
      data = sctx.getImageData(0, 0, cols, rows).data
    } catch {
      imgEl = null
      return
    }

    let off = offCanvas
    if (!off) {
      off = document.createElement('canvas')
      offCanvas = off
    }
    off.width = canvas!.width
    off.height = canvas!.height
    const octx = off.getContext('2d')
    if (!octx) return
    octx.clearRect(0, 0, off.width, off.height)
    octx.font = fontPx.toFixed(2) + 'px ui-monospace, monospace'
    octx.textBaseline = 'top'

    // LOCAL: luminance is gathered up front so each cell
    // can be measured against its neighbours before the
    // ramp is picked
    const rolloff = props.highlightRolloff
    const lumGrid = new Float32Array(cols * rows)

    for (let i = 0, j = 0; i < lumGrid.length; i++, j += 4) {
      lumGrid[i] = (0.299 * data[j]
        + 0.587 * data[j + 1]
        + 0.114 * data[j + 2]) / 255
    }

    compressLocalHighlights(lumGrid, cols, rows, rolloff)

    const last = chars.length - 1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = r * cols + c
        const i = cell * 4
        const rr = data[i]
        const gg = data[i + 1]
        const bb = data[i + 2]

        let lum = lumGrid[cell]

        // LOCAL: the ink has to follow the compressed
        // luminance too. Leaving the colour at its original
        // brightness while the glyph thins out keeps the
        // highlight exactly as bright as before.
        const raw = (0.299 * rr + 0.587 * gg + 0.114 * bb) / 255
        const k = rolloff > 0 && raw > 0.004 ? lum / raw : 1

        lum = (lum - 0.5) * punch + 0.5
        if (props.invert) lum = 1 - lum
        lum = lum < 0 ? 0 : lum > 1 ? 1 : lum
        const ch = chars[Math.round(lum * last)]
        if (ch === ' ') continue
        octx.fillStyle =
          props.colorMode === 'image'
            ? `rgb(${Math.min(255, Math.round(rr * k) + 30)}, ${Math.min(
                255,
                Math.round(gg * k) + 30
              )}, ${Math.min(255, Math.round(bb * k) + 30)})`
            : props.inkColor
        octx.fillText(ch, c * cellW, r * cellH)
      }
    }

    coverRect = place
  }

  function ensureLayer(layer: HTMLCanvasElement | null) {
    let next = layer
    if (!next) next = document.createElement('canvas')
    if (
      next.width !== canvas!.width ||
      next.height !== canvas!.height
    ) {
      next.width = canvas!.width
      next.height = canvas!.height
    }
    return next
  }

  function updateBlobs() {
    if (blobs.length === 0) return
    const { dpr } = getSize()
    const tx = pointer.x * dpr
    const ty = pointer.y * dpr
    if (!seeded) {
      for (const blob of blobs) {
        blob.x = tx
        blob.y = ty
      }
      seeded = true
      return
    }
    blobs[0].x += (tx - blobs[0].x) * 0.35
    blobs[0].y += (ty - blobs[0].y) * 0.35
    for (let i = 1; i < blobs.length; i++) {
      blobs[i].x += (blobs[i - 1].x - blobs[i].x) * 0.35
      blobs[i].y += (blobs[i - 1].y - blobs[i].y) * 0.35
    }
  }

  // LOCAL: the self-driven path used until a pointer shows up
  function driftPointer() {
    const { w, h } = getSize()
    drift += 0.006

    pointer.x = w * (0.5 + Math.cos(drift) * 0.26)
    pointer.y = h * (0.5 + Math.sin(drift * 0.8) * 0.24)
    pointer.inside = true
  }

  function paint() {
    const off = offCanvas
    if (!off) return
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
    ctx!.drawImage(off, 0, 0)

    const img = imgEl
    if (!props.reveal || !pointer.inside || !img) return

    const { dpr } = getSize()
    const photo = ensureLayer(revealCanvas)
    revealCanvas = photo
    const pctx = photo.getContext('2d')
    const mask = ensureLayer(maskCanvas)
    maskCanvas = mask
    const mctx = mask.getContext('2d')
    if (!pctx || !mctx) return

    pctx.globalCompositeOperation = 'source-over'
    pctx.clearRect(0, 0, photo.width, photo.height)
    pctx.drawImage(
      img,
      coverRect.dx,
      coverRect.dy,
      coverRect.dw,
      coverRect.dh
    )

    mctx.clearRect(0, 0, mask.width, mask.height)
    mctx.save()
    mctx.filter = `blur(${(revealSoftness.value * dpr).toFixed(1)}px)`
    mctx.fillStyle = '#FFFFFF'
    for (let i = 0; i < blobs.length; i++) {
      const t = blobs.length <= 1 ? 0 : i / (blobs.length - 1)
      const radius = revealSize.value * dpr * (1 - t * 0.5)
      mctx.beginPath()
      mctx.arc(blobs[i].x, blobs[i].y, radius, 0, Math.PI * 2)
      mctx.fill()
    }
    mctx.restore()

    pctx.globalCompositeOperation = 'destination-in'
    pctx.drawImage(mask, 0, 0)
    pctx.globalCompositeOperation = 'source-over'
    ctx!.drawImage(photo, 0, 0)
  }

  // LOCAL: on screen but its section has cross-faded out
  function stageHidden() {
    const stage = canvas!.closest('.stage') as HTMLElement | null
    if (!stage) return false

    const opacity = stage.style.getPropertyValue('--stage-opacity')
    return opacity !== '' && parseFloat(opacity) < 0.02
  }

  function loop() {
    if (!alive) return
    raf = requestAnimationFrame(loop)

    if (stageHidden()) return

    if (!canHover && !hasPointer) driftPointer()
    updateBlobs()
    paint()
  }

  function startLoop() {
    if (raf || !alive) return
    raf = requestAnimationFrame(loop)
  }

  function stopLoop() {
    if (!raf) return
    cancelAnimationFrame(raf)
    raf = 0
  }

  // Where hover exists there is nothing to animate until
  // the cursor is over the canvas, so the loop only runs
  // then; without hover the drift needs it running
  // whenever the canvas is on screen.
  function sync() {
    const wanted = visible
      && props.reveal
      && !prefersReducedMotion()
      && (canHover ? pointer.inside : true)

    wanted ? startLoop() : stopLoop()
  }

  function onMove(event: PointerEvent) {
    const rect = canvas!.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    hasPointer = true
    pointer.x = x
    pointer.y = y
    pointer.inside =
      x >= 0 && y >= 0 && x <= rect.width && y <= rect.height

    sync()
  }

  function onLeave() {
    seeded = false

    if (canHover) {
      // Hover-only: leaving puts it back to plain ASCII,
      // and one last paint is needed to clear the reveal
      // because the loop is about to stop
      pointer.inside = false
      sync()
      paint()
      return
    }

    // LOCAL: no hover to leave - hand back to the drift
    hasPointer = false
  }

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    if (!alive) return
    imgEl = img
    buildAscii()
    paint()

    sync()
  }
  if (props.src) img.src = props.src

  let ro: ResizeObserver | null = null
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => {
      buildAscii()
      paint()
    })
    ro.observe(canvas)
  }

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      sync()
    })
    observer.observe(canvas)
  } else {
    visible = true
  }

  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerleave', onLeave)

  return () => {
    alive = false
    stopLoop()
    ro?.disconnect()
    observer?.disconnect()
    canvas.removeEventListener('pointermove', onMove)
    canvas.removeEventListener('pointerleave', onLeave)
  }
}

const restart = () => {
  stop?.()
  stop = start()
}

onMounted(restart)
onUnmounted(() => {
  stop?.()
  stop = null
})

// The dependency array from upstream's useEffect
watch(() => [
  props.src,
  props.fit,
  props.focusY,
  props.columns,
  props.ramp,
  props.invert,
  props.contrast,
  props.colorMode,
  props.inkColor,
  props.reveal,
  props.highlightRolloff,
  revealSize.value,
  revealSoftness.value
], restart)
</script>

<style lang="scss" scoped>
.ascii-reveal {
  display: block;
  width: 100%;
  border-radius: 16px;

  // Not height: 100% - the canvas is the root element and
  // its parent has no height, so that collapses to the
  // canvas's intrinsic 2:1 (340x170 instead of square).
  // getSize() reads clientHeight, so this decides the
  // whole render.
  aspect-ratio: 1;
  height: auto;
}
</style>
