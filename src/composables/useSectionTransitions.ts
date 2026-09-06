import { onMounted, onUnmounted, ref } from 'vue'

import { sectionIds, type SectionId } from '@/sections'
import { activeSection } from './useActiveSection'

// Length of one cross-fade, as a share of the viewport.
// Also the overlap between two stages - the CSS reads it
// back from the --fade custom property so the layout and
// this maths can't drift apart
const FADE_RATIO = 0.6

// How far the outgoing section drifts up, and the
// incoming rises, over the course of a fade
const DRIFT = 40

const clamp = (n: number) => Math.min(1, Math.max(0, n))

let fade = 0

// Offset from a stage's top to the scroll position where
// that section is fully opaque.
//
// A stage's top sits exactly one viewport before the
// previous section's hold begins, and the incoming section
// only finishes fading `fade` px after that - so the
// landing spot is (fade - viewport) from the stage's top,
// which is negative: the stage is pinned in view well
// before its own top scrolls past.
//
export const getSectionScrollOffset = () =>
  fade - window.innerHeight

// False under reduced motion, where the stages are plain
// stacked blocks and a section's top *is* its landing spot
export const transitionsActive = () => fade > 0

type Stage = {
  id: SectionId
  el: HTMLElement
  // Scroll position at which this stage's pin becomes
  // stuck - i.e. its content has been fully seen
  holdStart: number
}

export function useSectionTransitions(
  root: () => HTMLElement | null
) {
  const animated = ref(true)

  let stages: Stage[] = []
  let frame = 0
  let resizeObserver: ResizeObserver | null = null

  const prefersReducedMotion = () => window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .matches

  const measure = () => {
    const viewport = window.innerHeight
    fade = Math.round(viewport * FADE_RATIO)

    root()?.style.setProperty('--fade', `${fade}px`)

    stages = sectionIds
      .map(id => {
        const el = document.getElementById(id)
        if (!el) return null

        const pin = el.firstElementChild as HTMLElement
        const pinHeight = pin?.offsetHeight ?? el.offsetHeight
        const top = el.getBoundingClientRect().top
          + window.scrollY

        // A *negative* sticky top of (viewport - height)
        // engages exactly when the section's bottom edge
        // reaches the bottom of the viewport - i.e. once
        // it has been fully seen. `bottom: 0` cannot do
        // this: sticky only ever pulls an element toward
        // the edge it names, so bottom-sticky shows an
        // element early and releases it, rather than
        // holding one you have scrolled past.
        el.style.setProperty('--pin-top',
          `${Math.min(0, viewport - pinHeight)}px`)

        return {
          id,
          el,
          holdStart: Math.round(top + pinHeight - viewport)
        }
      })
      .filter((s): s is Stage => s !== null)
  }

  const apply = () => {
    if (!stages.length) return

    const y = window.scrollY

    // Each boundary hands one progress value to the two
    // stages either side of it
    const opacity = stages.map(() => 1)
    const shift = stages.map(() => 0)

    stages.forEach((stage, i) => {
      const next = i + 1
      if (next >= stages.length) return

      const progress = clamp(
        (y - stage.holdStart) / (fade || 1))

      // Outgoing: fades and drifts up
      opacity[i] = Math.min(opacity[i], 1 - progress)
      if (progress > 0) shift[i] = -DRIFT * progress

      // Incoming: rises into place as it fades in
      opacity[next] = Math.min(opacity[next], progress)
      shift[next] = DRIFT * (1 - progress)
    })

    let dominant = 0

    stages.forEach((stage, i) => {
      stage.el.style.setProperty(
        '--stage-opacity', String(opacity[i]))
      stage.el.style.setProperty(
        '--stage-shift', `${Math.round(shift[i])}px`)

      // >= so a tie resolves to the later section, which
      // is the one being scrolled into
      if (opacity[i] >= opacity[dominant]) dominant = i
    })

    activeSection.value = stages[dominant].id
  }

  const update = () => {
    measure()
    apply()
  }

  const onScroll = () => {
    if (frame) return

    frame = requestAnimationFrame(() => {
      apply()
      frame = 0
    })
  }

  onMounted(() => {
    if (prefersReducedMotion()) {
      // Layout and driver both off: keeping the overlap
      // without the fades would stack two sections on
      // top of each other
      animated.value = false
      return
    }

    update()

    window.addEventListener('scroll', onScroll,
      { passive: true })
    window.addEventListener('resize', update)

    // Content height moves after mount - fonts land,
    // reveals fire, the locale toggle changes copy length
    resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(document.documentElement)
  })

  onUnmounted(() => {
    if (frame) cancelAnimationFrame(frame)

    resizeObserver?.disconnect()
    resizeObserver = null

    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', update)
  })

  return { animated }
}
