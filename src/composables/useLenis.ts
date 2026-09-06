import Lenis from 'lenis'

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

  if (lenis) {
    // Lenis clamps every target to the scroll limit it
    // last measured, and that measurement can predate the
    // content it needs to scroll past - re-measure first
    // or the jump silently lands at the top
    lenis.resize()

    lenis.scrollTo(target, {
      offset: NAV_OFFSET,
      immediate
    })

    return
  }

  // Lenis hasn't initialized yet (or never will, under
  // reduced motion) - fall back to the platform
  const el = document.querySelector(target)
  if (!el) return

  el.scrollIntoView({
    behavior: immediate ? 'auto' : 'smooth',
    block: 'start'
  })
}

export default createLenis
