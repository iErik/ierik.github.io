import Vue from 'vue'
import VueRouter from 'vue-router'

import RootLayout from 'layouts/RootLayout'
import DefaultLayout from 'layouts/DefaultLayout'
import SplitLayout from 'layouts/SplitLayout'

import Homepage from 'pages/Homepage'

import * as Projects from 'pages/Projects'
import * as Contact from 'pages/Contact'
import * as About from 'pages/About'

Vue.use(VueRouter)

export const routes = [
  { path: ''
  , abstract: true
  , component: DefaultLayout
  , children:
  [
    { path: '/'
    , name: 'homepage'
    , component: Homepage
    }
  ]},

  { path: '/'
  , component: SplitLayout
  , name: 'split-layout'
  , abstract: true
  , children:
  [
    { path: '/about'
    , name: 'about'
    , components:
      { leftColumn: About.TitleSection
      , rightColumn: About.ContentSection
      }
    },

    { path: '/projects/:projectName?'
    , name: 'projects'
    , components:
      { leftColumn:  Projects.TitleSection
      , rightColumn: Projects.ContentSection
      }
    },

    { path: '/contact'
    , name: 'contact'
    , components:
      { leftColumn: Contact.TitleSection
      , rightColumn: Contact.ContentSection
      }
    }
  ]}
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
