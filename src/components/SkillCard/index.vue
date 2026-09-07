<template>
  <div :class="['skill-card', chip ? '-chip' : '']">
    <Icon
      v-if="props.icon"
      class="icon"
      :name="props.icon"
      :size="32"
    />

    <p class="label">{{ props.label }}</p>
  </div>
</template>

<script lang="ts" setup>
import Icon, {
  type IconName
} from '@components/Icon/index.vue'

// No proficiency value by design: a self-graded percentage
// puts eight years of Vue on the same scale as a framework
// touched once. Standing is carried by size instead - the
// primaries render large, everything else as a chip.
const props = defineProps<{
  label: string
  icon?: IconName
  chip?: boolean
}>()
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';
@use '@styles/utils/theming';

.skill-card {
  @include theming.frame;

  display: flex;
  align-items: center;
  gap: 14px;

  border-radius: 10px;
  padding: 18px 22px;

  transition: border-color 300ms, background-color 300ms,
    transform 300ms;

  @include mixins.icon { fill: var(--color-fg); }
  @include mixins.icon-size(26px);

  @include mixins.min-width(376px) {
    @include mixins.icon-size(32px);
  }

  & > .label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .04em;
    text-transform: uppercase;

    @include mixins.min-width(376px) { font-size: 15px; }
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--color-fg-rgb), .55);
    background-color: rgba(250, 250, 250, .2);
  }

  // Secondary tier: label only, no mark, tighter box
  &.-chip {
    padding: 9px 16px;
    border-radius: 40px;

    & > .label {
      font-size: 12px;
      font-weight: 500;
      color: rgba(var(--color-fg-rgb), .75);
    }

    &:hover > .label { color: var(--color-fg); }
  }
}
</style>
