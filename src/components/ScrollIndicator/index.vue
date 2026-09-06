<template>
  <div class="scroll-indicator" aria-hidden="true">
    <div class="track">
      <div class="thumb" :style="thumbStyle" />

      <span class="label" :style="labelStyle">
        {{ activeLabel }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from 'vue'

import {
  activeSection
} from '@composables/useActiveSection'

// Track length in px; the thumb is sized and positioned
// inside it from the document's scroll ratio
const TRACK = 190
const MIN_THUMB = 34

type IndicatorItem = {
  label: string
  section: string
}

const props = defineProps<{
  items: IndicatorItem[]
}>()

const progress = ref(0)
const viewRatio = ref(1)

const activeLabel = computed(() =>
  props.items.find(i => i.section === activeSection.value)
    ?.label || '')

const thumbHeight = computed(() =>
  Math.max(MIN_THUMB, viewRatio.value * TRACK))

const thumbTop = computed(() =>
  progress.value * (TRACK - thumbHeight.value))

const thumbStyle = computed(() => ({
  height: `${thumbHeight.value}px`,
  transform: `translateY(${thumbTop.value}px)`
}))

const labelStyle = computed(() => ({
  transform: `translateY(${
    thumbTop.value + thumbHeight.value / 2}px)`
}))

let frame = 0

const measure = () => {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight

  viewRatio.value = Math.min(1,
    window.innerHeight / doc.scrollHeight)

  progress.value = scrollable > 0
    ? Math.min(1, Math.max(0, window.scrollY / scrollable))
    : 0
}

const onScroll = () => {
  if (frame) return

  frame = requestAnimationFrame(() => {
    measure()
    frame = 0
  })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  measure()

  window.addEventListener('scroll', onScroll,
    { passive: true })
  window.addEventListener('resize', onScroll)

  // The page is still growing at mount - fonts land,
  // sections reveal, switching locale changes the copy
  // length - and a stale height sizes the thumb to the
  // whole track
  resizeObserver = new ResizeObserver(onScroll)
  resizeObserver.observe(document.documentElement)
})

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame)

  resizeObserver?.disconnect()
  resizeObserver = null

  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.scroll-indicator {
  position: fixed;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);

  z-index: 10;
  pointer-events: none;

  // Crowds the layout on narrow screens, where the
  // locale chooser also sits inline
  display: none;

  @include mixins.min-width(881px) {
    display: block;
  }

  & > .track {
    position: relative;
    width: 1px;
    height: 190px;

    background-color: rgba(var(--color-fg-rgb), .18);

    & > .thumb {
      position: absolute;
      top: 0;
      left: -1px;

      width: 3px;
      border-radius: 3px;

      background-color: var(--color-fg);
      box-shadow: 0 0 12px rgba(255, 255, 255, .35);

      transition: height 300ms ease;
      will-change: transform;
    }

    & > .label {
      position: absolute;
      top: 0;
      right: 16px;

      // translateY is set inline to follow the thumb;
      // this keeps the text centred on it
      margin-top: -.5em;

      white-space: nowrap;
      font-size: 11px;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: rgba(var(--color-fg-rgb), .75);

      transition: color 300ms;
    }
  }
}
</style>
