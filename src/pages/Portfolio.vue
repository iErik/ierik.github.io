<template>
  <section class="portfolio">
    <SectionLabel
      v-reveal
      class="label reveal"
      :section="SECTIONS.Portfolio"
      :label="t('pages.portfolio.eyebrow')"
    />

    <h2 v-reveal class="heading reveal">
      {{ t('pages.portfolio.title') }}
    </h2>

    <div class="projects">
      <ProjectCard
        v-for="(project, index) in projects"
        v-reveal="index"
        :key="project.name"
        :project="project"
        class="reveal"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ProjectCard from '@components/ProjectCard/index.vue'
import SectionLabel from '@components/SectionLabel/index.vue'

import { SECTIONS } from '@/sections'

// IDEA: ProjectCard Carousel
const { t, locale, messages } = useI18n()

const projects = computed(() => {
  const msgs = messages.value[locale.value]
  if (!msgs) return []

  return msgs.pages.portfolio.projects || []
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/motion';

.reveal { @include motion.reveal; }

.portfolio {
  padding-top: 120px;
  padding-bottom: 120px;

  display: flex;
  align-items: center;
  flex-direction: column;

  & > .label { margin-bottom: 18px; }

  & > .heading {
    font-family: var(--brand-font);
    font-weight: 100;
    font-size: clamp(38px, 5.2vw, 42px);
    letter-spacing: .02em;
    text-transform: uppercase;
    margin-bottom: 60px;
  }

  & > .projects {
    display: grid;
    padding: 0 30px;

    width: 100%;
    gap: 30px;

    justify-content: center;
    align-content: center;
    align-items: start;

    grid-auto-rows: min-content;

    // min() on the track floor: a bare minmax(330px, ...)
    // cannot shrink below its minimum, so on a 320px
    // screen the column stayed 330px wide and pushed the
    // page sideways
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(330px, 100%), 470px));

    @include mixins.min-width(415px) {
      grid-template-columns: repeat(
        auto-fit,
        minmax(min(370px, 100%), 470px));
    }
  }
}
</style>
