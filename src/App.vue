<template>
  <div class="app-background">
    <Background />
  </div>

  <main class="main">
    <div v-if="SHOW_NAV" class="nav-wrap">
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


// Temporarily disabled - flip back to true to restore the
// navbar. NavMenu, navItems and the nav-wrap styles are
// all left intact; only the rendering is switched off.
// Note the section jumps still reserve NAV_OFFSET in
// useLenis.ts for the navbar's height.
const SHOW_NAV = false

const { locale, messages } = useI18n()

// Still used by ScrollIndicator for its section labels,
// so this stays live while the navbar is off
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
      label: localeNav[1] || 'Portfolio',
      section: SECTIONS.Portfolio
    },
    {
      label: localeNav[2] || 'About Me',
      section: SECTIONS.About
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
