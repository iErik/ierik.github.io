# Originkit vendored source

`ascii-reveal-base.tsx` is the **unmodified** payload from Originkit:

```
originkit: get ascii-reveal
  name: ascii-reveal   preset: base
  stack: vite   styling: css   typescript: true
```

<https://www.originkit.dev/components/ascii-reveal?preset=base>

## It is not built

This is a **React** component and this is a Vue project — `tsconfig.json` sets
`jsxImportSource: "vue"` and `vite.config.ts` registers only
`@vitejs/plugin-vue`, so it cannot compile here. Nothing imports it, and
`tsconfig.json` excludes `src/components/originkit/**/*.tsx` so `vue-tsc`
skips it.

It is kept purely so a future `originkit add` can be diffed against the
version this port was made from.

## The port

`src/components/AsciiReveal/index.vue` is the Vue equivalent. Only the
framework bindings differ:

| upstream | port |
|---|---|
| `useRef` on the canvas | `useTemplateRef('canvasEl')` |
| the other mutable `useRef`s | plain locals — they were never reactive |
| `useEffect(fn, deps)` + cleanup | `start()`/`stop()` from `onMounted`, re-run by a `watch` on the same deps, torn down in `onUnmounted` |
| JSX `<canvas>` | template `<canvas>` |
| destructured props with defaults | `withDefaults(defineProps<…>())`, same `DEFAULTS` |

Everything else — `contrastAt`, `clampFocus`, `placeRect`, `buildAscii`,
`ensureLayer`, `updateBlobs`, `paint`, `loop`, `onMove`, `onLeave` — is copied
verbatim.

**Two deliberate additions**, both marked `LOCAL:` in the port so they stay
easy to spot when diffing:

1. **Auto-drift.** Upstream only reveals while a pointer is inside the canvas,
   so a touch device would never see the photo. When no real pointer has been
   seen, the reveal target walks a slow closed path by itself.
2. **Visibility gating.** Upstream starts its rAF on image load and only stops
   on unmount, repainting every frame regardless of whether it is on screen.
   `Background/index.vue` already runs a permanent loop, so the port stops
   its own via an `IntersectionObserver` plus the `--stage-opacity` check used
   by `MonogramCube`. Where hover exists the loop also only runs while the
   pointer is actually over the canvas.
3. **`highlightRolloff` prop** (`compressLocalHighlights` in `ascii.ts`).
   Specular highlights on the face rendered as hard white patches. A *global*
   tone curve cannot fix that on this image — measured, the bright wall behind
   the subject has a median of 218 while the face's 99th percentile is 221, so
   the two overlap and any curve that tames one flattens the other. Instead
   each cell's excess **over its own neighbourhood** is compressed, which
   leaves overall tonality alone. Applied to the ink colour as well as the
   glyph choice; without both, the character thins out while the colour stays
   just as bright. `0` is an exact identity, so the component still behaves
   like upstream when the prop is unset.
