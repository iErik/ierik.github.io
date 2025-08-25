import { DefineLocaleMessage } from 'vue-i18n'
import { IconName } from '@components/Icon/index.vue'


export type ExperienceType = {
  title: string
  company: string
  start: string
  end: string
  items: string[]
}

export type ProjectTag
  = 'React'
  | 'Vue'
  | 'Next'
  | 'Nuxt'
  | 'Zustand'
  | 'Redux'
  | 'Electron'
  | 'Tauri'
  | 'WIP'

export type ProjectType = {
  name: string,
  icon: IconName,
  description: string,
  repoUrl: string,
  tags: ProjectTag[]
}

declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    navMenu: string[3]
    about: {
      presentation: {
        title: string
        text: string
      }

      experiences: {
        title: string
        items: ExperienceType[]
      }
    }

    portfolio: {
      projects: ProjectType[]
    }
  }
}
