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
pnpm covers:optimize   # project covers -> AVIFs (macOS only); add --force to redo all
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
- **Two navigations, split at `$rail-breakpoint` (1500px, in `styles/utils/_mixins.scss`) and
  never both on screen.** Below it the pill `NavMenu`; above it `ScrollIndicator` — a segmented
  rail whose buttons call the same `scrollToSection`. **Nothing reserves space for the rail**: it
  is fixed to the right edge, but by 1500px the widest section already clears it. That rests on an
  invariant — the portfolio grid caps at 1320px, so its cards sit `(viewport − 1320) / 2 + 30` from
  the right edge, against the 118px the widest rail label reaches in; those meet at 1496px. A
  section wider than ~1264px at 1500px would slide under the labels, and would need either a
  narrower cap or the right padding reinstating.
  Both are fed the same `navItems` from `App.vue`, which maps positionally onto the `navMenu`
  array in the locale files, so reordering locale entries reorders both. The handover is pure
  CSS (`display: none` at each end); there is no JS breakpoint state and no enable flag.
  The pill also **hides on scroll down and returns on scroll up** (`useNavVisibility.ts`, a
  passive rAF-throttled listener writing the `navHidden` ref). `scrollToSection` stamps a deadline
  that `isProgrammaticScroll()` in `useLenis.ts` reads, so a jump the user asked for never scrolls
  the menu away; the bar is only transformed, never unmounted, and `:focus-within` brings it back
  for keyboard users.
- `activeSection` **and** `sectionProgress` (progress through the current section, for the rail's
  segment fill) both live in `useActiveSection.ts` and are written by the transition driver.
  Under `prefers-reduced-motion` the driver still runs with `fade = 0` — only the *layout* is
  disabled. Don't restore the early return: the rail is navigation, so `activeSection` has to be
  right whether or not anything is animating, and the custom properties the driver writes are
  inert without the `-animated` class anyway.
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
  Project images are the exception to per-locale data: they live once in `src/locale/screens.ts`,
  and each locale spreads an entry into `screens` and adds its own `alt`. Generate the AVIF variants
  from the `*-cover` originals with `pnpm covers:optimize`, then commit them: it is macOS-only (`sips`) and
  deliberately not part of the build, which also runs on the Linux deploy runner. The originals are
  never imported, so they never ship — but every AVIF in that folder is (a glob import), which is
  why the script deletes AVIFs left behind by a renamed cover or a dropped width.
- **The project detail view is a native `<dialog>` opened with `showModal()`** — keep it that way.
  It mounts inside the Portfolio stage, whose `.pin` carries the cross-fade's `transform` and
  `opacity`, so a `position: fixed` overlay would be positioned and faded relative to the section.
  The top layer escapes both. Scroll is locked through `pauseScroll`/`resumeScroll` in `useLenis.ts`.
  Any new `<dialog>` must set `position: fixed` itself: `_normalize.scss` still has the old dialog
  polyfill (`position: absolute`), which beats the browser's modal positioning, so the dialog lands at
  the top of the document and opening it scrolls the page to 0.
- **i18n typing**: `src/types.d.ts` augments `vue-i18n`'s `DefineLocaleMessage` with the message shape
  (`ExperienceType`, `ProjectType`, `ProjectTag`). Changing the locale structure means updating that
  declaration or `pnpm type-check` fails.

### Path aliases

Aliases are defined once in `paths.json` and consumed by both `tsconfig.json` (via `extends`) and
`vite.config.ts` (which derives its `resolve.alias` from the same file). **Add new aliases only in
`paths.json`.**

### SVG icons

`vite/svg-plugin.ts` is a vendored, modified fork of `vite-svg-loader`. It compiles `.svg` imports into
Vue render functions and **strips hardcoded `fill`/`stroke` hex colors** so icons are colored from SCSS.
Query suffixes `?raw`, `?component`, `?skipsvgo`, `?url` are supported (typed in `env.d.ts`); the default
import is `component`. Icons are re-exported by name from `src/assets/icons/index.ts`; `useIcon` /
`<Icon name="...">` resolve by that key, so a new icon must be added to that barrel to be usable.

**Icon colour lives in CSS, not in the markup.** That plugin only strips *hex* paints, and Figma exports
these icons as the named colours black and white, which survive it — that is how an icon ends up drawn
black on a dark header. So `pnpm icons:recolor` (`scripts/recolor-icons.mjs`) rewrites every artwork
paint to `currentColor`, and `--icon-color` / `--icon-color-muted` / `--icon-color-subtle` in
`base/_variables.scss` are applied by `base/_icons.scss` (`svg.icon`, plus `-muted`/`-subtle`
modifiers). Run it after adding or re-exporting an icon. Paints inside `<mask>`, `<clipPath>` and
friends are machinery, not colour, and are left alone: Libellus's outline is cut by a mask whose black
and white decide what shows. **Two-tone marks are skipped** — the iErik cube draws dark edges against
white faces and names `--icon-color-contrast` for them, because flattening both tones to one colour
turns it into a silhouette.

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

## Conventions

Match the existing style: no semicolons, 2-space indent, lines wrapped narrowly (~60 chars), `<script
lang="ts" setup>` with the template first, components as `ComponentName/index.vue` directories,
BEM-ish `-modifier` class names (`.tag.-blue`, `.nav-wrap.-hidden`) selected with `& > .child` nesting.
