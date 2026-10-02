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
  lightblue: [ 'Webpack', ],
  green: [ 'Vue', 'Nuxt' ],
  pink: [ 'Angular', 'Photoshop' ],
  red: [ 'Figma' ],
  purple: [ 'Electron' ],
  yellow: [ 'Sketch' ],
  brown: [ 'CoffeeScript' ],
  gray: [ 'TypeScript' ],
  silver: [ 'WIP' ]
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

    font-size: 10px;
    text-transform: uppercase;
    font-weight: 670; // six-sevennnn
    color: rgba(var(--color-fg-rgb), .75);

    padding: 0 10px;

    &.-blue {
      background-color: rgba(137, 142, 230, .37);
    }

    &.-lightblue {
      background-color: rgba(108, 138, 176, .37);
    }

    &.-pink {
      background-color: rgba(var(--color-accent-rgb), .3);
    }

    &.-red {
      background-color: rgba(227, 110, 110, .3);
    }

    &.-purple {
      background-color: rgba(185, 137, 230, 0.37);
    }

    &.-green {
      background-color: rgba(137, 230, 142, .37);
    }

    &.-yellow {
      background-color: rgba(227, 225, 110, .37);
    }

    &.-brown {
      background-color: rgba(156, 130, 92, .37);
    }

    &.-gray {
      background-color: rgba(130, 153, 181, 0.37);
    }

    &.-silver {
      background-color: rgba(170, 170, 170, 0.37);
    }
  }
}
</style>
