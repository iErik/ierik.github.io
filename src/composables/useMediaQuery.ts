import { ref, onMounted, onUnmounted } from 'vue'

// TODO: Remove listeners when no longer necessary
export default function useMediaQuery(query: string) {
  const matches = ref(false)

  const mediaQuery = window.matchMedia(query)
  matches.value = mediaQuery.matches

  const onChange = (ev: MediaQueryListEvent) => {
    matches.value = ev.matches
  }

  onMounted(() => {
    mediaQuery.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', onChange)
  })

  return matches
}
