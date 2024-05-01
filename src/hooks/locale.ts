import {i18n} from '@/locale';
import {Message} from "@arco-design/web-vue";
import {computed} from "vue";
import type {Locale, Locales} from "@/types/Locale";
import componentZhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import componentEnUS from "@arco-design/web-vue/es/locale/lang/en-us";

const locales: Locales = {
    "zh-CN": componentZhCN,
    "en-US": componentEnUS
}

export const useLocale = () => {
    const currentLocale = computed<Locale>(() => {
        return i18n.global.locale;
    });
    const changeLocale = (value: Locale) => {
        i18n.global.locale = value;
        localStorage.setItem('locale', value);
        Message.success(i18n.global.t('changeSuccess'));
    };
    const componentLocale = () => {
        return computed(() => {
            return locales[i18n.global.locale] || componentZhCN
        })
    }
    return {
        currentLocale,
        changeLocale,
        componentLocale
    };
}

