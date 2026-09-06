import { ref, onMounted, onUnmounted } from 'vue'

export default function useMediaQuery(query: string) {
  // Guarded rather than deferred to onMounted: callers
  // read this from computeds that render on first paint,
  // and starting at false would flash the wrong layout
  const mediaQuery = typeof window !== 'undefined'
    ? window.matchMedia(query)
    : null

  const matches = ref(mediaQuery?.matches ?? false)

  const onChange = (ev: MediaQueryListEvent) => {
    matches.value = ev.matches
  }

  onMounted(() => {
    if (!mediaQuery) return

    // The viewport can have changed between setup and
    // mount
    matches.value = mediaQuery.matches
    mediaQuery.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', onChange)
  })

  return matches
}
