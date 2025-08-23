<template>
  <div class="locale-chooser">
    <span class="locale" @click="() => chooseLocale('en')">
      en
    </span>
    /
    <span class="locale"@click="() => chooseLocale('pt')">
      pt
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

console.log({ locale })
const chooseLocale = (localeType: 'en' | 'pt') => {
  locale.value = localeType
}
</script>

<style lang="scss" scoped>
.locale-chooser {
  font-size: 13px;
  text-transform: uppercase;
  color: var(--color-fg);
  user-select: none;

  & > .locale { cursor: pointer; }
}
</style>
