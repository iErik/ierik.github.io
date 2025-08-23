<template>
  <component
    :is="props.isLink ? Link : 'button'"
    v-bind="rootAttrs"
  >
    <slot>
      <Icon
        v-if="props.icon" :name="props.icon"
        :size="iconSize"
        class="icon"
      />

      <span v-if="props.label" class="label">
        {{ props.label }}
      </span>
    </slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import Link, {
  type LinkProps
} from '@components/Link/index.vue'

import Icon, {
  type IconName
} from '@components/Icon/index.vue'


export type BaseButtonProps = {
  icon?: IconName
  label?: string
  isLink?: false
  iconOnly?: boolean
  large?: boolean
}

export type ButtonLinkProps =
  LinkProps & Omit<BaseButtonProps, 'isLink'> & {
  isLink: true
}

export type ButtonProps = BaseButtonProps | ButtonLinkProps


const props = defineProps<ButtonProps>()

const iconOnly = computed(() =>
  props.iconOnly || (props.icon && !props.label))

const iconSize = computed(() =>
  props.large ? 44 : 24)

const rootAttrs = computed(() => ({
  class: [
    'btn',
    iconOnly.value && '-icon-only',
    props.large && '-large'
  ],

  style: {
    '--size': props.large ? '80px' : '50px'
  },

  ...(!props.isLink ? null : {
    to: props.to,
    external: props.external,
    params: props.params
  })
}))


</script>

<style lang="scss" scoped>
@use '@styles/utils/typography';
@use '@styles/utils/theming';

.btn {
  display: flex;
  align-items: center;
  gap: 12px;
  height: var(--size);

  @include theming.frame;
  padding: 13px 15px;

  cursor: pointer;

  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.0);
  transition: box-shadow 200ms;

  &.-icon-only {
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    width: var(--size);

    & > .label { display: none; }
  }

  & > .icon { }

  & > .label {
    @include typography.button;
    margin-right: 10px;
  }

  &:hover {

    box-shadow: 0px 0px 30px -2px rgba(255, 255, 255, 0.2);
  }
}
</style>
