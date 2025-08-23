<template>
  <nav class="nav-menu">
    <div
      v-for="item in props.items"
      :key="item.route"
      class="item"
    >
      <Link class="link" :to="item.route">
        <p class="label">{{ item.label }}</p>
      </Link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import Link from '@components/Link/index.vue'

type NavMenuItem = {
  label: string
  route: string
}

const props = defineProps<{
  items: NavMenuItem[]
}>()
</script>

<style lang="scss" scoped>
@use '@styles/utils/mixins';

.nav-menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 30px;

  height: 60px;
  border: 1px solid;
  border-color: rgba(199, 198, 198, .38);
  border-radius: 45px;

  background-color: rgba(250, 250, 250, .13);
  backdrop-filter: blur(90px);

  @include mixins.min-width(635px) {
    padding: 0 45px;
  }

  & > .item {
    & > .link > .label {
      font-size: 12px;

      @include mixins.min-width(635px) {
        font-size: 16px;
      }
    }

    &:not(:last-child) {
      display: inline-flex;
      align-items: center;
      padding-right: 13px;

      &::after {
        display: inline-block;
        content: '';
        border-radius: 50%;
        background-color: var(--color-accent);
        width: 5px;
        height: 5px;
        margin-left: 13px;
      }

      @include mixins.min-width(635px) {
        padding-right: 24px;
        &::after { margin-left: 24px; }
      }
    }

    & > .link > .label { white-space: nowrap; }
  }
}
</style>
