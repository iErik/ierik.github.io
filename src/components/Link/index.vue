<template>
  <component
    class="link"
    :is="isHref ? 'a' : 'router-link'"
    v-bind="linkAttrs"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export type LinkProps = {
  to: string
  external?: boolean,
  params?: Record<string, any>
}

const props = defineProps<LinkProps>()

const isHref = computed(() => {
  return props.external || props.to.startsWith('https://')
})

const linkAttrs = computed(() => {
  if (isHref.value) return {
    target: '_blank',
    href: props.to
  }

  return {
    to: { name: props.to, params: props.params },
    activeClass: '-active'
  }
})
</script>

<style lang="scss" scoped>

.link {
  text-decoration: none;
  font-family: var(--base-font);
  font-weight: var(--base-font-weight);
  font-size: var(--base-font-size);
  text-transform: uppercase;

  color: var(--color-fg);

  &.-active {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
}
</style>
