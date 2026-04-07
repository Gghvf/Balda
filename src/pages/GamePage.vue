<template>
  <div class="game-container">
    <UiButton @click="goBack">Назад</UiButton>

    <div v-if="gameStatus !== 'playing'" class="end-message">
      <h2>{{ gameStatus === 'won' ? 'Поздравляем! Вы выиграли!' : 'Вы проиграли!' }}</h2>
      <p>Загаданное слово: {{ targetWord.toUpperCase() }}</p>
      <div class="end-buttons">
        <UiButton @click="restartGame">Играть снова</UiButton>
        <UiButton @click="goToTopic">На выбор темы</UiButton>
      </div>
    </div>

    <div v-else class="game-area">
      <div class="hangman">
        <img :src="currentImage" :alt="`Виселица ${attempts}`" />
      </div>

      <div class="word">
        <span v-for="(char, i) in displayedWord" :key="i" class="letter">{{ char }}</span>
      </div>

      <div class="input-wrap">
        <label for="guess-input">Буква:</label>
        <input
          id="guess-input"
          ref="inputRef"
          v-model="inputLetter"
          @input="validateInput"
          @keyup.enter="makeGuess"
          :class="{ error: isInputError }"
          maxlength="1"
          placeholder="А"
        />
        <UiButton @click="makeGuess" :disabled="!isValidInput || gameStatus !== 'playing'">
          Угадать
        </UiButton>
      </div>

      <div class="stats">
        <div class="guessed correct">
          <strong>Угадано:</strong>
          <span v-for="l in correctGuessedLetters" :key="l" class="letter-item">{{ l.toUpperCase() }}</span>
        </div>
        <div class="guessed incorrect">
          <strong>Ошибки:</strong>
          <span v-for="l in incorrectGuessedLetters" :key="l" class="letter-item">{{ l.toUpperCase() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

import { useGameLogic } from '@/composables/GameLogic';
import UiButton from '@/components/UiButton.vue';

const route = useRoute();
const router = useRouter();

const inputRef = ref<HTMLInputElement | null>(null);

const {
  targetWord,
  displayedWord,
  attempts,
  inputLetter,
  isInputError,
  gameStatus,
  isValidInput,
  correctGuessedLetters,
  incorrectGuessedLetters,
  currentImage,
  validateInput,
  makeGuess: originalMakeGuess,
  restartGame
} = useGameLogic(route.query.selectedThemes as string);

const makeGuess = () => {
  originalMakeGuess();
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const goBack = () => {
  router.push('/');
};

const goToTopic = () => {
  router.push('/topic');
};
</script>

<style scoped>
.game-container {
  padding: 20px;
  text-align: center;
  color: var(--color-black);
  background-color: var(--color-white);
}

.game-area {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}

.hangman {
  width: 800px;
  height: 800px;
}

.word {
  font-size: 32px;
  letter-spacing: 10px;
  margin: 20px;
}

.letter {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px solid var(--color-black);
  margin: 0 2px;
  text-align: center;
  font-weight: bold;
}

.input-wrap {
  display: flex;
  gap: 10px;
  align-items: center;
}

.input-wrap label {
  margin-bottom: 0;
  font-size: 16px;
}

.input-wrap input {
  padding: 5px 10px;
  width: 50px;
  text-align: center;
  border: 2px solid var(--color-black);
  border-radius: 4px;
  font-size: 16px;
}

.input-wrap input.error {
  border-color: var(--color-red);
}

.stats {
  text-align: left;
}

.stats .guessed {
  margin-bottom: 10px;
}
.stats strong {
  display: inline-block;
  width: 80px;
  font-weight: normal;
}

.letter-item {
  display: inline-block;
  padding: 2px 6px;
  margin: 2px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 16px;
}

.guessed.correct .letter-item {
  background-color: var(--color-green);
  color: var(--color-white);
}

.guessed.incorrect .letter-item {
  background-color: var(--color-red);
  color: var(--color-white);
}

.end-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.end-buttons {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>