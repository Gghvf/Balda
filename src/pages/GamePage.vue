<template>
  <div class="game-container">
    <UiButton @click="goBack">Назад</UiButton>

    <div v-if="gameStatus !== 'playing'" class="end-game-message">
      <h2>{{ gameStatus === 'won' ? 'Поздравляем! Вы выиграли!' : 'Вы проиграли!' }}</h2>
      <p>Загаданное слово: {{ targetWord.toUpperCase() }}</p>
      <div class="end-game-buttons">
        <UiButton @click="restartGame">Играть снова</UiButton>
        <UiButton @click="goToTopic">На выбор темы</UiButton>
      </div>
    </div>

    <div v-else class="game-area">
      <div class="hangman-image">
        <img :src="currentImage" :alt="`Виселица ${attempts}`" />
      </div>

      <div class="word-display">
        <span
          v-for="(char, index) in displayedWord"
          :key="index"
          class="letter-box"
        >
          {{ char }}
        </span>
      </div>

      <div class="input-section">
        <label for="guess-input">Введите букву:</label>
        <input
          id="guess-input"
          v-model="inputLetter"
          @input="validateInput"
          @keyup.enter="makeGuess"
          :class="{ 'invalid-input': inputError }"
          maxlength="1"
          placeholder="Буква"
        />
        <UiButton @click="makeGuess" :disabled="!isValidInput || guessedLetters.length >= targetWord.length">Подтвердить</UiButton>
      </div>

      <div class="guessed-letters">
        <h3>Угаданные буквы:</h3>
        <span v-for="letter in correctGuessedLetters" :key="'c_' + letter" class="letter-guessed correct">{{ letter.toUpperCase() }}</span>
        <h3>Неугаданные буквы:</h3>
        <span v-for="letter in incorrectGuessedLetters" :key="'i_' + letter" class="letter-guessed incorrect">{{ letter.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import UiButton from '../components/UiButton.vue';

const router = useRouter();
const route = useRoute();

const targetWord = ref<string>('');
const displayedWord = ref<string[]>([]);
const guessedLetters = ref<string[]>([]);
const attempts = ref<number>(0);
const maxAttempts = 12;
const inputLetter = ref<string>('');
const inputError = ref<boolean>(false);

const themesDictionary: Record<string, string[]> = {
  cities: ['москва', 'лондон', 'токио', 'париж', 'берлин'],
  countries: ['россия', 'германия', 'япония', 'франция', 'италия'],
  transport: ['автомобиль', 'поезд', 'самолёт', 'велосипед', 'корабль'],
  food: ['пицца', 'суши', 'борщ', 'паста', 'салат']
};

onMounted(async () => {
  const selectedThemesParam = route.query.selectedThemes as string | undefined;

  if (!selectedThemesParam) {
    console.error("Параметр 'selectedThemes' не найден в маршруте!");
    await router.replace('/topic');
    return;
  }

  const selectedThemeKeys = selectedThemesParam.split(',');

  const validSelectedThemes = selectedThemeKeys.filter(key => key in themesDictionary);

  if (validSelectedThemes.length === 0) {
    console.error("Ни одна из переданных тем не найдена в словаре!");
    await router.replace('/topic');
    return;
  }

  console.log('Выбранные темы (валидные):', validSelectedThemes);

  let allWordsForGame: string[] = [];

  for (const themeKey of validSelectedThemes) {
    const words = themesDictionary[themeKey];
    if (words && Array.isArray(words)) {
      allWordsForGame = allWordsForGame.concat(words);
    } else {
      console.warn(`Ключ '${themeKey}' в словаре тем не содержит допустимый массив слов.`, words);
    }
  }

  if (allWordsForGame.length === 0) {
    console.error("Нет слов для выбранных тем!");
    await router.replace('/topic');
    return;
  }

  console.log('Слова для игры:', allWordsForGame);

  const randomIndex = Math.floor(Math.random() * allWordsForGame.length);
  const randomWordCandidate = allWordsForGame[randomIndex];

  if (randomWordCandidate === undefined) {
    console.error("Не удалось выбрать случайное слово.");
    await router.replace('/topic');
    return;
  }

  const randomWord: string = randomWordCandidate;

  targetWord.value = randomWord.toLowerCase();
  displayedWord.value = Array(randomWord.length).fill('_');
  console.log('Выбрано слово:', randomWord);
});

const gameStatus = computed<'playing' | 'won' | 'lost'>(() => {
  if (displayedWord.value.every(char => char !== '_')) {
    return 'won';
  }
  if (attempts.value >= maxAttempts) {
    return 'lost';
  }
  return 'playing';
});

const isValidInput = computed(() => /^[а-яё]$/i.test(inputLetter.value));

const correctGuessedLetters = computed(() => guessedLetters.value.filter(letter => targetWord.value.includes(letter)));
const incorrectGuessedLetters = computed(() => guessedLetters.value.filter(letter => !targetWord.value.includes(letter)));

const currentImage = computed(() => `/${attempts.value}.png`);

const validateInput = () => {
  if (!/^[а-яё]$/i.test(inputLetter.value)) {
    inputError.value = true;
  } else {
    inputError.value = false;
  }
};

const makeGuess = () => {
  if (gameStatus.value !== 'playing') return;

  const letter = inputLetter.value.toLowerCase();
  if (!letter || !isValidInput.value) return;

  if (guessedLetters.value.includes(letter)) {
    console.log(`Буква "${letter}" уже была.`);
    return;
  }

  guessedLetters.value.push(letter);

  if (targetWord.value.includes(letter)) {
    for (let i = 0; i < targetWord.value.length; i++) {
      if (targetWord.value[i] === letter) {
        displayedWord.value[i] = letter.toUpperCase();
      }
    }
  } else {
    attempts.value++;
  }

  inputLetter.value = '';
  inputError.value = false;
};

const restartGame = () => {
  const selectedThemesParam = route.query.selectedThemes as string | undefined;

  if (!selectedThemesParam) {
    console.error("Параметр 'selectedThemes' не найден при перезапуске!");
    router.push('/topic');
    return;
  }

  const selectedThemeKeys = selectedThemesParam.split(',');
  const validSelectedThemes = selectedThemeKeys.filter(key => key in themesDictionary); // Используем 'in'

  if (validSelectedThemes.length === 0) {
    console.error("Ни одна из переданных тем не найдена при перезапуске!");
    router.push('/topic');
    return;
  }

  let allWordsForGame: string[] = [];
  for (const themeKey of validSelectedThemes) {
    const words = themesDictionary[themeKey];
    if (words && Array.isArray(words)) {
      allWordsForGame = allWordsForGame.concat(words);
    } else {
      console.warn(`Ключ '${themeKey}' в словаре тем не содержит допустимый массив слов при перезапуске.`, words);
    }
  }

  if (allWordsForGame.length === 0) {
    console.error("Нет слов для выбранных тем при перезапуске!");
    router.push('/topic');
    return;
  }


  const randomIndex = Math.floor(Math.random() * allWordsForGame.length);
  const randomWordCandidate = allWordsForGame[randomIndex];

  if (randomWordCandidate === undefined) {

    console.error("Не удалось выбрать случайное слово при перезапуске.");
    router.push('/topic');
    return;
  }

  const randomWord: string = randomWordCandidate;

  targetWord.value = randomWord.toLowerCase();
  displayedWord.value = Array(randomWord.length).fill('_');
  guessedLetters.value = [];
  attempts.value = 0;
  console.log('Перезапуск игры. Выбрано слово:', randomWord);
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
}

.game-area {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}

.hangman-image img {
  max-width: 100%;
  height: auto;
}

.word-display {
  font-size: 2em;
  letter-spacing: 10px;
  margin: 20px 0;
}

.letter-box {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px;
  margin: 0 2px;
  text-align: center;
}

.input-section label {
  display: block;
  margin-bottom: 5px;
}

.input-section input {
  padding: 12px;
  width: 64px;
  text-align: center;
  margin: 8px;
  border: 2px solid var(--color-black);
  border-radius: 4px;
}

.input-section input.invalid-input {
  border-color: var(--color-red);
}

.guessed-letters {
  text-align: left;
  max-width: 200px;
}

.letter-guessed {
  display: inline-block;
  padding: 2px 6px;
  margin: 2px;
  border-radius: 3px;
  font-weight: bold;
}

.letter-guessed.correct {
  background-color: var(--color-green);
}

.letter-guessed.incorrect {
  background-color: var(--color-red);
}

.end-game-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-black);
  color: var(--color-white);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  text-align: center;
}

.end-game-buttons {
  margin-top: 20px;
}

.end-game-buttons button {
  margin: 0 10px;
}

.hangman-image {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>