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

- **Entry**: `src/main.ts` → `App.vue` (fixed WebGL background + fixed nav + `<RouterView>`) →
  `src/pages/Landing.vue` via `src/router.ts`. The document itself scrolls — there is no scroll
  container.
- **It is a single scrolling page, not three routes.** All three paths (`/`, `/portfolio`, `/about`)
  render the same `Landing.vue`, which stacks the page components as `.stage` wrappers whose ids
  come from `src/sections.ts` (the one place route names, section ids and page order are defined).
  The paths exist only to name a landing spot: `Landing.vue` scrolls to the matching section on
  mount, and a scrollspy calls `router.replace` as you scroll. **Those two directions can feed each
  other** — the `syncingFromScroll` flag in `Landing.vue` is what stops the loop; don't remove it.
- **Section cross-fade** (`src/composables/useSectionTransitions.ts`): each stage holds in place and
  fades out while the next fades in, over `--fade` (60% of viewport) of scroll. Two non-obvious
  things hold it together, both of which look like they should work otherwise:
  - The hold uses a **negative sticky `top`** (`--pin-top` = viewport − section height), so a
    section pins exactly when its bottom edge reaches the viewport bottom. `bottom: 0` does *not*
    work — sticky only ever pulls an element toward the edge it names, so bottom-sticky reveals an
    element early and releases it, rather than holding one you have scrolled past.
  - The hold distance is a **real `.hold` spacer div**, not `padding-bottom` on the stage. A sticky
    element is constrained to its containing block's *content* box, so padding gives it zero room
    and it just scrolls away.
  `activeSection` is derived from this same maths rather than an IntersectionObserver: stages
  overlap by `--fade`, so an observer would see two of them mid-viewport and flip-flop, which the
  URL sync turns into address-bar chatter.
- Nav items in `App.vue` map positionally onto the `navMenu` array in the locale files, so
  reordering locale entries reorders the nav.
- **Adding or reordering a section** touches five places and type-checking only catches some of
  them: `src/sections.ts` (order + id), `src/router.ts` (its path), `componentFor` in
  `Landing.vue`, the `navMenu` array in **both** locale files, and `navItems` in `App.vue` — the
  last two are positional, so an entry added to one and not the other silently mislabels the nav.
- **Scrolling and motion**: `src/composables/useLenis.ts` owns a single Lenis instance, created in
  `App.vue`'s `setup()` — *not* `onMounted`, because children mount first and `Landing` needs it.
  `scrollToSection` calls `lenis.resize()` before every jump: Lenis clamps targets to the scroll
  limit it last measured, and a stale measurement silently lands the jump at the top.
  `src/directives/reveal.ts` is the global `v-reveal` directive (IntersectionObserver → `-revealed`
  class, optional index for stagger); pair it with the `motion.reveal` mixin in
  `src/styles/utils/_motion.scss`. It skips anything inside its stage's first screenful — the
  section cross-fade already carries that, and revealing it too animates it twice. Lenis, the
  reveals and the cross-fade all honour `prefers-reduced-motion`; for the cross-fade that means
  dropping the *layout* too (no overlap, no sticky), since keeping the negative margins while
  forcing opacity to 1 would stack two sections on top of each other.
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
