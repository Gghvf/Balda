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
  --primary: #0011ff;
  --text-navbar-color: #ffffff;
}
</style>