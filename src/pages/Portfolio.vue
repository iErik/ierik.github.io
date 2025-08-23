<template>
  <section class="portfolio">
    <div class="projects">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ProjectCard from '@components/ProjectCard/index.vue'

// IDEA: ProjectCard Carousel
const { locale, messages } = useI18n()

const projects = computed(() => {
  const msgs = messages.value[locale.value]
  if (!msgs) return []

  return msgs.portfolio.projects || []
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.portfolio {
  padding-top: 200px;
  // Not really working:
  min-height: 100%;
  //height: 100%; TODO Center cards on the screen

  display: flex;
  align-items: center;
  flex-direction: column;

  & > .projects {
    display: grid;
    padding: 0 30px;
    height: 100%;

    padding-bottom: 100px;
    width: 100%;
    gap: 30px;

    justify-content: center;
    align-content: center;

    grid-auto-rows: 600px;
    grid-template-columns: repeat(
      auto-fit,
      minmax(330px, 470px));

    @include mixins.min-width(415px) {
      grid-template-columns: repeat(
        auto-fit,
        minmax(370px, 470px));
    }
  }
}
</style>
