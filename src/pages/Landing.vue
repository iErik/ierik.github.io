<template>
  <div
    ref="landingEl"
    :class="['landing', animated ? '-animated' : '']"
  >
    <div
      v-for="(stage, index) in stages"
      :id="stage.id"
      :key="stage.id"
      class="stage"
      :style="{ zIndex: index + 1 }"
    >
      <div class="pin">
        <component :is="stage.component" />
      </div>

      <!-- Real element, not padding: a sticky box is
           constrained to its containing block's *content*
           box, so padding would give it no room to hold -->
      <div
        v-if="animated && index < stages.length - 1"
        class="hold"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  useTemplateRef
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Homepage from '@pages/Homepage.vue'
import Portfolio from '@pages/Portfolio.vue'
import About from '@pages/About.vue'
import Experience from '@pages/Experience.vue'

import {
  SECTIONS,
  sectionIds,
  sectionOf,
  routeNameOf,
  type RouteName
} from '@/sections'

import {
  activeSection
} from '@composables/useActiveSection'

import {
  useSectionTransitions
} from '@composables/useSectionTransitions'

import { scrollToSection } from '@composables/useLenis'

const route = useRoute()
const router = useRouter()

const componentFor = {
  [SECTIONS.Homepage]: Homepage,
  [SECTIONS.About]: About,
  [SECTIONS.Experience]: Experience,
  [SECTIONS.Portfolio]: Portfolio
}

// Order comes from sections.ts, so reordering there
// reorders the page
const stages = sectionIds.map(id => ({
  id,
  component: componentFor[id]
}))

// Long enough for a full-page smooth scroll to land
const SCROLL_TIMEOUT = 1500

const landingEl = useTemplateRef<HTMLElement>('landingEl')

const { animated } = useSectionTransitions(
  () => landingEl.value)

// The scrollspy rewrites the URL as you scroll, and the
// route watcher scrolls when the URL changes - without
// this flag the two would drive each other in circles
let syncingFromScroll = false

// A URL-driven scroll (back button, deep link) animates
// through every section in between, and each one would
// write itself into the address bar on the way past -
// so the sync stays off until the scroll lands
let pendingSection: string | null = null
let releaseTimer = 0

const holdSyncUntil = (sectionId: string) => {
  pendingSection = sectionId

  // A scroll the user interrupts never reaches its
  // destination, and the URL sync must not stay frozen
  // waiting for it
  clearTimeout(releaseTimer)
  releaseTimer = window.setTimeout(
    () => { pendingSection = null },
    SCROLL_TIMEOUT)
}

watch(activeSection, sectionId => {
  if (pendingSection) {
    if (sectionId !== pendingSection) return

    clearTimeout(releaseTimer)
    pendingSection = null
  }

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

  const sectionId = sectionOf(name as RouteName)

  holdSyncUntil(sectionId)
  scrollToSection(sectionId)
})

const nextFrame = () => new Promise(resolve =>
  requestAnimationFrame(resolve))

onMounted(async () => {
  await nextTick()

  const name = route.name as RouteName
  if (!name || name === 'Homepage') return

  // Hold the URL sync off while the jump lands, so the
  // driver's first reading doesn't rewrite the route
  syncingFromScroll = true

  // One frame so the stages have real heights to measure,
  // then land there instantly rather than animating up
  // from the top on first paint
  await nextFrame()
  scrollToSection(sectionOf(name), { immediate: true })

  await nextFrame()
  syncingFromScroll = false
})

onUnmounted(() => {
  clearTimeout(releaseTimer)
})
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
}

.stage {
  position: relative;

  & > .pin {
    min-height: 100vh;
  }
}

// Everything below is the cross-fade; without this class
// (reduced motion) the sections are plain stacked blocks
.landing.-animated {
  & > .stage > .hold {
    // The hold: how far you scroll while the section
    // stays put and dissolves
    height: var(--fade, 0px);
  }

  & > .stage + .stage {
    // Overlap the previous stage's hold so the two share
    // the same screen space. Cancels the padding above,
    // leaving total page height unchanged
    margin-top: calc(var(--fade, 0px) * -1);
  }

  & > .stage > .pin {
    // --pin-top is (viewport - section height), set by
    // useSectionTransitions: a negative offset that makes
    // the section hold exactly once its bottom edge
    // reaches the bottom of the viewport
    position: sticky;
    top: var(--pin-top, 0px);

    opacity: var(--stage-opacity, 1);
    transform: translateY(var(--stage-shift, 0px));

    will-change: opacity, transform;
  }
}
</style>
