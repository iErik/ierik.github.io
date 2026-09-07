<template>
  <nav
    class="scroll-indicator"
    :aria-label="t('nav.sections')"
  >
    <button
      v-for="item in props.items"
      :key="item.section"
      type="button"
      :class="['section', isActive(item.section) ? '-active' : '']"
      :aria-current="isActive(item.section) ? 'true' : undefined"
      :aria-label="item.label"
      @click="() => scrollToSection(item.section)"
    >
      <!-- The name is on the button too, because the
           visible label is hidden until hover and an
           accessible name must not depend on that -->
      <span class="label" aria-hidden="true">
        {{ item.label }}
      </span>

      <span class="bar">
        <span
          class="fill"
          :style="fillStyle(item.section)"
        />
      </span>
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { scrollToSection } from '@composables/useLenis'
import {
  activeSection,
  sectionProgress
} from '@composables/useActiveSection'

type IndicatorItem = {
  label: string
  section: string
}

const props = defineProps<{
  items: IndicatorItem[]
}>()

const { t } = useI18n()

const isActive = (section: string) =>
  activeSection.value === section

// Only the active segment fills; the rest stay at the
// track colour. Progress comes from the transition driver
// rather than being measured again here.
const fillStyle = (section: string) => ({
  transform: `scaleY(${
    isActive(section) ? sectionProgress.value : 0})`
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

$bar-width: 2px;
$segment-height: 42px;
// The only break between segments - they otherwise sit
// flush, so the rail reads as one strip
$separator: 2px;

.scroll-indicator {
  position: fixed;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);

  z-index: 10;

  display: none;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;

  // Below this the pill navbar takes over - the two must
  // never be on screen together
  @include mixins.min-width(881px) {
    display: flex;
  }

  & > .section {
    position: relative;
    display: block;

    // Horizontal padding only: the bar stays hairline and
    // the button is what you actually hit, but vertical
    // padding would reopen the gap between segments
    padding: 0 6px;
    border: none;
    background: none;
    cursor: pointer;

    border-radius: 3px;

    &:not(:last-child) { margin-bottom: $separator; }

    &:focus-visible {
      // At 2px wide there is otherwise nothing to see
      // when tabbing here
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
    }

    & > .bar {
      display: block;
      position: relative;
      overflow: hidden;

      width: $bar-width;
      height: $segment-height;

      // Square where segments meet, rounded only at the
      // two ends of the rail, so the run reads as one
      // strip rather than four capsules
      border-radius: 0;

      background-color: rgba(var(--color-fg-rgb), .18);
      transition: background-color 300ms;
    }

    &:first-child > .bar {
      border-radius: $bar-width $bar-width 0 0;
    }

    &:last-child > .bar {
      border-radius: 0 0 $bar-width $bar-width;
    }

    & > .bar > .fill {
      position: absolute;
      inset: 0;

      background-color: var(--color-fg);
      box-shadow: 0 0 12px rgba(255, 255, 255, .35);

      transform-origin: top;
      // Scroll-driven, so it should track exactly rather
      // than easing behind the page
      will-change: transform;
    }

    & > .label {
      position: absolute;
      top: 50%;
      right: 100%;
      margin-right: 8px;
      transform: translateY(-50%);

      white-space: nowrap;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: rgba(var(--color-fg-rgb), .75);

      opacity: 0;
      transition: opacity 250ms, color 250ms;
    }

    &:hover > .bar,
    &:focus-visible > .bar {
      background-color: rgba(var(--color-fg-rgb), .4);
    }

    // Hover and focus surface the other three; the active
    // one is always readable
    &:hover > .label,
    &:focus-visible > .label,
    &.-active > .label {
      opacity: 1;
    }

    &.-active > .label {
      color: var(--color-fg);
    }

    // At the top of a section the fill is still zero, so
    // without this the active segment looks identical to
    // the rest and only the label gives it away
    &.-active > .bar {
      background-color: rgba(var(--color-fg-rgb), .6);
      box-shadow: 0 0 10px rgba(255, 255, 255, .18);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-indicator > .section {
    & > .bar,
    & > .label { transition: none; }
  }
}
</style>
