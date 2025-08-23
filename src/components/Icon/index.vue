<template>
  <component
    :is="iconComponent"
    :width="`${size}px`"
    :height="`${size}px`"
    :style="{ '--size': `${size}px` }"
    class="icon"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import useIcon from '@composables/useIcon'
import type { IconName } from '@composables/useIcon'

const { size = 24, ...props }= defineProps<{
  name: IconName
  size?: number
}>()


const iconComponent = computed(() => {
  return useIcon(props.name)
})

export type { IconName }

</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.icon {
  $size: var(--size);

  width: $size;
  height: $size;

  min-width: $size;
  max-width: $size;

  min-height: $size;
  max-height: $size;
}

</style>
