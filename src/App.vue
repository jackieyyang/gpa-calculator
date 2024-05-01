<script setup lang="ts">
import IndexView from "@/views/index/IndexView.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {useLocale} from "@/hooks/locale";
</script>

<template>
  <a-config-provider :locale="useLocale().componentLocale().value">
    <HeaderComponent />
    <IndexView />
    <FooterComponent />
  </a-config-provider>
</template>

<style scoped>
</style>
