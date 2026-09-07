<template>
  <p class="section-label">
    <span class="index">{{ index }}</span>
    <span class="dash">—</span>
    <span class="label">{{ label }}</span>
  </p>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { sectionIds, type SectionId } from '@/sections'

const props = defineProps<{
  section: SectionId
  label: string
}>()

// Numbered from sections.ts, so reordering the page
// renumbers the labels instead of leaving them lying
const index = computed(() => {
  const position = sectionIds.indexOf(props.section)

  return String(position + 1).padStart(2, '0')
})
</script>

<style lang="scss" scoped>
.section-label {
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;

  color: rgba(var(--color-fg-rgb), .45);

  & > .index { color: var(--color-accent); }
  & > .dash { opacity: .5; }
}
</style>
