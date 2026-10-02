import type { ProjectType } from '@/types'

import { screens } from './screens'
import { mkLink } from './shared'

const projects: ProjectType[] = [
    {
      name: "iErik.github.io",
      icon: "iErik",
      kind: "design",
      tags: ["Vue", "Webpack", "Photoshop", "CoffeeScript"],
      screens: [{
        ...screens.ierik,
        alt: "Um design anterior deste portfólio, mostrando a página de um projeto"
      }],
      links: [],
      description:
        `<p>Este é o design original da primeira versão
        do meu portfólio pessoal, construída em 2017 ainda
        usando Vue.js v1. Foi praticamente o meu primeiro
        projeto público, e é também o precursor do site que
        você está vendo agora! :)</p>
        <br />

        <p>E este é um projeto do qual ainda me orgulho
        muito. Gostei particularmente de trabalhar no
        aspecto de UI/UX dele; acredito que isso foi antes
        de ferramentas como Figma ou Sketch dominarem o
        design de UI/UX, e o Photoshop ainda era o app
        padrão da indústria para projetar interfaces, então
        tive que aprender sozinho a usá-lo bem.</p>
        <br />

        <p>Um dos desafios que tive ao desenvolver este
        projeto foi adicionar suporte a vários temas de
        cores diferentes, numa época em que as variáveis CSS
        não tinham o amplo suporte que têm hoje. Por isso
        todas as variáveis de cor foram definidas
        inteiramente dentro do SASS, o que infelizmente
        significava que os temas só podiam ser alterados em
        tempo de build. Mas foi um experimento divertido.
        </p>
        <br />

        <p>O código antigo ainda pode ser encontrado ${mkLink(
          'no GitHub',
          'https://github.com/iErik/ierik.github.io/tree/old'
        )}, e o repositório do GitLab com os arquivos de
        design PSD, fontes e outros assets pode ser
        encontrado ${mkLink(
          'aqui',
          'https://gitlab.com/Isidore/ierik.github-mockup'
        )}.
        </p>
      `,
    },

    {
      name: "Bulletin",
      icon: "Bulletin",
      kind: "design",
      tags: ["WIP", "Figma"],
      screens: [{
        ...screens.bulletin,
        alt: "Painel do Bulletin acompanhando sono, despesas, humor, hábitos e peso"
      }],
      links: [],
      description:
        `<p>O Bulletin é a minha tentativa de transformar o
        método do bullet journal em algo que pareça nativo do
        meio digital.</p>
        <br />

        <p>Para quem não conhece, bullet journaling é um
        sistema de produtividade criado por ${mkLink(
          'Ryder Carroll',
          'https://bulletjournal.com'
        )} em que você organiza tarefas, eventos, metas,
        brainstorms ou qualquer coisa que você queira
        acompanhar, utilizando um caderno de anotações. Já
        tive vários bullet journals que usei para me ajudar
        a ficar de olho nas minhas finanças, no meu sono e
        em outros hábitos, e eles têm se mostrado
        extremamente úteis. A minha única reclamação é que
        ele é feito no papel, e isso dá um trabalho
        considerável de manutenção. Todo tracker precisa
        ser redesenhado a cada mês (ou a cada semana, no
        caso de alguns), e cada informação precisa ser
        preenchida à mão. No meio do caminho acontecem erros,
        coisas são esquecidas, e repetir o mesmo processo
        manual sem parar estava começando a me desgastar.
        <em>Não existe automação.</em></p>
        <br />

        <p>Para alguns, esse é na verdade um aspecto
        positivo do bullet journal, é algo que te dá
        liberdade para ser quão criativo quiser. Para mim,
        porém, a automação é o único ingrediente que falta
        para o bullet journal ficar perfeito.</p>
        <br />

        <p>Foi por isso que comecei a trabalhar no Bulletin.
        A ideia é combinar elementos dos apps de dashboard
        com o método do bullet journal, dois formatos que
        combinam melhor do que você imaginaria. Um único
        painel reúne widgets para acompanhamento de hábitos
        de sono, despesas, humor, hábitos e mais, e cada um
        deles abre na sua própria página com informações
        mais detalhadas.</p>
        <br />

        <p>Ainda estou resolvendo vários detalhes e fechando
        algumas lacunas de UI/UX, mas até aqui está indo bem,
        e estou animado com ele.</p>`,
    },

    {
      name: "Grimoire",
      icon: "Grimoire",
      kind: "build",
      tags: ["React", "Redux", "Electron", 'Photoshop'],
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
        código aberto desenvolvido com os frameworks
        Electron e React.js, o aplicativo está passando por
        uma reescrita completa e deve dar suporte às
        plataformas macOS, Windows e Linux.</p>
        <br />

        <p>O Grimoire foi inteiramente pensado e
        implementado por mim com o objetivo de oferecer
        uma forma limpa, simples e elegante de compor e
        organizar documentos markdown. O projeto utiliza o
        framework Electron.js como base, o que me permite
        construir aplicações desktop nativas feitas
        inteiramente com tecnologias Web como o React.js, o
        framework de manipulação do DOM escolhido para
        construir toda a camada de interface
        do app.</p>
        <br />

        <p>A aplicação também faz uso da biblioteca Redux
        para gerenciar o estado da aplicação e da interface
        de forma eficiente e direta, combinando a filosofia
        de gerenciamento de estado do Redux com as
        ferramentas oferecidas pelo framework Electron.js
        para manter múltiplos processos de renderização em
        sincronia.
        </p>
        <br />

        <p>O projeto de design original da aplicação pode ser
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
      name: "Tidder",
      icon: "Tidder",
      kind: "design",
      tags: ['Angular', 'Sketch', 'TypeScript', 'Webpack'],
      screens: [{
        ...screens.tidder,
        alt: "Feed da página inicial do Tidder ao lado de uma discussão aberta"
      }],
      links: [],
      description:
        `<p>Tidder é um cliente Reddit de código aberto
        desenvolvido com os frameworks Electron.js e
        Angular 5. O Tidder foi lançado inicialmente em
        2017, e agora está sendo completamente reescrito em
        React.js.
        </p><br />

        <p>O Tidder nasceu para recriar a experiência de
        usuário do Reddit de uma forma mais moderna,
        elegante e simples. Ele começou como uma tentativa
        de redesign da plataforma e acabou virando um
        aplicativo desktop multiplataforma. Ele se apoia no
        que o Angular 5 oferece para consumir a API pública
        do Reddit, gerar e gerenciar o conteúdo do app,
        autenticar usuários do Reddit e exibir esse conteúdo
        de forma dinâmica.</p><br />

        <p>O aplicativo é feito inteiramente com
        tecnologias Web. O Electron.js torna possível
        recorrer a bibliotecas e frameworks JavaScript
        existentes através do Node.js, e construir
        aplicações multiplataforma em HTML, CSS e
        JavaScript de forma rápida, fácil e divertida.</p>
        <br />

        <p>O projeto de design em Sketch está disponível
        para download no meu ${mkLink(
          'repositório do GitLab',
          'https://gitlab.com/Isidore/tidder-mockup'
        )}, junto com os ícones, fontes e tudo mais que fez
        parte do processo de design do app.</p><br />`,
    },

    {
      name: "Medley",
      icon: "Medley",
      kind: "build",
      tags: ["React", "Redux", "Electron", 'TypeScript', "WIP"],
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
        código aberto para a plataforma de mensagens Stoat
        (anteriormente conhecida como "Revolt"), ainda em
        processo de desenvolvimento. Caso você não conheça,
        o Stoat é uma alternativa ao Discord completamente
        federada e de código aberto, e sua API é
        inteiramente documentada no site oficial, que você
        pode conferir ${mkLink(
          'aqui',
          'https://stoat.chat/'
        )}. Sou entusiasta de projetos que colocam o usuário
        em primeiro lugar, então decidi iniciar este projeto
        para fazer o meu próprio cliente de chat do
        Stoat.</p><br />

        <p>Este projeto tem sido um desafio, mas é algo
        pelo qual sou apaixonado. Atualmente ele está sendo
        desenvolvido com uma stack composta por React 18,
        React Router 7 e Redux + Redux Saga para
        gerenciamento de estado.</p>
        <br />

        <p>Atualmente já é possível navegar por servidores,
        canais e mensagens diretas dentro do aplicativo,
        mas há um esforço contínuo para expandir as
        capacidades da aplicação e oferecer uma experiência
        completa.</p>`,
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
