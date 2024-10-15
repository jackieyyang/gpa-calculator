import type {ArcoLang} from "@arco-design/web-vue/es/locale/interface";

export type Locale = 'zh-CN' | 'en-US';

export type Locales = {
    [key in Locale]: ArcoLang
};