import type { ProjectType } from '@/types'

import { mkLink } from './shared'

const projects: ProjectType[] = [
    {
      name: "Grimoire",
      icon: "GrimoireV1",
      repoUrl: "https://github.com/iErik/grimoire",
      tags: ["React", "Redux", "Electron", "WIP"],
      description:
        `<p>Grimoire é um editor markdown de código aberto
        desenvolvido primariamente com os frameworks
        Electron.js e React.js, o aplicativo atualmente está
        sendo completamente re-escrito.</p><br />

        <p>O projeto Grimoire foi completamente projetado e
        desenvolvido por mim com o objetivo de criar uma
        experiência simples e elegante de compor e organizar
        documentos em markdown. O aplicativo é desenvolvido
        completamente com tecnologias Web, fazendo uso da
        biblioteca React.js para desenvolver elementos
        de interface funcionais, eficientes e elegantes do
        format fácil e rápida.</p><br />

        <p>
        O aplicativo faz uso da arquitetura Redux para
        organizar e gerenciar o estado global da aplicação
        de forma extremamente leve e eficiente, combinando
        a arquitetura e filosofia Redux com as ferramentas
        oferecias pelo framework Electron.js para gerenciar
        e manipular o estado de múltiplas janelas do
        aplicativo abertas simultaneamente, mantêndo-as em
        sincronia.
        </p><br />

        <p>
        Os projeto de design original do aplicativo podem
        ser encontrados neste ${mkLink(
          'repositório do gitlab',
          'https://gitlab.com/Isidore/grimoire-mockup'
        )} criado especificamente para isso, onde estão
        hospedados os arquivos PSD, fontes e outros
        recursos utilizados durante o processo de design da
        aplicação. Atualmente todas as especificações de
        UI/UX da aplicação estão sendo refeitas, e as novas
        telas de design Figma devem ser disponibilizadas
        publicamente em breve.
        </p>
        `,
    },
    {
      name: "Medley",
      icon: "MedleyV2",
      repoUrl: "https://github.com/iErik/Medley",
      tags: ["React", "Redux", "Electron", "WIP"],
      description:
        `<p>Medley é um cliente desktop de código aberto
        para a plataforma Revolt ainda em processo de
        desenvolvimento. A plataforma Revolt é uma
        plataforma federizada e completamente de código
        aberto de voz sobre IP e comunicação por mensagems
        de texto em tempo real. A documentação completa
        de suas APIs backend pode ser encontrada no
        ${mkLink('site oficial', 'https://revolt.chat')}
        da plataforma.</p><br />

        <p>Medley trata-se de um projeto ambicioso com o
        objetivo de proporcionar uma experiência completa
        de comunicação por voz e texto em tempo real para
        o usuário comparavel a aplicações como Discord ou
        Slack, o aplicativo está desenvolvido com uma stack
        composta primariamente por React v18, React Router
        7 e Redux + Redux Saga para gerenciamento de estado,
        além de outras bibliotecas menores.
        </p><br />

        <p>Medley trata-se de um projeto ambicioso com o
        objetivo de proporcionar uma experiência completa
        de comunicação por voz e texto em tempo real para
        o usuário comparavel a aplicações como Discord ou
        Slack, o aplicativo está desenvolvido com uma stack
        composta primariamente por React v18, React Router
        7 e Redux + Redux Saga para gerenciamento de estado,
        além de outras bibliotecas de suporte.
        </p><br />

        <p>Atualmente é possível visualizar mensagens,
        servidores, canais de servidores e mensagems diretas
        atráves da aplicação, mas há um esforço contínuo
        para expandir as capacidades da aplicação com o
        objetivo de proporcionar uma experiência completa.
        </p>
        `,
    }

]


export default {
  about: {
    presentation: {
      title: "Oie!",
      text: `Me chamo Erik, sou um desenvolvedor front-end
        com 5 anos de experiência especializado no
        desenvolvimento de aplicações Single-Page (SPA) e
        Server-Side Rendered (SSR) utilizando os frameworks
        Vue.js/Nuxt.js & React.js/Next.js`
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
