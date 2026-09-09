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

        <p>The Grimoire app was entirely designed and
        implemented by me with the goal of providing a
        clean, simple and elegant way of composing and
        organizing markdown documents. The project is
        powered by Electron.js, which allows us to build
        native desktop applications built entirely with
        Web technologies such as React.js, which in this
        case is also the framework of choice used to build
        the entire user interface layer.</p><br />

        <p>
        The application also makes use of the Redux
        library to manage application and user interface
        state in an efficient and straightforward manner,
        combining the Redux's state management philosophy
        with the tools offered by the Electron.js framework
        to keep multiple renderer processes in sync.
        </p><br />

        <p>
        The original design project for the application
        can be found on this ${mkLink(
          'gitlab repository',
          'https://gitlab.com/Isidore/grimoire-mockup')} I
        created specifically for that. There you can find
        the PSD file containing all the original design
        process for the application. As mentioned earlier, the
        application is going through a complete redesign and
        rewrite, the new Figma design screens should be
        publicly available soon.
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
        Discord, and its API is fully documented on its
        website, which you can check out
        ${mkLink('here', 'https://revolt.chat')}.
        I'm enthusiastic about projects that put the
        user first, so I decided to initiate this project
        to make my own Revolt chat client.</p><br />

        <p>This project has been a challenge, but I'm
        passionate about it. Currently it's being developed
        with a stack composed of React 18, React Router 7
        and Redux + Redux Saga for state management.</p><br />

        <p>Currently you can browse servers, channels and
        direct messages directly in the app, but there is
        ongoing effort to expand the app's capabilities to
        offer a complete experience.</p>`,
    }

]


export default {
  navMenu: [
    'Homepage',
    'Portfolio',
    'About me'
  ],
  about: {
    presentation: {
      title: "Hello!",
      text: `I'm Erik, I'm a front-end engineer with 8
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
          company: "Thryv",
          context: "CRM & marketing automation — Keap/Thryv platform integration · squad of 11",
          start: "11.2025",
          end: "09.2026",
          items: [
            "Led the architectural design and implementation of the integration between the Keap and Thryv platforms following Thryv's acquisition of Keap",
            "Drove technical direction across squads — gathering requirements from multiple teams, running discovery sessions, and producing the architecture the work was built from",
            "Built and integrated RESTful and GraphQL APIs on a Node.js + Fastify.js + MongoDB stack",
            "Maintained internal tooling and libraries written in JavaScript and TypeScript"
          ]
        },
        {
          title: "Independent Study & Personal Projects",
          company: "Self-directed",
          context: "Computer graphics, systems programming",
          start: "07.2023",
          end: "11.2025",
          items: [
            "Studied computer graphics, 3D modelling and sculpting, and real-time rendering, alongside game development fundamentals",
            "Built projects from scratch in Odin, Rust and C/C++, published on GitHub",
            "Deepened computer science fundamentals below the application-framework layer"
          ]
        },
        {
          title: "Senior Front-end Engineer",
          company: "Convenia",
          context: "HR & payroll automation SaaS · ~20 engineers, 7 on front-end",
          start: "09.2020",
          end: "07.2023",
          items: [
            "Acted as de-facto front-end tech lead — set the architecture for the company's main SPA and its shared components package; those decisions are still in place today",
            "Designed a declarative architecture for handling forms across the application, and the form-builder components several of the company's products are built on",
            "Built the MongoDB query layer for a BFF that operated as a full back-end, including complex aggregations and query-performance work",
            "Onboarded and mentored new front-end engineers",
            "Integrated RESTful and GraphQL APIs with the front-end"
          ]
        },
        {
          title: "Front-end Engineer",
          company: "Doc88",
          context: "HR platform inside Comerc Energia · squad of 3 front-end, 2 back-end",
          start: "02.2020",
          end: "08.2020",
          items: [
            "Led the rewrite of the project's front-end and set its architecture",
            "Designed and implemented the internal Vue components package",
            "Built responsive Single-Page and Server-Side Rendered applications with Vue.js and Nuxt.js"
          ]
        },
        {
          title: "Front-end Engineer",
          company: "Convenia",
          context: "HR & payroll automation SaaS",
          start: "04.2018",
          end: "06.2019",
          items: [
            "Designed and built the internal components package and a TypeScript form-validation library — my first published npm package, fully typed, and maintained solo",
            "Both remained in use across the company's applications after I left",
            "Integrated GraphQL APIs with the front-end",
            "Unit tests with Jest, integration tests with Cypress"
          ]
        }
      ]
    }
  },
  portfolio: {
    projects
  }
}
