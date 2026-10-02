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
        alt: "An earlier design of this portfolio, showing a project page"
      }],
      links: [],
      description:
        `<p>This is the original design for the first
        version of my personal portfolio website, built back
        in 2017 still using Vue.js v1, it was pretty much
        my first public project and it's also the precursor
        of the website you're viewing right now! :)</p>
        <br />

        <p>And this is a project that I'm still very proud
        of, I particularly enjoyed working on the UI/UX
        aspect of it, I believe this was before tools like
        Figma or Sketch had taken over UI/UX design, and
        Photoshop was still the go-to, industry-standard app
        for designing interfaces, so I had to teach myself
        to learn how to use it effectively.</p>
        <br />

        <p>One of the challenges I had when developing this
        project was adding support for multiple different
        color themes, back when CSS variables didn't have
        wide support like it does today, so all color
        variables were defined entirelly within SASS, which
        unfortunately meant that themes could only be
        changed at build time. But it was a fun experiment.
        </p>
        <br />

        <p>The old codebase can still be found ${mkLink(
          'on Github',
          'https://github.com/iErik/ierik.github.io/tree/old'
        )}, and the GitLab repository containing the PSD
        design files, fonts and other assets can be found
        ${mkLink(
          'here',
          'https://gitlab.com/Isidore/ierik.github-mockup'
        )}
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
        alt: "Bulletin dashboard tracking sleep, expenses, mood, habits and weight"
      }],
      links: [],
      description:
        `<p>Bulletin is my attempt to turn the bullet journal
        method into something that feels native to the
        digital medium.</p>
        <br />

        <p>For those unfamiliar with it, bullet journaling
        is a note-taking system designed by ${mkLink(
          'Ryder Carroll',
          'https://bulletjournal.com'
        )} for organizing tasks, events, goals, brainstorms,
        or really anything you want to keep track of. I've
        had several bullet journals now that I have used to
        help me keep an eye on my finances, sleep and other
        habits, and it has proven extremely useful. My one
        gripe with it is that it's paper-based, and it takes
        a fair amount of upkeep. Every tracker has to be
        redrawn each month (or each week, for some of them),
        and every piece of information has to be entered by
        hand. Along the way mistakes happen, things get
        forgotten, and repeating the same manual process
        again and again was starting to wear me down.
        <em>There's no automation.</em></p>
        <br />

        <p>Some people really enjoy that side of bullet
        journaling, and there's a whole community that gets
        very creative with it; the manual process is at the
        heart of that creativity. For me, though, automation
        is the one missing ingredient that would make bullet
        journaling perfect.</p>
        <br />

        <p>That's why I started working on Bulletin. The
        idea is to combine elements of dashboard apps with
        the bullet journal method, two formats that suit
        each other better than you'd expect. A single
        dashboard gathers widgets for sleep, expenses, mood,
        habits and more, and each one opens into its own
        page with more in-depth information.</p>
        <br />

        <p>I'm still working out a lot of the details and
        closing a few UI/UX gaps, but so far it's coming
        along well, and I'm excited about it.</p>`,
    },

    {
      name: "Grimoire",
      icon: "Grimoire",
      kind: "build",
      tags: ["React", "Redux", "Electron", 'Photoshop'],
      screens: [{
        ...screens.grimoire,
        alt: "Grimoire's notebook view: a note list beside the open document"
      }],
      links: [{
        label: "GitHub",
        to: "https://github.com/iErik/grimoire",
        icon: "Github"
      }],
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
        powered by Electron.js, which allows me to build
        native desktop applications built entirely with
        Web technologies such as React.js, the framework of
        choice used to build the entire user interface
        layer of the app.</p>
        <br />

        <p>The application also makes use of the Redux
        library to manage application and user interface
        state in an efficient and straightforward manner,
        combining the Redux's state management philosophy
        with the tools offered by the Electron.js framework
        to keep multiple renderer processes in sync.
        </p>
        <br />

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
      name: "Tidder",
      icon: "Tidder",
      kind: "design",
      tags: ['Angular', 'Sketch', 'TypeScript', 'Webpack'],
      screens: [{
        ...screens.tidder,
        alt: "Tidder's front page feed beside an open comment thread"
      }],
      links: [],
      description:
        `<p>Tidder is an open-source Reddit client built
        with the Electron.js and Angular 5 frameworks.
        Tidder was initially released in 2017, and it's now
        being completely rewritten in React.js
        </p><br />

        <p>Tidder set out to recreate Reddit's user
        experience in a more modern, elegant and simple
        way. It began as an attempt to redesign the platform
        and grew into a cross-platform desktop application.
        It leans on what Angular 5 offers to consume
        Reddit's public API, to generate and manage the
        app's content, to authenticate Reddit users, and t
        render that content dynamically.</p><br />

        <p>The app is built entirely with Web
        technologies. Electron.js makes it possible to
        reach for existing JavaScript libraries and
        frameworks through Node.js, and to build
        cross-platform applications in HTML, CSS and
        JavaScript quickly, easily and enjoyably.</p>
        <br />

        <p>The Sketch design project is available to
        download from my ${mkLink(
          'GitLab repository',
          'https://gitlab.com/Isidore/tidder-mockup'
        )}, along with the icons, fonts and everything else
        that went into the app's design process.</p><br />`,
    },

    {
      name: "Medley",
      icon: "Medley",
      kind: "build",
      tags: ["WIP", "React", "Redux", "Electron", 'TypeScript'],
      screens: [{
        ...screens.medley,
        alt: "Medley's direct messages view, with the server list and conversations sidebar"
      }],
      links: [{
        label: "GitHub",
        to: "https://github.com/iErik/Medley",
        icon: "Github"
      }],
      description:
        `<p>Medley is my own open-source desktop client for
        the Stoat  messaging platform (previously known as
        "Revolt") still in development process. In case
        you're not familiar with it, Stoat itself is a
        completely federated and open-source alternative to
        Discord, and its API is fully documented on its
        website, which you can check out ${mkLink(
          'here',
          'https://stoat.chat/'
        )}. I'm enthusiastic about projects that put the
        user first, so I decided to initiate this project to
        make my own Stoat chat client.</p><br />

        <p>This project has been a challenge, but I'm
        passionate about it. Currently it's being developed
        with a stack composed of React 18, React Router 7
        and Redux + Redux Saga for state management.</p>
        <br />

        <p>Currently you can browse servers, channels and
        direct messages directly in the app, but there is
        ongoing effort to expand the app's capabilities to
        offer a complete experience.</p>`,
    },

    {
      name: "Libellus",
      icon: "Libellus",
      kind: "design",
      tags: ['WIP', 'Figma'],
      screens: [{
        ...screens.libellus,
        alt: "Libellus: a canvas of shapes with a styling panel, beside the notes list"
      }],
      links: [],
      description:
        `<p>Libellus is meant to be a markdown editor and a
        virtual whiteboard in one app, basically what you'd
        get by combining ${mkLink(
          'Obsidian',
          'https://obsidian.md'
        )} and ${mkLink(
          'Excalidraw',
          'https://excalidraw.com'
        )}. It is, in a way, the spiritual successor to
        Grimoire, my previous markdown editor app.</p><br />

        <p>I'm the kind of person who likes to take lots of
        notes and scribble on paper to organize my thoughts
        and ideas, but the drawback is that it can get very
        messy. Pages pile up, pages get lost, sometimes they
        get ripped up or my cat spills coffee on them, and
        they always stay disorganized. Moving all that into a
        dedicated app would solve most of these issues, and
        let me do things paper never could.</p><br />

        <p>The idea is for it to provide all the essentials
        of markdown editing, while also letting me add vector
        and raster graphics to a note and manipulate them
        there — maybe even scribble straight into the page
        with a drawing tablet. Alongside regular notes there
        would be canvas documents: big whiteboards given over
        to shapes and vector graphics. Notes would stay
        text-first, with room to draw in them; canvases would
        be the other way round.</p><br />

        <p>The app is in the early stages of design. I've
        paused it to work on other things, but I intend to
        come back to it and build a working prototype soon.
        So stay tuned 😜</p>`,
    },
]


export default {
  navMenu: [
    'Homepage',
    'About me',
    'Experience',
    'Portfolio'
  ],
  nav: {
    primary: 'Main',
    sections: 'Sections'
  },
  pages: {
    about: {
      presentation: {
        eyebrow: "About",
        title: "Front-end engineer. Eight years building",
        titleAccent: "web applications.",
        role: "Senior Front-end Engineer",
        text: `I specialise in Single-Page (SPA) and
          Server-Side Rendered (SSR) applications built with
          Vue.js/Nuxt.js and React.js/Next.js — across HR,
          and CRM platforms.`
      },
      skills: {
        title: "Skills"
      },
    },
    experience: {
      eyebrow: "Experience",
      title: "My professional journey",
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
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Selected work",
      kinds: {
        build: "Build",
        design: "Design"
      },
      view: "View project",
      close: "Close",
      projects
    }
  }
}
