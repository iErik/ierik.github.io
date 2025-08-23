<template>
  <section class="about">
    <div class="presentation">
      <h3 class="heading">
        {{ t('about.presentation.title') }}
      </h3>
      <p class="text">
        {{ t('about.presentation.text') }}
      </p>

      <div class="skills-wrap">
        <h3 class="heading">
          Skills
        </h3>

        <div class="skills">
          <SkillCard
            v-for="skill in skillList"
            :key="skill.label"
            :icon="skill.icon"
            :label="skill.label"
            :percentage="skill.percentage"
          />
        </div>
      </div>
    </div>

    <div class="experience">
      <h2 class="heading">
        {{ t('about.experiences.title') }}
      </h2>

      <div class="experiences-wrap">
        <ExperienceList :experiences="experiences" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { LocaleSchema } from '@/i18n'

import ExperienceList from '@components/ExperienceList/index.vue'
import SkillCard from '@components/SkillCard/index.vue'

import type { IconName } from '@components/Icon/index.vue'


const { t, locale, messages } = useI18n()

const experiences = computed(() => {
  const msgs = messages.value[locale.value]

  if (!msgs) return []

  // TODO: Not ideal
  return (msgs as LocaleSchema).about.experiences.items
})

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

.about {
  padding-top: 200px;
  padding-bottom: 100px;

  display: flex;
  align-items: center;
  flex-direction: column;

  & > .presentation {
    min-height: calc(100vh - 200px);

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
      margin-top: 150px;
      margin-bottom: 40px;

      @include mixins.min-width(635px) {
        marginb-bottom: 0px;
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

  & > .experience {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 25px;

    & > .heading {
      font-size: 48px;
      font-weight: 500;
      text-transform: uppercase;
    }

    & > .experiences-wrap {
      margin-top: 75px;
    }
  }
}
</style>
