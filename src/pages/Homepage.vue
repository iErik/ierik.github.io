<template>
  <section class="homepage">
    <Logo class="logo" />
    <h1 class="heading">Erik Isidore</h1>

    <div class="links">
      <div
        v-for="link in contactLinks"
        :key="link.label"
        class="link"
      >
        <Button v-bind="link" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'

import Logo from '@components/Logo/index.vue'
import Button, {
  type ButtonLinkProps
}  from '@components/Button/index.vue'


import useMediaQuery from '@composables/useMediaQuery'

const isMobile = useMediaQuery('(max-width: 635px)')
const isTablet = useMediaQuery('(max-width: 880px)')

type ContactLinks = ComputedRef<ButtonLinkProps[]>

const contactLinks: ContactLinks = computed(() => [
  {
    icon: 'Behance',
    label: 'Behance',
    isLink: true,
    iconOnly: isTablet.value,
    large: isTablet.value && !isMobile.value,
    to: 'https://www.behance.net/iErik'
  },
  {
    icon: 'Dribbble',
    label: 'Dribbble',
    isLink: true,
    iconOnly: isTablet.value,
    large: isTablet.value && !isMobile.value,
    to: 'https://dribbble.com/itsErik'
  },
  {
    icon: 'Linkedin',
    label: 'LinkedIn',
    isLink: true,
    iconOnly: isTablet.value,
    large: isTablet.value && !isMobile.value,
    to: 'https://www.linkedin.com/in/itserik'
  },
  {
    icon: 'Github',
    label: 'Github',
    isLink: true,
    iconOnly: isTablet.value,
    large: isTablet.value && !isMobile.value,
    to: 'https://github.com/iErik'
  },
  {
    icon: 'Gitlab',
    label: 'Gitlab',
    isLink: true,
    iconOnly: isTablet.value,
    large: isTablet.value && !isMobile.value,
    to: 'https://gitlab.com/Isidore'
  }
])

</script>

<style lang="scss" scoped>
@use '@styles/utils/typography';
@use '@styles/utils/mixins';

.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding-top: 190px;
  width: 100%;

  & > .logo { width: 106px; }

  & > .heading {
    @include typography.heading;

    font-size: 60px;
    white-space: nowrap;
  }

  & > .links {
    display: flex;
    gap: 20px;
  }

  @include mixins.min-width(415px) {
    padding-top: 225px;

    & > .heading { font-size: 72px; }
    & > .logo { width: 136px; }
  }

  @include mixins.min-width(635px) {
    padding-top: 250px;

    & > .logo { width: 181px; }
    & > .heading { font-size: 96px; }
    & > .links { gap: 50px; }
  }

  @include mixins.min-width (881px) {
    & > .logo { width: 181px; }
    & > .heading { @include typography.heading; }
    & > .links { gap: 20px; }
  }
}
</style>
