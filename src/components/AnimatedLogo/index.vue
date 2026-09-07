<template>
  <div ref="wrapEl" class="animated-logo">
    <div class="glow" />

    <div class="tilt" :style="tiltStyle">
      <div class="float">
        <Logo class="mark" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  useTemplateRef
} from 'vue'

import Logo from '@components/Logo/index.vue'

// Degrees of tilt at the edges of the viewport
const TILT = 9

const wrapEl = useTemplateRef<HTMLElement>('wrapEl')

const tilt = ref({ x: 0, y: 0 })

// CSS carries the easing, so there's no rAF loop here -
// the idle drift is a keyframe animation and the pointer
// tilt is a transitioned transform, both on the compositor
const tiltStyle = computed(() => ({
  transform: `rotateX(${tilt.value.x}deg) `
    + `rotateY(${tilt.value.y}deg)`
}))

const prefersReducedMotion = () => window
  .matchMedia('(prefers-reduced-motion: reduce)')
  .matches

const onPointerMove = (ev: PointerEvent) => {
  const x = (ev.clientX / window.innerWidth) * 2 - 1
  const y = (ev.clientY / window.innerHeight) * 2 - 1

  // Inverted on X so the mark leans towards the cursor
  tilt.value = { x: -y * TILT, y: x * TILT }
}

onMounted(() => {
  if (prefersReducedMotion()) return

  window.addEventListener('pointermove', onPointerMove,
    { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<style lang="scss" scoped>
.animated-logo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  aspect-ratio: 1;

  // Shallow enough that the tilt reads as the mark
  // turning rather than a flat card flipping
  perspective: 900px;

  & > .glow {
    position: absolute;
    inset: 12%;
    border-radius: 50%;

    background: radial-gradient(
      circle,
      rgba(var(--color-fg-rgb), .10) 0%,
      rgba(var(--color-fg-rgb), 0) 68%);

    animation: pulse 9s ease-in-out infinite;
  }

  & > .tilt {
    width: 68%;
    transform-style: preserve-3d;
    transition: transform 900ms cubic-bezier(.16, 1, .3, 1);
  }

  & > .tilt > .float {
    animation: float 9s ease-in-out infinite;
  }

  & > .tilt > .float > .mark {
    display: block;
    width: 100%;
    // Same softening the homepage puts on its logo
    filter: blur(0.8px);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(-8px) rotate(-1.1deg); }
  50% { transform: translateY(8px) rotate(1.1deg); }
}

@keyframes pulse {
  0%, 100% { opacity: .55; transform: scale(.94); }
  50% { opacity: 1; transform: scale(1.04); }
}

@media (prefers-reduced-motion: reduce) {
  .animated-logo {
    & > .glow,
    & > .tilt > .float { animation: none; }
    & > .tilt { transition: none; }
  }
}
</style>
