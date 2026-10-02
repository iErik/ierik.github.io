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
  | 'Angular'
  | 'Vue'
  | 'Next'
  | 'Nuxt'
  | 'Zustand'
  | 'Redux'
  | 'Electron'
  | 'Tauri'
  | 'Figma'
  | 'Photoshop'
  | 'Sketch'
  | 'TypeScript'
  | 'CoffeeScript'
  | 'Webpack'
  | 'WIP'

// A build has code behind it; a design is screens only.
// Shown on every card so the two are never confused
export type ProjectKind = 'build' | 'design'

export type ProjectLink = {
  label: string
  to: string
  icon: IconName
}

export type ProjectScreen = {
  src: string
  srcset: string
  width: number
  height: number
  alt: string
}

export type ProjectType = {
  name: string
  icon?: IconName
  kind: ProjectKind
  // The first screen is the card cover; the dialog adds
  // a thumbnail strip once there is more than one
  screens: ProjectScreen[]
  // An empty string hides the block in the dialog
  description: string
  links: ProjectLink[]
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

    pages: {
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
      }

      experience: {
        eyebrow: string
        title: string
        items: ExperienceType[]
      }

      portfolio: {
        eyebrow: string
        title: string
        kinds: Record<ProjectKind, string>
        view: string
        close: string
        projects: ProjectType[]
      }
    }
  }
}
