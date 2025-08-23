import type { ProjectType } from '@/types'

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
        through an entire rewrite and is planned to support
        macOS, Windows and Linux platforms.</p><br />

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
        state in an efficient and straightforward manner
        </p>`,
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
        <a
          class=\"link\"
          target=\"_blank\"
          href=\"https://revolt.chat\"
        >
          here
        </a>. I'm enthusiastic about projects that put the
        user first, so I decided to initiate this project
        to make my own Revolt chat client.</p><br />

        <p>This project has been a challenge, but I'm
        passionate about it. Currently it's being developed
        with a stack composed of React 18, React Router 7
        and Redux + Redux Saga for state management</p>`,
    }

]


export default {
  about: {
    presentation: {
      title: "Oie!",
      text: "Desenvolvedor front-end com 5 anos de experiência especializado no desenvolvimento de aplicações Single-Page (SPA) e Server-Side Rendered (SSR) utilizando os frameworks Vue.js/Nuxt.js & React.js/Next.js"
    },
    experiences: {
      title: "Experiência",
      items: [
        {
          title: "Desenvolvedor Front-end Sênior",
          company: "Convenia",
          start: "09.2020",
          end: "07.2023",
          items: [
            "Onboarding e treinamento de novos membros do time",
            "Planejamento, implementação, manutenção e integração com front-end de APIs RESTful e GraphQL utilizando uma stack composta de Node.js + Fastify.js + MongoDB",
            "Planejamento, implementação e manutenção de aplicações Single-Page (SPA) e Server-Side Rendered (SSR) utilizando os frameworks Vue.js e Nuxt.js",
            "Planejamento, implementação e manutenção de ferramentas e bibliotecas internas escritas em JavaScript e TypeScript",
            "Implementação de testes unitários utilizando Jest"
          ]
        },
        {
          title: "Desenvolvedor Front-end",
          company: "Doc88",
          start: "02.2020",
          end: "08.2020",
          items: [
            "Planejamento, implementação e manutenção de aplicações Single-Page (SPA) e Server-Side Rendered (SSR) utilizando os frameworks Vue.js e Nuxt.js",
            "Planning, implementation and maintenance of internal tooling and libraries written in JavaScript and TypeScript",
            "Implementação de testes unitários utilizando Jest"
          ]
        },
        {
          title: "Desenvolvedor Front-end",
          company: "Convenia",
          start: "04.2018",
          end: "06.2019",
          items: [
            "Planejamento, implementação e manutenção de aplicações Single-Page (SPA) e Server-Side Rendered (SSR) utilizando os frameworks Vue.js e Nuxt.js",
            "Integração de APIs GraphQL com aplicações Front-end",
            "Planejamento, implementação e manutenção de ferramentas e bibliotecas internas escritas em JavaScript e TypeScript",
            "Implementação de testes unitários utilizando Jest, e testes de integração utlizando Cypress"
          ]
        }
      ]
    }
  },
  portfolio: {
    projects
  }
}
