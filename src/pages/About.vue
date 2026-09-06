<template>
  <section class="about">
    <div class="presentation">
      <h3 v-reveal class="heading reveal">
        {{ t('about.presentation.title') }}
      </h3>
      <p v-reveal class="text reveal">
        {{ t('about.presentation.text') }}
      </p>

      <div class="skills-wrap">
        <h3 v-reveal class="heading reveal">
          Skills
        </h3>

        <div class="skills">
          <SkillCard
            v-for="(skill, index) in skillList"
            v-reveal="index"
            :key="skill.label"
            :icon="skill.icon"
            :label="skill.label"
            :percentage="skill.percentage"
            class="reveal"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import SkillCard from '@components/SkillCard/index.vue'

import type { IconName } from '@components/Icon/index.vue'


const { t } = useI18n()

type Skill = {
  icon: IconName
  label: string
  percentage: number
}

const skillList: Skill[] = [
  {
    icon: 'Vue',
    label: 'Vue',
    percentage: 0.8
  },
  {
    icon: 'Nuxtjs',
    label: 'Nuxt',
    percentage: 0.7
  },
  {
    icon: 'Node',
    label: 'Node.js',
    percentage: 0.8
  },
  {
    icon: 'Typescript',
    label: 'TypeScript',
    percentage: 0.65
  },
  {
    icon: 'React',
    label: 'React',
    percentage: 0.7
  },
  {
    icon: 'Nextjs',
    label: 'Next.js',
    percentage: 0.6
  },
  {
    icon: 'Angular',
    label: 'Angular',
    percentage: 0.2
  },
  {
    icon: 'Electron',
    label: 'Electron.js',
    percentage: 0.6
  }
]

</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/motion';

.reveal { @include motion.reveal; }

.about {
  padding-top: 120px;
  padding-bottom: 120px;

  display: flex;
  align-items: center;
  flex-direction: column;

  & > .presentation {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .heading {
      font-weight: 500;
      font-size: 36px;
      margin-bottom: 34px;
    }

    & > .text {
      text-align: center;
      font-weight: 300;
      font-size: 26px;
      line-height: 40px;

      //max-width: 800px;
      //margin: 0 40px;
      margin: 0 10%;

      @include mixins.min-width(1280px) {
        margin: 0 20%;
      }
    }

    & > .skills-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;
      max-width: 1180px;
      margin-top: 110px;
      margin-bottom: 40px;

      @include mixins.min-width(635px) {
        margin-bottom: 0px;
      }
    }

    & > .skills-wrap > .heading {
      font-weight: 500;
      font-size: 36px;
      margin-bottom: 34px;
      text-transform: uppercase;
      margin-bottom: 75px;

      font-size: 48px;
      font-weight: 500;
    }

    & > .skills-wrap > .skills {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      //width: calc(100% - 80px);
      width: calc(100% - 30px);
      //padding: 0 40px;

      @include mixins.min-width(414px) {
        gap: 20px;
      }

      @include mixins.min-width(745px) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto auto;
        padding: 0 80px;
        width: 100%;
      }
    }
  }
}
</style>
