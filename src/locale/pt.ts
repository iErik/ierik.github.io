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
        forma fácil e rápida.</p><br />

        <p>
        O aplicativo faz uso da arquitetura Redux para
        organizar e gerenciar o estado global da aplicação
        de forma extremamente leve e eficiente, combinando
        a arquitetura e filosofia Redux com as ferramentas
        oferecidas pelo framework Electron.js para gerenciar
        e manipular o estado de múltiplas janelas do
        aplicativo abertas simultaneamente, mantendo-as em
        sincronia.
        </p><br />

        <p>
        O projeto de design original do aplicativo pode
        ser encontrado neste ${mkLink(
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
        plataforma federada e completamente de código
        aberto de voz sobre IP e comunicação por mensagens
        de texto em tempo real. A documentação completa
        de suas APIs backend pode ser encontrada no
        ${mkLink('site oficial', 'https://revolt.chat')}
        da plataforma.</p><br />

        <p>Medley trata-se de um projeto ambicioso com o
        objetivo de proporcionar uma experiência completa
        de comunicação por voz e texto em tempo real para
        o usuário, comparável a aplicações como Discord ou
        Slack. O aplicativo está sendo desenvolvido com uma
        stack composta primariamente por React v18, React
        Router 7 e Redux + Redux Saga para gerenciamento de
        estado, além de outras bibliotecas de suporte.
        </p><br />

        <p>Atualmente é possível visualizar mensagens,
        servidores, canais de servidores e mensagens diretas
        através da aplicação, mas há um esforço contínuo
        para expandir as capacidades da aplicação com o
        objetivo de proporcionar uma experiência completa.
        </p>
        `,
    }

]


export default {
  navMenu: [
    'Homepage',
    'Portfólio',
    'Sobre mim'
  ],
  about: {
    presentation: {
      title: "Oie!",
      text: `Me chamo Erik, sou um desenvolvedor front-end
        com 8 anos de experiência especializado no
        desenvolvimento de aplicações Single-Page (SPA) e
        Server-Side Rendered (SSR) utilizando os frameworks
        Vue.js/Nuxt.js & React.js/Next.js`
    },
    experiences: {
      title: "Experiência",
      items: [
        {
          title: "Desenvolvedor Front-end Sênior",
          company: "Thryv",
          context: "CRM e automação de marketing — integração das plataformas Keap e Thryv · squad de 11",
          start: "11.2025",
          end: "09.2026",
          items: [
            "Liderei o design arquitetural e a implementação da integração entre as plataformas Keap e Thryv após a aquisição da Keap pela Thryv",
            "Conduzi a direção técnica entre squads — levantamento de requisitos com múltiplos times, condução de sessões de discovery e definição da arquitetura que serviu de base para o trabalho",
            "Desenvolvi e integrei APIs RESTful e GraphQL sobre uma stack composta de Node.js + Fastify.js + MongoDB",
            "Mantive ferramentas e bibliotecas internas escritas em JavaScript e TypeScript"
          ]
        },
        {
          title: "Estudo Independente & Projetos Pessoais",
          company: "Autodidata",
          context: "Computação gráfica, programação de sistemas",
          start: "07.2023",
          end: "11.2025",
          items: [
            "Estudei computação gráfica, modelagem e escultura 3D e renderização em tempo real, além de fundamentos de desenvolvimento de jogos",
            "Construí projetos do zero em Odin, Rust e C/C++, publicados no GitHub",
            "Aprofundei fundamentos de ciência da computação abaixo da camada de frameworks de aplicação"
          ]
        },
        {
          title: "Desenvolvedor Front-end Sênior",
          company: "Convenia",
          context: "SaaS de automação de RH e departamento pessoal · ~20 engenheiros, 7 no front-end",
          start: "09.2020",
          end: "07.2023",
          items: [
            "Atuei como tech lead de front-end na prática — defini a arquitetura da SPA principal da empresa e do seu pacote de componentes compartilhados; essas decisões seguem em uso até hoje",
            "Projetei uma arquitetura declarativa para lidar com formulários em toda a aplicação, e os componentes de form builder sobre os quais vários produtos da empresa são construídos",
            "Construí a camada de queries MongoDB de um BFF que operava como um back-end completo, incluindo agregações complexas e trabalho de performance de queries",
            "Fiz onboarding e mentoria de novos desenvolvedores front-end",
            "Integrei APIs RESTful e GraphQL com o front-end"
          ]
        },
        {
          title: "Desenvolvedor Front-end",
          company: "Doc88",
          context: "Plataforma de RH dentro da Comerc Energia · squad de 3 front-end, 2 back-end",
          start: "02.2020",
          end: "08.2020",
          items: [
            "Liderei a reescrita do front-end do projeto e defini sua arquitetura",
            "Projetei e implementei o pacote interno de componentes Vue",
            "Desenvolvi aplicações Single-Page (SPA) e Server-Side Rendered (SSR) responsivas com Vue.js e Nuxt.js"
          ]
        },
        {
          title: "Desenvolvedor Front-end",
          company: "Convenia",
          context: "SaaS de automação de RH e departamento pessoal",
          start: "04.2018",
          end: "06.2019",
          items: [
            "Projetei e construí o pacote interno de componentes e uma biblioteca de validação de formulários em TypeScript — meu primeiro pacote publicado no npm, totalmente tipado e mantido por mim sozinho",
            "Ambos seguiram em uso nas aplicações da empresa depois que saí",
            "Integrei APIs GraphQL com o front-end",
            "Testes unitários com Jest e testes de integração com Cypress"
          ]
        }
      ]
    }
  },
  portfolio: {
    projects
  }
}
