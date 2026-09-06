import Lenis from 'lenis'

import {
  getSectionScrollOffset,
  transitionsActive
} from './useSectionTransitions'

// Height of the fixed navbar, so section headings don't
// land underneath it when we scroll to them
const NAV_OFFSET = -110

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

type ScrollOpts = { immediate?: boolean }

export function scrollToSection(
  sectionId: string,
  { immediate = false }: ScrollOpts = {}
) {
  const target = `#${sectionId}`

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
