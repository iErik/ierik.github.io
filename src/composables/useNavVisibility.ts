import { ref } from 'vue'

import { isProgrammaticScroll } from './useLenis'

// Whether the pill navbar is tucked away. Read by App.vue,
// which only ever moves it with a transform - the bar stays
// in the DOM so focus can bring it back.
//
// Only the pill has this: above $rail-breakpoint its
// wrapper is display: none and the section rail takes over,
// so the class toggles there without effect.
export const navHidden = ref(false)

// Ignore smaller moves, so a trackpad's jitter cannot
// flicker the bar. Same figure the old implementation used
const SCROLL_THRESHOLD = 15

// Always visible this close to the top. Also covers
// rubber-banding, which reports a negative scrollY
const REVEAL_AT = 96

let lastScroll = 0
let frame = 0

const apply = () => {
  const y = window.scrollY

  if (y <= REVEAL_AT) {
    navHidden.value = false
    lastScroll = y

    return
  }

  // A jump the user asked for: clicking a nav item scrolls
  // down, and hiding the menu they just used reads as a bug
  if (isProgrammaticScroll()) {
    navHidden.value = false
    lastScroll = y

    return
  }

  const diff = y - lastScroll
  if (Math.abs(diff) < SCROLL_THRESHOLD) return

  lastScroll = y
  navHidden.value = diff > 0
}

// Same shape as the transition driver's listener: one
// passive listener, coalesced into a frame. Lenis writes
// real scroll positions, so this sees smooth scrolling too
const onScroll = () => {
  if (frame) return

  frame = requestAnimationFrame(() => {
    apply()
    frame = 0
  })
}

export function startNavVisibility() {
  lastScroll = window.scrollY
  navHidden.value = false

  window.addEventListener('scroll', onScroll,
    { passive: true })
}

export function stopNavVisibility() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0

  window.removeEventListener('scroll', onScroll)
}
