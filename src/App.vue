<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';

</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style>

:root{
  --color-primary: #0011ff;
  --color-white: #ffffff;
}
</style>