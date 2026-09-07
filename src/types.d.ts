import { DefineLocaleMessage } from 'vue-i18n'
import { IconName } from '@components/Icon/index.vue'
import { RevealDirective } from '@/directives/reveal'

declare module 'vue' {
  export interface GlobalDirectives {
    vReveal: RevealDirective
  }
}


export type ExperienceType = {
  title: string
  company: string
  context?: string
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
    navMenu: string[]

    // Accessible names for the two navigations - the pill
    // menu and the section rail - so screen readers can
    // tell them apart
    nav: {
      primary: string
      sections: string
    }

    about: {
      presentation: {
        eyebrow: string
        // Headline is split so the closing phrase can
        // carry the accent colour
        title: string
        titleAccent: string
        text: string
        role: string
      }

      skills: {
        title: string
      }

      experiences: {
        title: string
        items: ExperienceType[]
      }
    }

    portfolio: {
      title: string
      projects: ProjectType[]
    }
  }
}
