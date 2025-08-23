import { createI18n, type I18nOptions } from 'vue-i18n'

import en from '@locale/en.json'
import pt from '@locale/pt.json'

export type LocaleSchema = typeof en

const options: I18nOptions = {
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: { en, pt }
}

export default createI18n<false, typeof options>(options)
