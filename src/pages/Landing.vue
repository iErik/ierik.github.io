<template>
  <div class="landing">
    <section :id="SECTIONS.Homepage" class="section">
      <Homepage />
    </section>

    <section :id="SECTIONS.Portfolio" class="section">
      <Portfolio />
    </section>

    <section :id="SECTIONS.About" class="section">
      <About />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Homepage from '@pages/Homepage.vue'
import Portfolio from '@pages/Portfolio.vue'
import About from '@pages/About.vue'

import {
  SECTIONS,
  sectionOf,
  routeNameOf,
  type RouteName
} from '@/sections'

import {
  activeSection,
  observeSections,
  unobserveSections
} from '@composables/useActiveSection'

import { scrollToSection } from '@composables/useLenis'

const route = useRoute()
const router = useRouter()

// The scrollspy rewrites the URL as you scroll, and the
// route watcher scrolls when the URL changes - without
// this flag the two would drive each other in circles
let syncingFromScroll = false

watch(activeSection, sectionId => {
  const name = routeNameOf(sectionId)
  if (!name || name === route.name) return

  syncingFromScroll = true

  // replace, not push - otherwise scrolling the page
  // stacks a history entry per section
  router
    .replace({ name })
    .finally(() => { syncingFromScroll = false })
})

watch(() => route.name, name => {
  if (syncingFromScroll || !name) return

  scrollToSection(sectionOf(name as RouteName))
})

const nextFrame = () => new Promise(resolve =>
  requestAnimationFrame(resolve))

onMounted(async () => {
  await nextTick()

  const name = route.name as RouteName

  if (name && name !== 'Homepage') {
    // Hold the scrollspy off: it would otherwise observe
    // the still-at-top page and rewrite the URL back to
    // Homepage before the jump has landed
    syncingFromScroll = true

    // One frame so the sections have real heights to
    // measure, then land there instantly rather than
    // animating up from the top on first paint
    await nextFrame()
    scrollToSection(sectionOf(name), { immediate: true })
  }

  // Start observing only once the jump has been painted
  await nextFrame()

  observeSections()
  syncingFromScroll = false
})

onUnmounted(unobserveSections)
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
}

.section {
  position: relative;
}
</style>
