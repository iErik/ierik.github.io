<template>
  <div class="app-background">
    <Background />
  </div>

  <main class="main">
    <div class="nav-wrap">
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
import { computed, onUnmounted } from 'vue'
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


const { locale, messages } = useI18n()

// Shared by both navigations - the pill menu below 881px
// and the section rail above it - so their labels cannot
// drift apart
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
onUnmounted(destroyLenis)
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

    // The section rail takes over from here up; the two
    // are never on screen at the same time
    @include mixins.min-width(881px) {
      display: none;
    }

    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    @include mixins.min-width(635px) {
      padding-top: 36px;
    }
  }

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
