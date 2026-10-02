<template>
  <button
    type="button"
    class="project-card"
    aria-haspopup="dialog"
    :aria-label="project.name"
    @click="emit('open')"
  >
    <span class="header">
      <span v-if="project.icon" class="icn-wrap">
        <Icon class="icon"
          :name="project.icon"
          :size="36"
        />
      </span>

      <span class="meta">
        <span class="name">{{ project.name }}</span>

        <ProjectTags
          class="tags"
          :kind="project.kind"
          :tags="project.tags"
        />
      </span>
    </span>

    <span class="cover">
      <img
        v-if="cover"
        class="image"
        :src="cover.src"
        :srcset="cover.srcset"
        sizes="(min-width: 760px) 440px, 100vw"
        :width="cover.width"
        :height="cover.height"
        :alt="cover.alt"
        loading="lazy"
        decoding="async"
      >

      <span class="view" aria-hidden="true">
        {{ t('pages.portfolio.view') }}
      </span>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Icon from '@components/Icon/index.vue'
import ProjectTags from '@components/ProjectTags/index.vue'
import type { ProjectType } from '@/types'

const props = defineProps<{
  project: ProjectType
}>()

const emit = defineEmits<{
  open: []
}>()

const { t } = useI18n()

const cover = computed(() => props.project.screens[0])
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/motion';

// The whole card is the button, so it has to shed every
// native button style before it can look like a card
.project-card {
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;

  border: 2px solid;
  border-radius: 8px;
  border-color: rgba(199, 198, 198, .38);

  overflow: hidden;

  transition: border-color 300ms, box-shadow 300ms;

  &:hover,
  &:focus-visible {
    border-color: rgba(199, 198, 198, .7);
    box-shadow: 0 0 40px -8px rgba(255, 255, 255, .18);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }

  & > .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    border-bottom: 1px solid rgba(199, 198, 198, .39);

    padding: 14px 20px;

    background-color: rgba(250, 250, 250, .13);
    backdrop-filter: blur(90px);

    & > .icn-wrap {
      display: flex;
    }

    & > .meta > .name {
      display: block;

      font-weight: 550;
      font-size: 13px;
      text-transform: uppercase;
    }

    & > .meta > .tags { margin-top: 4px; }
  }

  & > .cover {
    position: relative;
    display: block;

    // One ratio for every card, whatever the source. The
    // covers are all a window on a coloured backdrop, so
    // the crop only ever eats backdrop
    aspect-ratio: 16 / 10;
    overflow: hidden;

    background-color: rgba(250, 250, 250, .05);

    & > .image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;

      transition: transform 600ms motion.$reveal-ease;
    }

    & > .view {
      position: absolute;
      left: 16px;
      bottom: 16px;

      display: inline-flex;
      align-items: center;
      height: 28px;
      padding: 0 12px;

      border: 1px solid rgba(199, 198, 198, .38);
      border-radius: 14px;
      background-color: rgba(18, 20, 26, .55);
      backdrop-filter: blur(12px);

      font-size: 11px;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;

      opacity: 0;
      transform: translateY(6px);
      transition:
        opacity 300ms,
        transform 300ms motion.$reveal-ease;
    }
  }

  &:hover > .cover,
  &:focus-visible > .cover {
    & > .image { transform: scale(1.03); }

    & > .view {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    & > .cover > .image,
    & > .cover > .view { transition: none; }

    &:hover > .cover > .image,
    &:focus-visible > .cover > .image {
      transform: none;
    }
  }
}
</style>
