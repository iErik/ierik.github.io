<template>
  <section class="about">
    <div class="inner">
      <div class="lead">
        <SectionLabel
          v-reveal
          class="reveal"
          :section="SECTIONS.About"
          :label="t('pages.about.presentation.eyebrow')"
        />

        <h2 v-reveal class="headline reveal">
          {{ headline.lead }}
          <span class="accent">{{ headline.accent }}</span>
        </h2>

        <p v-reveal class="text reveal">
          {{ t('pages.about.presentation.text') }}
        </p>
      </div>

      <div v-reveal class="figure reveal">
        <AsciiReveal
          class="portrait-ascii"
          :color-mode="'image'"
          :src="portrait"
          :alt="t('pages.about.presentation.role')"
          :columns="120"
          :contrast="35"
          :highlight-rolloff="0.55"
          :focus-y="14"
          :reveal-options="{ size: 50, softness: 16 }"
        />
      </div>
    </div>

    <div class="skills-wrap">
      <h3 v-reveal class="heading reveal">
        {{ t('pages.about.skills.title') }}
      </h3>

      <div class="skills">
        <SkillCard
          v-for="(skill, index) in primarySkills"
          v-reveal="index"
          :key="skill.label"
          :icon="skill.icon"
          :label="skill.label"
          class="reveal"
        />
      </div>

      <div class="chips">
        <SkillCard
          v-for="(skill, index) in chipSkills"
          v-reveal="index"
          :key="skill"
          :label="skill"
          chip
          class="reveal"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import SkillCard from '@components/SkillCard/index.vue'
import SectionLabel from '@components/SectionLabel/index.vue'
import AsciiReveal from '@components/AsciiReveal/index.vue'

import type { IconName } from '@components/Icon/index.vue'

import { SECTIONS } from '@/sections'
import portrait from '@assets/img/profile_picture.jpg'

const { t } = useI18n()

const headline = computed(() => ({
  lead: t('pages.about.presentation.title'),
  accent: t('pages.about.presentation.titleAccent')
}))

type Skill = {
  icon: IconName
  label: string
}

const primarySkills: Skill[] = [
  { icon: 'Vue', label: 'Vue' },
  { icon: 'Nuxtjs', label: 'Nuxt' },
  { icon: 'React', label: 'React' },
  { icon: 'Typescript', label: 'TypeScript' }
]

const chipSkills = [
  'Next.js',
  'Node.js',
  'Electron',
  'Angular',
  'Rust',
  'Odin'
]
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/motion';
@use '@styles/utils/theming';

.reveal { @include motion.reveal; }

.about {
  padding: 10px 25px;

  display: flex;
  flex-direction: column;

  max-width: 1180px;
  margin: 0 auto;
  width: 100%;

  & > .inner {
    display: flex;
    flex-direction: column;
    gap: 60px;

    // Asymmetric two-column above the tablet breakpoint;
    // stacked below it
    @include mixins.min-width(881px) {
      flex-direction: row;
      align-items: center;
      gap: 80px;
    }
  }

  & > .inner > .lead {
    flex: 1 1 auto;
    min-width: 0;

    & > .headline {
      margin-top: 26px;

      font-family: var(--brand-font);
      font-weight: 200;
      font-size: clamp(38px, 5.2vw, 42px);
      line-height: 1.05;

      & > .accent { color: var(--color-accent); }
    }

    & > .text {
      margin-top: 32px;
      max-width: 56ch;

      font-weight: 300;
      font-size: 19px;
      line-height: 32px;
      color: rgba(var(--color-fg-rgb), .78);

      @include mixins.min-width(635px) { font-size: 21px; }
    }
  }

  & > .inner > .figure .portrait-ascii {
    filter: saturate(1.5);
  }

  & > .inner > .figure {
    flex: 0 0 auto;
    width: min(300px, 70vw);
    align-self: center;

    @include mixins.min-width(881px) {
      width: 340px;
    }
  }

  & > .skills-wrap {
    display: none;
    margin-top: 120px;

    & > .heading {
      font-family: var(--brand-font);
      font-weight: 200;
      font-size: clamp(26px, 3vw, 38px);
      letter-spacing: .04em;
      text-transform: uppercase;
      color: rgba(var(--color-fg-rgb), .85);
    }

    & > .skills {
      display: grid;
      gap: 14px;
      margin-top: 36px;

      grid-template-columns: repeat(2, 1fr);

      @include mixins.min-width(745px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    & > .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 16px;
    }
  }
}
</style>
