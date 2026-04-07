<template>
  <div class="orientation">
    <div>
      Выберите тему
    </div>

    <div class="theme-options-container">
      <label class="theme-option-label">
        <input
          type="checkbox"
          v-model="selectedThemes"
          value="cities">
        Города
      </label>

      <label class="theme-option-label">
        <input
          type="checkbox"
          v-model="selectedThemes"
          value="countries">
        Страны
      </label>

      <label class="theme-option-label">
        <input
          type="checkbox"
          v-model="selectedThemes"
          value="transport">
        Транспорт
      </label>

      <label class="theme-option-label">
        <input
          type="checkbox"
          v-model="selectedThemes"
          value="food">
        Еда
      </label>
    </div>

    <UiButton
      @click="startGame"
      :disabled="!isAnyThemeSelected"
      class="button"
    >Продолжить</UiButton>
    <UiButton @click="router.back" class="button">Назад</UiButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import UiButton from '@/components/UiButton.vue';

const router = useRouter();

const selectedThemes = ref<string[]>([]);

const isAnyThemeSelected = computed(() => selectedThemes.value.length > 0);

const startGame = () => {
  if (isAnyThemeSelected.value) {
    router.push({ name: 'Game', query: { selectedThemes: selectedThemes.value.join(',') } });
  }
};
</script>

<style scoped>
.orientation {
  text-align: center;
}

.theme-options-container {
  margin: 20px;
}

.theme-option-label {
  display: block;
  margin: 5px;
  cursor: pointer;
}

.button {
  margin: 4px;
}
</style>