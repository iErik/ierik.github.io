<template>
  <span class="project-tags">
    <span
      v-for="tag in props.tags"
      :key="tag"
      :class="getTagClass(tag)"
    >
      {{ tag }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import type { ProjectTag } from '@/types'

const props = defineProps<{
  tags: ProjectTag[]
}>()

const TAG_COLORS: Record<string, ProjectTag[]> = {
  blue: [
    'React',
    'Next',
    'Zustand',
    'Redux',
  ],
  green: [ 'Vue', 'Nuxt' ],
  pink: [ 'Figma', 'Photoshop' ],
  purple: [ 'Electron' ],
  yellow: [ 'WIP' ]
}

const getTagClass = (tag: ProjectTag) => {
  const match = Object
    .entries(TAG_COLORS)
    .find(([ , tags ]) => tags.includes(tag))

  return match ? `tag -${match[0]}` : 'tag'
}
</script>

<style lang="scss" scoped>
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  & > .tag {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    height: 20px;
    border-radius: 4px;
    backdrop-filter: blur(90px);

    font-size: 9px;
    text-transform: uppercase;
    font-weight: 600;
    color: rgba(var(--color-fg-rgb), .75);

    padding: 0 10px;

    &.-blue {
      background-color: rgba(137, 142, 230, .37);
    }

    &.-pink {
      background-color: rgba(var(--color-accent-rgb), .3);
    }

    &.-purple {
      background-color: rgba(185, 137, 230, 0.37);
    }

    &.-green {
      background-color: rgba(137, 230, 142, .37);
    }

    &.-yellow {
      background-color: rgba(230, 216, 137, .37);
    }
  }
}
</style>
