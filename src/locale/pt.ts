import type { ProjectType } from '@/types'

import { mkLink } from './shared'

const projects: ProjectType[] = [
    {
      name: "Grimoire",
      icon: "GrimoireV1",
      repoUrl: "https://github.com/iErik/grimoire",
      tags: ["React", "Redux", "Electron", "WIP"],
      description:
        `<p>Grimoire é um editor de texto markdown de
        código aberto desenvolvido primariamente com os
        frameworks Electron e React.js, o aplicativo está
        passando por uma reescrita completa e deve dar
        suporte às plataformas macOS, Windows e Linux.</p>
        <br />

        <p>O Grimoire foi inteiramente projetado e
        implementado por mim com o objetivo de oferecer
        uma forma limpa, simples e elegante de compor e
        organizar documentos em markdown. O projeto é
        movido pelo Electron.js, que nos permite construir
        aplicações desktop nativas feitas inteiramente com
        tecnologias Web como o React.js, que neste caso é
        também o framework escolhido para construir toda a
        camada de interface.</p><br />

        <p>
        A aplicação também faz uso da biblioteca Redux
        para gerenciar o estado da aplicação e da interface
        de forma eficiente e direta, combinando a filosofia
        de gerenciamento de estado do Redux com as
        ferramentas oferecidas pelo framework Electron.js
        para manter múltiplos processos de renderização em
        sincronia.
        </p><br />

        <p>
        O projeto de design original da aplicação pode ser
        encontrado neste ${mkLink(
          'repositório do gitlab',
          'https://gitlab.com/Isidore/grimoire-mockup')} que
        criei especificamente para isso. Lá você encontra o
        arquivo PSD contendo todo o processo de design
        original da aplicação. Como mencionado antes, a
        aplicação está passando por um redesign e uma
        reescrita completos, e as novas telas de design em
        Figma devem ficar publicamente disponíveis em breve.
        </p> `,
    },
    {
      name: "Medley",
      icon: "MedleyV2",
      repoUrl: "https://github.com/iErik/Medley",
      tags: ["React", "Redux", "Electron", "WIP"],
      description:
        `<p>Medley é o meu próprio cliente desktop de
        código aberto para a plataforma de mensagens
        Revolt, ainda em processo de desenvolvimento. Caso
        você não conheça, o Revolt é uma plataforma de
        mensagens federada e completamente de código
        aberto, muito parecida com o Discord, e sua API é
        inteiramente documentada no site oficial, que você
        pode conferir
        ${mkLink('aqui', 'https://revolt.chat')}.
        Sou entusiasta de projetos que colocam o usuário
        em primeiro lugar, então decidi iniciar este
        projeto para fazer o meu próprio cliente de chat do
        Revolt.</p><br />

        <p>Este projeto tem sido um desafio, mas é algo
        pelo qual sou apaixonado. Atualmente ele está sendo
        desenvolvido com uma stack composta por React 18,
        React Router 7 e Redux + Redux Saga para
        gerenciamento de estado.</p><br />

        <p>Atualmente já é possível navegar por servidores,
        canais e mensagens diretas dentro do aplicativo,
        mas há um esforço contínuo para expandir as
        capacidades da aplicação e oferecer uma experiência
        completa.</p>`,
    }

]


export default {
  navMenu: [
    'Homepage',
    'Sobre mim',
    'Experiência',
    'Portfólio'
  ],
  nav: {
    primary: 'Principal',
    sections: 'Seções'
  },
  pages: {
    about: {
      presentation: {
        eyebrow: "Sobre",
        title: "Desenvolvedor front-end. Oito anos construindo",
        titleAccent: "aplicações web.",
        role: "Desenvolvedor Front-end Sênior",
        text: `Sou especializado em aplicações Single-Page
          (SPA) e Server-Side Rendered (SSR) construídas
          com Vue.js/Nuxt.js e React.js/Next.js — em
          plataformas de RH e CRM.`
      },
      skills: {
        title: "Habilidades"
      },
    },
    experience: {
      eyebrow: "Experiência",
      title: "Minha trajetória profissional",
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
    },
    portfolio: {
      eyebrow: "Portfólio",
      title: "Meu trabalho",
      projects
    }
  }
}
