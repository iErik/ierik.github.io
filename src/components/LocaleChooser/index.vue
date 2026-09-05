<template>
  <div class="locale-chooser">
    <button
      type="button"
      :class="localeClasses('en')"
      :aria-pressed="locale === 'en'"
      @click="() => chooseLocale('en')"
    >
      en
    </button>
    <span class="divider">/</span>
    <button
      type="button"
      :class="localeClasses('pt')"
      :aria-pressed="locale === 'pt'"
      @click="() => chooseLocale('pt')"
    >
      pt
    </button>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

type LocaleType = 'en' | 'pt'

const { locale } = useI18n()

const localeClasses = (localeType: LocaleType) => [
  'locale',
  locale.value === localeType ? '-active' : ''
]

const chooseLocale = (localeType: LocaleType) => {
  locale.value = localeType
}

watch(locale, (current) => {
  document.documentElement.lang = current
}, { immediate: true })
</script>

<style lang="scss" scoped>
.locale-chooser {
  display: flex;
  align-items: center;

  font-size: 13px;
  text-transform: uppercase;
  color: var(--color-fg);
  user-select: none;

  & > .locale {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 44px;
    min-height: 44px;

    border: none;
    background: none;
    padding: 0;

    font: inherit;
    text-transform: inherit;
    color: rgba(var(--color-fg-rgb), .5);

    transition: color 200ms;

    &:hover { color: rgba(var(--color-fg-rgb), .8); }

    &.-active {
      color: var(--color-fg);
      font-weight: 700;
    }
  }

  & > .divider { color: rgba(var(--color-fg-rgb), .5); }
}
</style>
