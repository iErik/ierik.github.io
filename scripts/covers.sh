#!/bin/sh
# Turns every *-cover image in the projects folder into the
# AVIFs the site ships, one per width in WIDTHS.
#
#   pnpm covers            only covers that changed
#   pnpm covers --force    all of them
#
# macOS only: it uses the built-in sips. It is deliberately
# not part of `pnpm build`, which also runs on the Linux
# deploy runner - the AVIFs are committed, so run this after
# changing a cover and commit what it writes.

set -eu

# Keep in step with WIDTHS in src/locale/screens.ts
WIDTHS="960 1600 2400"

# Covers are exported at 16:10, at least this wide. sips -Z
# always resizes, so anything narrower is upscaled
MIN_WIDTH=2400

ROOT=$(cd "$(dirname "$0")/.." && pwd)
DIR="$ROOT/src/assets/img/projects"
SCREENS="$ROOT/src/locale/screens.ts"

FORCE=0
case "${1:-}" in
  --force) FORCE=1 ;;
  "") ;;
  *) echo "usage: $0 [--force]" >&2; exit 2 ;;
esac

if ! command -v sips >/dev/null 2>&1; then
  echo "sips not found - this script needs macOS" >&2
  exit 1
fi

cd "$DIR"

# sips -g prints "  pixelWidth: 2400"
dimension() {
  sips -g "$1" "$2" | awk -v key="$1:" '$1 == key { print $2 }'
}

covers=0
written=0
removed=0

for cover in *-cover.png *-cover.jpg *-cover.jpeg; do
  # A pattern with no matches is left as literal text
  [ -e "$cover" ] || continue
  covers=$((covers + 1))

  name=${cover%-cover.*}
  width=$(dimension pixelWidth "$cover")
  height=$(dimension pixelHeight "$cover")

  if [ "$width" -lt "$MIN_WIDTH" ]; then
    echo "warn: $cover is ${width}px wide, under" \
      "${MIN_WIDTH}px - it will be upscaled and look soft"
  fi

  # 16:10 is exactly width * 10 == height * 16
  if [ $((width * 10)) -ne $((height * 16)) ]; then
    echo "warn: $cover is ${width}x${height}, not 16:10 -" \
      "cards will crop it"
  fi

  for w in $WIDTHS; do
    out="$name-$w.avif"

    # Newer than its cover means already up to date
    if [ "$FORCE" -eq 0 ] && [ "$out" -nt "$cover" ]; then
      continue
    fi

    sips -s format avif -Z "$w" "$cover" --out "$out" \
      >/dev/null
    echo "wrote $out"
    written=$((written + 1))
  done

  if ! grep -q "screen('$name')" "$SCREENS"; then
    echo "note: '$name' is not in src/locale/screens.ts" \
      "yet - add it there to use it"
  fi
done

# screens.ts imports every AVIF in this folder, so one left
# behind by a renamed or deleted cover, or in a width no
# longer used, would still ship
for avif in *.avif; do
  [ -e "$avif" ] || continue

  name=${avif%-*.avif}
  size=${avif##*-}
  size=${size%.avif}

  case " $WIDTHS " in
    *" $size "*) ;;
    *)
      rm "$avif"
      echo "removed $avif (width not in: $WIDTHS)"
      removed=$((removed + 1))
      continue
      ;;
  esac

  if ! ls "$name"-cover.* >/dev/null 2>&1; then
    rm "$avif"
    echo "removed $avif (no $name-cover image)"
    removed=$((removed + 1))
  fi
done

echo "$covers covers, $written AVIFs written, $removed removed"
