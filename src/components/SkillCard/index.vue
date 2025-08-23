<template>
  <div class="skill-card" :style="styleVars">
    <div class="content">
      <Icon class="icon" :name="props.icon" :size="32"/>
      <p class="label">{{ props.label }}</p>
    </div>

    <span class="percentage" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import Icon, {
  type IconName
} from '@components/Icon/index.vue'

const props = defineProps<{
  icon: IconName,
  label: string,
  percentage: number
}>()

const styleVars = computed(() => ({
  '--percentage': `${props.percentage * 100}%`
}))
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.skill-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid;
  border-radius: 8px;
  border-color: rgba(199, 198, 198, .38);

  background-color: rgba(250, 250, 250, .13);

  backdrop-filter: blur(90px);

  padding: 10px 20px;

  & > .content {
    display: flex;
    align-items: center;
    //gap: 20px;
    gap: 12px;
    padding-bottom: 8px;

    @include mixins.icon {
      fill: var(--color-fg);
    }

    @include mixins.icon-size(23px);

    @include mixins.min-width(376px) {
      @include mixins.icon-size(32px);
    }

    & > .label {
      /*
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
      */

      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;

      @include mixins.min-width(376px) { font-size: 14px; }
    }
  }

  & > .percentage {
    position: relative;
    display: flex;
    border: 1px solid;
    border-radius: 4px;
    border-color: rgba(199, 198, 198, .38);

    height: 4px;
    background: transparent;
    width: 100%;

    &::before {
      position: absolute;
      content: '';
      display: flex;
      width: var(--percentage);
      background: rgba(199, 198, 198, .38);
      height: 100%;
    }
  }
}
</style>
