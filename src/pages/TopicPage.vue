<template>
  <div class="orientation">
    <div>
      Выберите тему
    </div>

    <UiButton @click="router.push('game')">ok</UiButton>
    
    <UiButton @click="router.back">Назад</UiButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import UiButton from '../components/UiButton.vue';

const router = useRouter();
</script>

<style scoped>

.orientation{
  text-align: center;
}

</style>