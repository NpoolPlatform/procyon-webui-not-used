import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { AppLangInfo, Language } from './types'

interface LanguagesState {
  Languages: Map<string, Language>
  CurLang: string
  Messages?: LocaleMessages<VueMessageType>
  AppLangInfos:Array<AppLangInfo>
}

const DefaultLang = 'en-US'
const DefaultLanguage = {
  ID: '00000000-0000-0000-0000-000000000000',
  Lang: DefaultLang,
  Logo: 'icons/england.png',
  Name: 'English',
  Short: 'En'
}

function state (): LanguagesState {
  const defaultLanguage = new Map<string, Language>()
  defaultLanguage.set(DefaultLang, DefaultLanguage)
  return {
    Languages: defaultLanguage,
    CurLang: DefaultLang,
    AppLangInfos: [] as Array<AppLangInfo>
  }
}

export {
  state,
  LanguagesState
}
