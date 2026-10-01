import Lenis from 'lenis'

import {
  getSectionScrollOffset,
  transitionsActive
} from './useSectionTransitions'

// Height of the fixed navbar, so section headings don't
// land underneath it when we scroll to them
const NAV_OFFSET = 0

// How long a smooth jump may take to land. While one is in
// flight the navbar must not hide: clicking a nav item
// scrolls down, and the menu would slide away the moment it
// was used. A deadline rather than a timer - nothing to
// cancel, and a second jump just extends it
const SCROLL_SETTLE_MS = 1500

let programmaticUntil = 0

export const isProgrammaticScroll = () =>
  Date.now() < programmaticUntil

let lenis: Lenis | null = null

export function createLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    autoRaf: true,
    // Lenis bails out on its own when the user asks for
    // reduced motion, no need to guard the call sites
    respectReducedMotion: true
  })

  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}

// For modals. A native <dialog> makes the page inert but
// does not stop it scrolling, and Lenis drives the scroll
// from its own wheel listeners. stop() swallows the wheel
// everywhere except inside [data-lenis-prevent], and sets
// the lenis-stopped class, which lenis.css turns into
// overflow: clip on the document
export function pauseScroll() {
  if (lenis) return lenis.stop()

  document.documentElement.style.overflow = 'hidden'
}

export function resumeScroll() {
  if (lenis) return lenis.start()

  document.documentElement.style.overflow = ''
}

type ScrollOpts = { immediate?: boolean }

export function scrollToSection(
  sectionId: string,
  { immediate = false }: ScrollOpts = {}
) {
  const target = `#${sectionId}`

  programmaticUntil = Date.now() + SCROLL_SETTLE_MS

  // With transitions on, the section is pinned in the
  // viewport by the time it's fully opaque, so navbar
  // clearance doesn't apply - the landing spot is fully
  // determined by the transition geometry
  const offset = transitionsActive()
    ? getSectionScrollOffset()
    : NAV_OFFSET

  if (lenis) {
    // Lenis clamps every target to the scroll limit it
    // last measured, and that measurement can predate the
    // content it needs to scroll past - re-measure first
    // or the jump silently lands at the top
    lenis.resize()

    lenis.scrollTo(target, { offset, immediate })

    return
  }

  // Lenis hasn't initialized yet (or never will, under
  // reduced motion) - fall back to the platform
  const el = document.getElementById(sectionId)
  if (!el) return

  const top = el.getBoundingClientRect().top
    + window.scrollY + offset

  window.scrollTo({
    top,
    behavior: immediate ? 'auto' : 'smooth'
  })
}

export default createLenis
