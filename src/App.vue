<template>
  <div class="app-background">
    <Background />
  </div>

  <main class="main">
    <div :class="navWrapClasses">
      <NavMenu :items="navItems" />
    </div>

    <OverlayScrollbarsComponent
      class="scroll-view"
      @os-scroll="onContentScroll"
      defer
    >
      <div class="content">
        <RouterView v-slot="{ Component }">
          <Transition name="route">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>

      <div class="locale-wrap">
        <LocaleChooser />
      </div>
    </OverlayScrollbarsComponent>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { OverlayScrollbars } from 'overlayscrollbars'
import {
  OverlayScrollbarsComponent
} from 'overlayscrollbars-vue'


import Background from '@components/Background/index.vue'
import NavMenu from '@components/NavMenu/index.vue'
import LocaleChooser from '@components/LocaleChooser/index.vue'


const SCROLL_THRESHOLD = 15
const hideNav = ref(false)
let scrollDelta = 0

const { locale, messages } = useI18n()
const navWrapClasses = computed(() => [
  'nav-wrap',
  hideNav.value ? '-hidden' : ''
])

const navItems = computed(() => {
  const msgs = messages.value[locale.value]
  if (!msgs) return []

  const localeNav = msgs.navMenu || []

  return [
    {
      label: localeNav[0] || 'Homepage',
      route: 'Homepage'
    },
    {
      label: localeNav[1] || 'Portfolio',
      route: 'Portfolio'
    },
    {
      label: localeNav[2] || 'About Me',
      route: 'About'
    }
  ]
})

const onContentScroll = (os: OverlayScrollbars) => {
  const viewport = os.elements().viewport
  const scrollTop = viewport.scrollTop

  const diff = scrollDelta - scrollTop

  if (Math.abs(diff) > SCROLL_THRESHOLD) {
    scrollDelta = scrollTop

    const shouldHide = diff < 0

    if (hideNav.value !== shouldHide)
      hideNav.value = shouldHide
  }
}

</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.app-background {
  position: relative;
  z-index: 1;
}

.main {
  height: 100vh;

  & > .nav-wrap {
    position: fixed;
    display: flex;
    justify-content: center;
    padding-top: 20px;

    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    transition: top 600ms;

    @include mixins.min-width(635px) {
      padding-top: 36px;
    }

    &.-hidden { top: -96px; }
  }

  & > .scroll-view {
    position: relative;
    z-index: 2;
    height: 100%;
    overflow: auto;
  }

  & > .scroll-view .content {
    min-height: calc(100vh - 30px);

    .route-enter-active {
      /*
      transition-timing-function: cubic-bezier(0.86, -0.04, 0.35, 0.87);
      */

      transition-timing-function: cubic-bezier(1, 0.001, 0.34, 1);
      transition-delay: 300ms;
      transition-property: transform, opacity;
      transition-duration: 300ms, 500ms;

      transform-origin: top;
    }

    .route-enter-from {
      opacity: 0;
      transform: scale(0.95);
    }

    .route-enter-to {
      opacity: 1;
      transform: scale(1.0);
    }

    .route-leave-active {
      transition-timing-function: cubic-bezier(1, 0.001, 0.34, 1);
      transition-delay: 0s;
      transition-property: transform, opacity;
      transition-duration: 300ms, 300ms;

      transform-origin: top;
    }

    .route-leave-from {
      //position: absolute;
      opacity: 1;
      transform: scale(1.0);
    }

    .route-leave-to {
      //position: absolute;
      opacity: 0;
      transform: scale(0.95);
    }
  }

  & > .scroll-view .locale-wrap {
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
