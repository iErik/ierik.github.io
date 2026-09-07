<template>
  <nav class="nav-menu" :aria-label="t('nav.primary')">
    <div
      v-for="item in props.items"
      :key="item.section"
      class="item"
    >
      <button
        type="button"
        :class="linkClasses(item.section)"
        :aria-current="isActive(item.section)
          ? 'true' : undefined"
        @click="() => scrollToSection(item.section)"
      >
        <span class="label">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { scrollToSection } from '@composables/useLenis'
import {
  activeSection
} from '@composables/useActiveSection'

const { t } = useI18n()

type NavMenuItem = {
  label: string
  section: string
}

const props = defineProps<{
  items: NavMenuItem[]
}>()

const isActive = (section: string) =>
  activeSection.value === section

const linkClasses = (section: string) => [
  'link',
  isActive(section) ? '-active' : ''
]
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.nav-menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // Four sections don't fit a 375px screen at the desktop
  // sizing - the pill overflowed and "About me" broke
  // mid-label - so the small tier is deliberately tight
  padding: 0 14px;

  height: 60px;
  border: 1px solid;
  border-color: rgba(199, 198, 198, .38);
  border-radius: 45px;

  // It is centred with a translate, so an overflow would
  // bleed off both edges
  max-width: calc(100vw - 24px);

  background-color: rgba(250, 250, 250, .13);
  backdrop-filter: blur(90px);

  @include mixins.min-width(635px) {
    padding: 0 45px;
  }

  & > .item {
    & > .link {
      display: flex;
      align-items: center;
      min-height: 44px;

      border: none;
      background: none;
      padding: 0;
      cursor: pointer;

      // Matches what the Link component used to give
      // these when they were router-links
      font-family: var(--base-font);
      font-weight: var(--base-font-weight);
      text-transform: uppercase;

      color: rgba(var(--color-fg-rgb), .6);
      transition: color 300ms, text-shadow 300ms;

      &:hover { color: rgba(var(--color-fg-rgb), .85); }

      &.-active {
        color: var(--color-fg);
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      }
    }

    & > .link > .label {
      font-size: 10px;
      // Without this a label breaks in the middle rather
      // than the row wrapping between items
      white-space: nowrap;

      @include mixins.min-width(415px) { font-size: 12px; }
      @include mixins.min-width(635px) { font-size: 17px; }
    }

    &:not(:last-child) {
      display: inline-flex;
      align-items: center;
      padding-right: 7px;

      &::after {
        display: inline-block;
        content: '';
        border-radius: 50%;
        background-color: var(--color-accent);
        width: 5px;
        height: 5px;
        margin-left: 7px;
      }

      @include mixins.min-width(415px) {
        padding-right: 10px;
        &::after { margin-left: 10px; }
      }

      @include mixins.min-width(635px) {
        padding-right: 24px;
        &::after { margin-left: 24px; }
      }
    }
  }
}
</style>
