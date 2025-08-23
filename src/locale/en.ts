import type { ProjectType } from '@/types'

import { mkLink } from './shared'

const projects: ProjectType[] = [
    {
      name: "Grimoire",
      icon: "GrimoireV1",
      repoUrl: "https://github.com/iErik/grimoire",
      tags: ["React", "Redux", "Electron", "WIP"],
      description:
        `<p>Grimoire is an open-source markdown
        text editor built primarily with the Electron and
        React.js frameworks, the app is currently going
        through a complete rewrite and is planned to
        support macOS, Windows and Linux platforms.</p>
        <br />

        <p>The Grimoire app was entirelly designed and
        implemented by me with the goal of providing a
        clean, simple and elegant way of composing and
        organizing markdown documents. The project is
        powered by Electron.js, which allows us build
        native desktop applications built entirelly with
        Web techonologies such as React.js, which in this
        case is also the framework of choice used to build
        the entire user interface layer.</p><br />

        <p>
        The application also makes use of the Redux
        library to manage application and user interface
        state in an efficient and straightforward manner,
        combining the Redux's state management philosophy
        with the tools offered by the Electron.js framework
        to keep multiple renderer processes in sync.
        </p>

        <p>
        The original design project for the application
        can be found on this ${mkLink(
          'gitlab repository',
          'https://gitlab.com/Isidore/grimoire-mockup')} I
        created specifically for that, there you can find
        the PSD file containing all the original design
        process the application. As mentioned earlier, the
        application is going through a complete redesign and
        rewrite, the new Figma design screens should be
        publicly avaialable soon.
        </p> `,
    },
    {
      name: "Medley",
      icon: "MedleyV2",
      repoUrl: "https://github.com/iErik/Medley",
      tags: ["React", "Redux", "Electron", "WIP"],
      description:
        `<p>Medley is my own open-source desktop client for
        the Revolt messaging platform still in development
        process. In case you're not familiar with it,
        Revolt itself is a completely open source and
        federated messaging platform very similar to
        Discord, it's API is fully documented in it's
        website, which you can check out
        ${mkLink('here', 'https://revolt.chat')}.
        I'm enthusiastic about projects that put the
        user first, so I decided to initiate this project
        to make my own Revolt chat client.</p><br />

        <p>This project has been a challenge, but I'm
        passionate about it. Currently it's being developed
        with a stack composed of React 18, React Router 7
        and Redux + Redux Saga for state management</p>

        <p>Currently you can browser servers, channels and
        direct messages directly in the app, but there is
        ongoing effort to expand the app's capabilities to
        offer a complete experience.`,
    }

]


export default {
  about: {
    presentation: {
      title: "Hello!",
      text: `I'm Erik, I'm a front-end engineer with 5
        years of experience specialized in building
        Single-Page (SPAs) and Server-Side Rendered (SSR)
        applications using the Vue.js/Nuxt.js and
        React.js/Next.js frameworks.`
    },
    experiences: {
      title: "Experience",
      items: [
        {
          title: "Senior Front-end Engineer",
          company: "Convenia",
          start: "09.2020",
          end: "07.2023",
          items: [
            "Onboarding and training of new team members",
            "Planning, implementation, maintenance and front-end integration of of RESTful and GraphQL APIs using a stack composed of Node.js + Fastify.js + MongoDB",
            "Planning, implementation and maintenance of of responsive, Single-Page and Server-Side Rendered applications using the Vue.js and Nuxt.js frameworks",
            "Planning, implementation and maintenance of internal tooling and libraries written in JavaScript and TypeScript",
            "Implementation of unit tests using the Jest library"
          ]
        },
        {
          title: "Front-end Engineer",
          company: "Doc88",
          start: "02.2020",
          end: "08.2020",
          items: [
            "Planning, implementation and maintenance of of responsive, Single-Page and Server-Side Rendered applications using the Vue.js and Nuxt.js frameworks",
            "Planning, implementation and maintenance of internal tooling and libraries written in JavaScript and TypeScript",
            "Implementation of unit tests using the Jest library"
          ]
        },
        {
          title: "Front-end Engineer",
          company: "Convenia",
          start: "04.2018",
          end: "06.2019",
          items: [
            "Planning, implementation and maintenance of of responsive, Single-Page and Server-Side Rendered applications using the Vue.js and Nuxt.js frameworks",
            "Front-end integration with GraphQL APIs",
            "Planning, implementation and maintenance of internal tooling and libraries written in JavaScript and TypeScript",
            "Implementation of unit tests using the Jest library, and integration tests using Cypress"
          ]
        }
      ]
    }
  },
  portfolio: {
    projects
  }
}
