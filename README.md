# iErik.github.io

My portfolio site. Vue 3, TypeScript, Vite. Static;
deployed to GitHub Pages.

## Requirements

- Node `^20.19.0` or `>=22.12.0`
- pnpm 10

Or with Nix: `nix develop` provides both.

## Run

```sh
pnpm install
pnpm dev        # http://localhost:3000
```

The dev server listens on all interfaces, port 3000, with
HMR on 3001; both ports are strict. Change them in the
`env` block of `package.json`.

## Build

```sh
pnpm build      # type-check + bundle into dist/
pnpm preview    # serve dist/ at http://localhost:4173
```

`pnpm type-check` runs the type-check alone. There are
no tests or linter.

## Assets

```sh
pnpm covers:optimize   # project covers -> AVIF (macOS only)
pnpm icons:recolor     # icon paints -> currentColor
```

Run these after changing a cover or an icon, then commit the
output. The build does not run them.

## Deploy

Pushing to `master` builds and publishes to GitHub Pages
(`.github/workflows/deploy.yaml`).
