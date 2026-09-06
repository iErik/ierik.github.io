import { ref } from 'vue'

import { sectionIds, type SectionId } from '@/sections'

// Biases the "current" section towards whichever one is
// crossing the middle of the viewport, rather than
// whichever merely has a pixel on screen
const ROOT_MARGIN = '-45% 0px -45% 0px'

// Shared so the navbar can highlight the current section
// without the landing page having to prop-drill it up
// through App.vue
export const activeSection = ref<SectionId>(sectionIds[0])

let observer: IntersectionObserver | null = null

export function observeSections() {
  unobserveSections()

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))

  if (!sections.length) return

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      activeSection.value = entry.target.id as SectionId
    })
  }, { rootMargin: ROOT_MARGIN })

  sections.forEach(section => observer?.observe(section))
}

export function unobserveSections() {
  observer?.disconnect()
  observer = null
}
