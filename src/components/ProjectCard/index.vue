<template>
  <div class="project-card">
    <div class="header">
      <div class="icn-wrap">
        <Icon class="icon"
          :name="project.icon"
          :size="64"
        />
      </div>
      <div class="meta">
        <div class="name">
          <Link class="link" external :to="project.repoUrl">
            {{ project.name }}
          </Link>
          <Icon class="icon" name="Link" :size="16" />
        </div>
        <div class="tags">
          <span
            v-for="tag in project.tags"
            :key="tag"
            :class="getTagClass(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <article class="description">
      <p class="text" v-html="project.description" />
    </article>

    <div class="footer">

    </div>
  </div>
</template>

<script lang="ts" setup>
import Link from '@components/Link/index.vue'
import Icon from '@components/Icon/index.vue'
import type { ProjectType, ProjectTag } from '@/types'

defineProps<{
  project: ProjectType
}>()


// Keys are the class modifiers in the stylesheet below -
// a tag missing from here renders with no color
const TAG_COLORS: Record<string, ProjectTag[]> = {
  blue: [
    'React',
    'Next',
    'Zustand',
    'Redux',
    'Electron'
  ],
  green: [ 'Vue', 'Nuxt' ],
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
@use '@styles/utils/mixins';

.project-card {
  display: flex;
  flex-direction: column;

  border: 2px solid;
  border-radius: 8px;
  border-color: rgba(199, 198, 198, .38);


  & > .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(199, 198, 198, .39);

    padding: 20px;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    background-color: rgba(250, 250, 250, .13);
    backdrop-filter: blur(90px);

    & > .icn-wrap {
      @include mixins.icon {
        fill: var(--color-fg);
      }
    }

    & > .meta { margin-left: 20px; }

    & > .meta > .name {
      display: flex;
      align-items: center;
      gap: 6px;

      & > .link {
        font-weight: 550;
        font-size: 16px;
        text-transform: uppercase;
        &:hover { text-decoration: underline; }
      }
    }

    & > .meta > .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;

      & > .tag {
        display: inline-flex;

        align-items: center;
        justify-content: center;

        height: 20px;
        border-radius: 4px;
        backdrop-filter: blur(90px);

        font-size: 10px;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(var(--color-fg-rgb), .75);

        padding: 0 10px;

        &.-blue {
          background-color: rgba(137, 142, 230, .37);
        }

        &.-green { }
        &.-yellow { }
      }
    }
  }

  & > .description {
    background: linear-gradient(95deg,
      rgba(250, 250, 250, .05) 9%,
      rgba(255, 255, 255, .01) 90%,
    );

    backdrop-filter: blur(90px);

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    font-size: 15px;
    padding: 20px;

    // The description is v-html from the locale files, so
    // its anchors carry no scope attribute and a plain
    // selector would never reach them
    :deep(.link) {
      color: var(--color-accent);
    }
  }
}
</style>
