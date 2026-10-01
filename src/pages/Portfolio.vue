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
      <!-- The reveal sits on a wrapper, not the card: both
           set a transition on their root, and on one
           element whichever stylesheet loads last would
           silently cancel the other -->
      <div
        v-for="(project, index) in projects"
        v-reveal="index"
        :key="project.name"
        class="item reveal"
      >
        <ProjectCard
          :project="project"
          @open="openIndex = index"
        />
      </div>
    </div>

    <ProjectDialog
      :project="openProject"
      @close="openIndex = null"
    />
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ProjectCard from '@components/ProjectCard/index.vue'
import ProjectDialog from '@components/ProjectDialog/index.vue'
import SectionLabel from '@components/SectionLabel/index.vue'

import { SECTIONS } from '@/sections'

// IDEA: ProjectCard Carousel
const { t, locale, messages } = useI18n()

const projects = computed(() => {
  const msgs = messages.value[locale.value]
  if (!msgs) return []

  return msgs.pages.portfolio.projects || []
})

// An index, not the project: switching locale with the
// dialog open then swaps in the translated entry instead
// of holding on to the old one
const openIndex = ref<number | null>(null)

const openProject = computed(() => openIndex.value === null
  ? null
  : projects.value[openIndex.value] ?? null)
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
    font-weight: 200;
    font-size: clamp(38px, 5.2vw, 42px);
    letter-spacing: .02em;
    text-transform: uppercase;
    margin-bottom: 60px;
  }

  // Flex rather than grid so a short last row is centred
  // instead of left hanging at the start
  & > .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;

    width: 100%;
    max-width: 1320px;
    padding: 0 30px;

    & > .item {
      flex: 0 0 100%;
      max-width: 470px;
      min-width: 0;
    }

    // Bases are fractions of the row, so a card can never
    // be too wide for its line and wrap early, whatever
    // the container ends up being
    @include mixins.min-width(760px) {
      & > .item {
        flex-basis: calc((100% - 30px) / 2);
        max-width: none;
      }
    }

    // Late enough that three columns arrive at their full
    // ~420px rather than squeezed
    @include mixins.min-width(1322px) {
      & > .item { flex-basis: calc((100% - 60px) / 3); }
    }
  }
}
</style>
