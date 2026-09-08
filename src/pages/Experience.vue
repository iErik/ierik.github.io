<template>
  <section class="experience">
    <SectionLabel
      v-reveal
      class="label reveal"
      :section="SECTIONS.Experience"
      :label="t('pages.experience.eyebrow')"
    />

    <h2 v-reveal class="heading reveal">
      {{ t('pages.experience.title') }}
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

const experiences = computed(() => {
  const msgs = messages.value[locale.value]

  if (!msgs) return []

  return msgs.pages.experience.items
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
    font-weight: 200;
    font-size: clamp(38px, 5.2vw, 42px);
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
