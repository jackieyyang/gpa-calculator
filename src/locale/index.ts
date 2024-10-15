import { createI18n } from 'vue-i18n';
import enUS from './lang/en-US.json';
import zhCN from './lang/zh-CN.json';

const defaultLocale = localStorage.getItem('locale') || 'zh-CN';

export const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'zh-CN',
    allowComposition: true,
    globalInjection: true,
    messages: {
        'en-US': enUS,
        'zh-CN': zhCN,
    },
})