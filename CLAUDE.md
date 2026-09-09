# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site (`ierik.github.io`) — Vue 3 + TypeScript + Vite, static, deployed to GitHub Pages.
There is no test suite, no linter, and no formatter configured. Type-checking is the only automated gate.

## Commands

```sh
pnpm install       # pnpm is required (pnpm-lock.yaml, pnpm-workspace.yaml)
pnpm dev           # vite serve --host, port 3000 (strictPort), HMR ws on 3001
pnpm type-check    # vue-tsc --build — the only check; run it before considering work done
pnpm build         # type-check + vite build, in parallel, into dist/
pnpm preview       # serve the built dist/
```

Server host/ports come from the non-standard `env` block in `package.json` (`HOST`, `PORT`, `WS`), which
`vite.config.ts` imports directly — change ports there, not in the Vite config.

## Deployment

`.github/workflows/deploy.yaml` builds and publishes `dist/` to GitHub Pages on push to **`master`**
(note: `master`, not `main`). Client-side routing on Pages relies on the spa-github-pages hack — the
redirect script in `public/404.html` plus the matching restore script in `index.html`. If routing breaks
on the deployed site, look there first.

## Architecture

- **Entry**: `src/main.ts` → `App.vue` (WebGL background + fixed nav + OverlayScrollbars scroll view
  wrapping `<RouterView>` with named `route-*` transitions) → pages via `src/router.ts`.
- **Routes** are three lazy-loaded pages (`Homepage`, `Portfolio`, `About`); nav items in `App.vue` map
  positionally onto the `navMenu` array in the locale files, so reordering locale entries reorders the nav.
- **Content lives in the locale files, not in components.** `src/locale/en.ts` and `pt.ts` carry the actual
  portfolio copy, project lists, and experience entries as structured data; pages read them via
  `useI18n().messages` and render. Adding a project or job = editing both locale files.
  `src/locale/shared.ts` has `mkLink`, and descriptions are HTML strings rendered with `v-html`.
- **i18n typing**: `src/types.d.ts` augments `vue-i18n`'s `DefineLocaleMessage` with the message shape
  (`ExperienceType`, `ProjectType`, `ProjectTag`). Changing the locale structure means updating that
  declaration or `pnpm type-check` fails.

### Path aliases

Aliases are defined once in `paths.json` and consumed by both `tsconfig.json` (via `extends`) and
`vite.config.ts` (which derives its `resolve.alias` from the same file). **Add new aliases only in
`paths.json`.** Some declared aliases (`@store`, `@layouts`, `@hooks`, `@views`, `@themes`) point at
directories that do not exist yet.

### SVG icons

`vite/svg-plugin.ts` is a vendored, modified fork of `vite-svg-loader`. It compiles `.svg` imports into
Vue render functions and **strips hardcoded `fill`/`stroke` hex colors** so icons are colored from SCSS.
Query suffixes `?raw`, `?component`, `?skipsvgo`, `?url` are supported (typed in `env.d.ts`); the default
import is `component`. Icons are re-exported by name from `src/assets/icons/index.ts`; `useIcon` /
`<Icon name="...">` resolve by that key, so a new icon must be added to that barrel to be usable.

### Styles

Global SCSS entry `src/styles/index.scss` → `base/_index.scss` (normalize, reset, base, variables, fonts,
typography, scrollbar). Components use `<style lang="scss" scoped>` and `@use '@styles/utils/mixins'`.
Theming is CSS custom properties on `:root` in `styles/base/_variables.scss` (fonts, `--color-fg`,
`--color-accent`); `styles/utils/` holds mixins (`min-width`, `tablet`, icon helpers), color, typography,
and a `frame` glassmorphism mixin in `_theming.scss`. Fonts are self-hosted variable woff2 under
`src/assets/fonts/`, declared in `base/_fonts.scss`.

### WebGL background

`src/components/Background/index.vue` is self-contained raw WebGL: a metaball simulation whose GLSL is
generated as template strings in `Background/shaders.ts` (the fragment shader is parameterized by the
metaball count), with thin helpers in `src/utils/webgl.ts`. Layered on top are fixed-position grid,
grain, and blur overlay divs.

**Dead code, do not build on it**: `src/composables/useThreejs.ts`, `useGltf.ts`, `useObj.ts` and the
whole `src/shaders/*.glsl` tree are unused leftovers — three.js is not a dependency and the vite-glsl
plugin was removed, so `.glsl` files no longer have a loader.

## Conventions

Match the existing style: no semicolons, 2-space indent, lines wrapped narrowly (~60 chars), `<script
lang="ts" setup>` with the template first, components as `ComponentName/index.vue` directories,
BEM-ish `-modifier` class names (`.tag.-blue`, `.nav-wrap.-hidden`) selected with `& > .child` nesting.
