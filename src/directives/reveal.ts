import type { Directive } from 'vue'

const REVEALED = '-revealed'
const THRESHOLD = 0.15

// Cascade step for children of a grid or list, so they
// don't all pop in at once
const STAGGER_MS = 70

const prefersReducedMotion = () => window
  .matchMedia('(prefers-reduced-motion: reduce)')
  .matches

const observers = new WeakMap<
  HTMLElement,
  IntersectionObserver
>()

// v-reveal        -> fades/slides in on first sight
// v-reveal="idx"  -> same, delayed by its position
export type RevealDirective =
  Directive<HTMLElement, number | undefined>

// The section cross-fade already carries a stage's first
// screenful, so revealing those items too would animate
// them twice
const isAboveTheFold = (el: HTMLElement) => {
  const stage = el.closest('.stage')
  if (!stage) return false

  const offsetInStage = el.getBoundingClientRect().top
    - stage.getBoundingClientRect().top

  return offsetInStage < window.innerHeight
}

const reveal: RevealDirective = {
  mounted(el, binding) {
    const index = binding.value || 0

    if (index > 0)
      el.style.transitionDelay =
        `${index * STAGGER_MS}ms`

    if (prefersReducedMotion()) {
      el.classList.add(REVEALED)
      return
    }

    // One frame so layout has settled before measuring
    requestAnimationFrame(() => {
      if (isAboveTheFold(el)) {
        el.style.transitionDelay = ''
        el.classList.add(REVEALED)
        return
      }

      observe(el)
    })
  },

  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  }
}

function observe(el: HTMLElement) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      entry.target.classList.add(REVEALED)
      // Reveals shouldn't replay on the way back up
      observer.unobserve(entry.target)
    })
  }, { threshold: THRESHOLD })

  observer.observe(el)
  observers.set(el, observer)
}

export default reveal
