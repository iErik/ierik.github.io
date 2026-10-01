import type { ProjectType } from '@/types'

import { screens } from './screens'
import { mkLink } from './shared'

// A ordem aqui é a ordem na página: builds primeiro
const projects: ProjectType[] = [
    {
      name: "Medley",
      icon: "Medley",
      kind: "build",
      tags: ["React", "Redux", "Electron", "WIP"],
      screens: [{
        ...screens.medley,
        alt: "Tela de mensagens diretas do Medley, com a lista de servidores e a barra lateral de conversas"
      }],
      links: [{
        label: "GitHub",
        to: "https://github.com/iErik/Medley",
        icon: "Github"
      }],
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
    },
    {
      name: "Grimoire",
      icon: "Grimoire",
      kind: "build",
      tags: ["React", "Redux", "Electron", "WIP"],
      screens: [{
        ...screens.grimoire,
        alt: "Tela de caderno do Grimoire: a lista de notas ao lado do documento aberto"
      }],
      links: [{
        label: "GitHub",
        to: "https://github.com/iErik/grimoire",
        icon: "Github"
      }],
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
      name: "Libellus",
      icon: "Libellus",
      kind: "design",
      tags: ['WIP', 'Figma'],
      screens: [{
        ...screens.libellus,
        alt: "Libellus: um canvas de formas com um painel de estilo, ao lado da lista de notas"
      }],
      links: [],
      description:
        `<p>O Libellus pretende ser um editor de markdown e
        um quadro branco virtual num app só, basicamente o
        que você teria ao combinar o ${mkLink(
          'Obsidian',
          'https://obsidian.md'
        )} com o ${mkLink(
          'Excalidraw',
          'https://excalidraw.com'
        )}. Ele é, de certa forma, o sucessor espiritual do
        Grimoire, meu editor de markdown anterior.</p><br />

        <p>Sou do tipo que gosta de fazer muitas anotações e
        rabiscar no papel para organizar meus pensamentos e
        ideias, mas o problema é que isso pode ficar muito
        bagunçado. As páginas se acumulam, algumas se perdem,
        às vezes rasgam ou meu gato derrama café nelas, e
        elas nunca ficam organizadas. Levar tudo isso para um
        app dedicado resolveria a maior parte desses
        problemas, e ainda me deixaria fazer coisas que o
        papel nunca permitiria.</p><br />

        <p>A ideia é que ele ofereça todo o essencial da
        edição em markdown, e que ao mesmo tempo me permita
        adicionar gráficos vetoriais e rasterizados a uma
        nota e manipulá-los ali mesmo — talvez até rabiscar
        direto na página com uma mesa digitalizadora. Ao lado
        das notas comuns existiriam os documentos de canvas:
        grandes quadros brancos dedicados a formas e gráficos
        vetoriais. As notas continuariam focadas em texto,
        com espaço para desenhar nelas; os canvas seriam o
        contrário.</p><br />

        <p>O app ainda está nos estágios iniciais de design.
        Dei uma pausa nele para trabalhar em outras coisas,
        mas pretendo voltar e construir um protótipo
        funcional em breve. Então fica de olho 😜</p>`,
    },
    {
      name: "Bulletin",
      icon: 'Bulletin',
      kind: "design",
      tags: ['WIP', 'Figma'],
      screens: [{
        ...screens.bulletin,
        alt: "Painel do Bulletin acompanhando sono, despesas, humor, hábitos e peso"
      }],
      links: [],
      description:
        `<p>O Bulletin é a minha tentativa de transformar o
        método do bullet journal em algo que pareça nativo do
        meio digital.</p><br />

        <p>Para quem não conhece, o bullet journal é um
        sistema de anotações criado por ${mkLink(
          'Ryder Carroll',
          'https://bulletjournal.com'
        )} para organizar tarefas, eventos, metas,
        brainstorms ou, na real, qualquer coisa que você
        queira acompanhar. Uso um há um tempo para ficar de
        olho nas minhas finanças, no meu sono e em outros
        hábitos, e ele tem se mostrado extremamente útil. A
        minha única reclamação é que ele é feito no papel, e
        isso dá um trabalho considerável de manutenção. Todo
        tracker precisa ser redesenhado a cada mês (ou a cada
        semana, no caso de alguns), e cada informação precisa
        ser preenchida à mão. No meio do caminho acontecem
        erros, coisas são esquecidas, e repetir o mesmo
        processo manual sem parar estava começando a me
        desgastar. <em>Não existe automação.</em></p><br />

        <p>Tem gente que gosta muito justamente desse lado do
        bullet journal, e existe toda uma comunidade que é
        bastante criativa com ele; o processo manual está no
        coração dessa criatividade. Para mim, porém, a
        automação é o único ingrediente que falta para o
        bullet journal ficar perfeito (confesso, sou meio
        preguiçoso).</p><br />

        <p>Foi por isso que comecei a trabalhar no Bulletin
        (nome definitivo ainda a ser decidido 😅). A ideia é
        combinar os apps de dashboard com o bullet journal,
        dois formatos que combinam melhor do que você
        imaginaria. Um único painel reúne widgets de sono,
        despesas, humor, hábitos e mais, e cada um deles abre
        na sua própria página com informações mais
        detalhadas.</p><br />

        <p>Ainda estou resolvendo vários detalhes e fechando
        algumas lacunas de UI/UX, mas até aqui está indo bem,
        e estou animado com ele.</p>`,
    },
    // TODO(erik): confirmar tags e links
    {
      name: "Tidder",
      icon: "Tidder",
      kind: "design",
      tags: [],
      screens: [{
        ...screens.tidder,
        alt: "Feed da página inicial do Tidder ao lado de uma discussão aberta"
      }],
      links: [],
      description:
        `<p>Tidder é um cliente Reddit de código aberto
        desenvolvido com os frameworks Electron.js e
        Angular 5, o aplicativo atualmente se encontra em
        fase beta de desenvolvimento e está disponível
        para download nas plataformas Windows, macOS e
        Linux.</p><br />

        <p>O projeto Tidder foi criado com a intenção de
        recriar a experiência de usuário da plataforma
        Reddit de uma forma mais moderna, elegante e
        simples. O projeto começou apenas como uma
        tentativa de redesign da plataforma Reddit e
        acabou evoluindo para um aplicativo desktop
        multi-plataforma. O aplicativo se utiliza das
        ferramentas oferecidas pelo framework Angular 5
        para consumir a API pública do Reddit, gerar e
        gerenciar conteúdo para o aplicativo, autenticar
        usuários do Reddit e exibir conteúdo de forma
        dinâmica ao usuário.</p><br />

        <p>O aplicativo é totalmente desenvolvido com
        tecnologias Web, com o uso do framework
        Electron.js é possível usar bibliotecas e
        frameworks JavaScript existentes através da
        plataforma Node.js para criar aplicativos
        multi-plataforma desenvolvidos com HTML, CSS e
        JavaScript de forma fácil, rápida, e também
        divertida.</p><br />

        <p>O projeto Sketch de design do aplicativo está
        disponível para download no meu repositório do
        GitLab, lá estarão disponíveis o arquivo de
        design Sketch do projeto, ícones, fontes e tudo
        que foi utilizado durante o processo de design do
        aplicativo.</p><br />

        <p>O projeto Tidder também é em grande parte
        baseado numa tentativa anterior minha de redesign
        da plataforma Reddit. Embora essa versão anterior
        tenha sido descontinuada, tanto o código-fonte
        quanto o processo de design desse projeto ainda
        estão disponíveis na minha página do GitLab para
        aqueles que queiram acompanhar a evolução do
        projeto.</p>`,
    },
    // TODO(erik): idem
    {
      name: "iErik.github.io",
      kind: "design",
      tags: [],
      screens: [{
        ...screens.ierik,
        alt: "Um design anterior deste portfólio, mostrando a página de um projeto"
      }],
      links: [],
      description: "",
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
      title: "Trabalhos selecionados",
      kinds: {
        build: "Código",
        design: "Design"
      },
      view: "Ver projeto",
      close: "Fechar",
      projects
    }
  }
}
