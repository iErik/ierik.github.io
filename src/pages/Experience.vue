<template>
  <section class="experience">
    <SectionLabel
      v-reveal
      class="label reveal"
      :section="SECTIONS.Experience"
      :label="t('about.experiences.title')"
    />

    <h2 v-reveal class="heading reveal">
      {{ t('about.experiences.title') }}
    </h2>

    <div class="experiences-wrap">
      <ExperienceList :experiences="experiences" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ExperienceList from '@components/ExperienceList/index.vue'
import SectionLabel from '@components/SectionLabel/index.vue'

import { SECTIONS } from '@/sections'

const { t, locale, messages } = useI18n()

// Copy still lives under `about.experiences` in the locale
// files - only the rendering moved out of About.vue
const experiences = computed(() => {
  const msgs = messages.value[locale.value]

  if (!msgs) return []

  return msgs.about.experiences.items
})
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/motion';

.reveal { @include motion.reveal; }

.experience {
  padding-top: 120px;
  padding-bottom: 120px;

  display: flex;
  align-items: center;
  flex-direction: column;

  & > .label { margin-bottom: 18px; }

  & > .heading {
    font-family: var(--brand-font);
    font-weight: 100;
    font-size: clamp(38px, 5.2vw, 76px);
    letter-spacing: .02em;
    text-transform: uppercase;
    padding: 0 25px;
  }

  & > .experiences-wrap {
    margin-top: 75px;
    padding: 0 25px;
  }
}
</style>
