import Vue from 'vue'
import VueRouter from 'vue-router'

import { filterRoutes } from 'utils/helpers'

import RootLayout from 'layouts/RootLayout'
import DefaultLayout from 'layouts/DefaultLayout'
import SplitLayout from 'layouts/SplitLayout'

import Homepage from 'pages/Homepage'
import PageNotFound from 'pages/404'

import * as Projects from 'pages/Projects'
import * as Contact from 'pages/Contact'
import * as About from 'pages/About'

Vue.use(VueRouter)

export const routes = [
  { path: ''
  , abstract: true
  , component: DefaultLayout
  , type: 'layout'
  , children:
  [
    { path: '/'
    , name: 'homepage'
    , type: 'page'
    , component: Homepage
    },

    { path: '/404'
    , name: 'page-not-found'
    , type: 'error-page'
    , component: PageNotFound
    }
  ]},

  { path: '/'
  , component: SplitLayout
  , name: 'split-layout'
  , abstract: true
  , type: 'layout'
  , children:
  [
    { path: '/sobre'
    , name: 'sobre'
    , type: 'page'
    , components:
      { leftColumn: About.TitleSection
      , rightColumn: About.ContentSection
      }
    },

    { path: '/projetos/:projectName?'
    , name: 'projetos'
    , type: 'page'
    , components:
      { leftColumn:  Projects.TitleSection
      , rightColumn: Projects.ContentSection
      }
    },

    { path: '/contato'
    , name: 'contato'
    , type: 'page'
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

router.beforeEach((to, from, next) => {
  if (!to.matched.length)
    next('/404');
  else
    next();
});

export const pageRoutes = filterRoutes(routes);
export default router;
