<template>
  <div class="app-background">
    <Background />
  </div>

  <main class="main">
    <div :class="['nav-wrap', navHidden ? '-hidden' : '']">
      <NavMenu :items="navItems" />
    </div>

    <ScrollIndicator :items="navItems" />

    <div class="content">
      <RouterView />
    </div>

    <div class="locale-wrap">
      <LocaleChooser />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

import Background from '@components/Background/index.vue'
import NavMenu from '@components/NavMenu/index.vue'
import LocaleChooser from '@components/LocaleChooser/index.vue'
import ScrollIndicator from
  '@components/ScrollIndicator/index.vue'

import { SECTIONS } from '@/sections'
import {
  createLenis,
  destroyLenis
} from '@composables/useLenis'
import {
  navHidden,
  startNavVisibility,
  stopNavVisibility
} from '@composables/useNavVisibility'


const { locale, messages } = useI18n()

// Shared by both navigations - the pill menu below
// $rail-breakpoint and the section rail above it - so
// their labels cannot drift apart
const navItems = computed(() => {
  const msgs = messages.value[locale.value]
  if (!msgs) return []

  const localeNav = msgs.navMenu || []

  return [
    {
      label: localeNav[0] || 'Homepage',
      section: SECTIONS.Homepage
    },
    {
      label: localeNav[1] || 'About Me',
      section: SECTIONS.About
    },
    {
      label: localeNav[2] || 'Experience',
      section: SECTIONS.Experience
    },
    {
      label: localeNav[3] || 'Portfolio',
      section: SECTIONS.Portfolio
    }
  ]
})

// Deliberately in setup, not onMounted: children mount
// before their parent, and Landing needs Lenis to already
// exist when it scrolls to a deep-linked section
createLenis()

// Unlike Lenis this one can wait for the DOM: nothing reads
// navHidden before the first paint
onMounted(startNavVisibility)

onUnmounted(() => {
  stopNavVisibility()
  destroyLenis()
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.app-background {
  position: relative;
  z-index: 1;
}

.main {
  & > .nav-wrap {
    position: fixed;
    display: flex;
    justify-content: center;
    padding-top: 20px;

    top: 0px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 10;

    // Hides on the way down, returns on the way up. The X
    // half of the translate is what centres the bar, so
    // every state has to carry it or it jumps sideways
    transition:
      transform 300ms ease,
      opacity 300ms ease;

    &.-hidden {
      transform: translate(-50%, calc(-100% - 20px));
      opacity: 0;
    }

    // Tabbing into a hidden bar would otherwise strand
    // focus on a control that is off screen
    &.-hidden:focus-within {
      transform: translate(-50%, 0);
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    // The section rail takes over from here up; the two
    // are never on screen at the same time
    @include mixins.min-width(mixins.$rail-breakpoint) {
      display: none;
    }

    @include mixins.min-width(635px) {
      padding-top: 36px;
    }
  }

  // Nothing is reserved for the rail: it only appears from
  // $rail-breakpoint up, and by then the widest section
  // (the 1320px portfolio grid) already clears its labels.
  // Keeping the page centred beats padding one side
  & > .content {
    position: relative;
    z-index: 2;
  }

  & > .locale-wrap {
    position: relative;
    z-index: 2;
    padding: 0 0 10px 20px;

    @include mixins.min-width(881px) {
      padding: 0px;
      position: fixed;
      top: 30px;
      right: 20px;
      z-index: 10;
    }
  }
}
</style>
