<script setup lang="ts">
import {headerIconSize, headerLogoSize, iconFont} from "@/assets/common";
import {useLocale} from "@/hooks/locale";
import logo from "@/assets/logo.svg";

const refresh = () => {
  window.location.reload();
}
</script>

<template>
  <div class="w-full bg-slate-100">
    <div class="mx-auto max-w-96 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl min-h-14 flex items-center justify-between">
      <!-- logo -->
      <div class="flex flex-row">
        <a-image :src="logo" :width="headerLogoSize" :height="headerLogoSize" fit="contain" />
      </div>
      <!-- 右侧引导栏 -->
      <div class="flex gap-4">
        <a-trigger position="bottom" auto-fit-position>
          <icon-font type="icon-translator" :size="headerIconSize" />
          <template #content>
            <div class="flex flex-col gap-2 trigger-box">
              <a-typography-text class="hover:bg-blue-50 cursor-pointer rounded" @click="useLocale().changeLocale('zh-CN');refresh()">简体中文</a-typography-text>
              <a-typography-text class="hover:bg-blue-50 cursor-pointer rounded" @click="useLocale().changeLocale('en-US');refresh()">English</a-typography-text>
            </div>
          </template>
        </a-trigger>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>