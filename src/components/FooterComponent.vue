<script setup lang="ts">
import { footerIconSize } from '@/assets/common';
</script>

<template>
  <div class="w-full bg-slate-100">
    <div class="mx-auto max-w-96 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl min-h-14 flex items-center justify-between">
      <!-- 版权 -->
      <div class="flex flex-col">
        <a-typography-text>Copyright &copy; 2024 Jackie Yang</a-typography-text>
        <a-typography-text>Made with Arco & Tailwind</a-typography-text>
      </div>
      <!-- 右侧引导栏 -->
      <div class="flex gap-4">
        <icon-qq :size="footerIconSize" class="text-info cursor-pointer"/>
        <icon-wechat :size="footerIconSize" class="text-info cursor-pointer" />
        <icon-twitter :size="footerIconSize" class="text-info cursor-pointer" />
        <icon-github :size="footerIconSize" class="text-info cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>