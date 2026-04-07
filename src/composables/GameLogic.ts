import { ref, computed } from 'vue';

import { themesDictionary } from '@/data/GameWords'
import type { ThemeKey } from '@/data/GameWords';

export type GameStatus = 'playing' | 'won' | 'lost';

export function useGameLogic(selectedThemesQuery: string | undefined) {
  const targetWord = ref<string>('');
  const displayedWord = ref<string[]>([]);
  const guessedLetters = ref<string[]>([]);
  const attempts = ref<number>(0);
  const maxAttempts = 12;
  const inputLetter = ref<string>('');
  const isInputError = ref<boolean>(false);

  const initGame = () => {
  if (!selectedThemesQuery) return false;

  const selectedThemeKeys = selectedThemesQuery.split(',') as ThemeKey[];
  const validThemes = selectedThemeKeys.filter(key => key in themesDictionary);

  const allWords = validThemes.flatMap(key => themesDictionary[key]);

  const randomIndex = Math.floor(Math.random() * allWords.length);
  const randomWordCandidate = allWords[randomIndex];

  if (randomWordCandidate === undefined) {
    return false;
  }

  const randomWord: string = randomWordCandidate;

  targetWord.value = randomWord.toLowerCase();
  displayedWord.value = Array(randomWord.length).fill('_');
  guessedLetters.value = [];
  attempts.value = 0;
  return true;
};

  const gameStatus = computed<GameStatus>(() => {
    if (displayedWord.value.every(char => char !== '_')) return 'won';
    if (attempts.value >= maxAttempts) return 'lost';
    return 'playing';
  });

  const isValidInput = computed(() => /^[а-яё]$/i.test(inputLetter.value));

  const correctGuessedLetters = computed(() =>
    guessedLetters.value.filter(letter => targetWord.value.includes(letter))
  );

  const incorrectGuessedLetters = computed(() =>
    guessedLetters.value.filter(letter => !targetWord.value.includes(letter))
  );

  const currentImage = computed(() => `/${attempts.value}.svg`);

  const validateInput = () => {
    isInputError.value = !isValidInput.value;
  };

  const makeGuess = () => {
    if (gameStatus.value !== 'playing') return;

    const letter = inputLetter.value.trim().toLowerCase();
    if (!letter || !isValidInput.value) {
      isInputError.value = true;
      return;
    }

    if (guessedLetters.value.includes(letter)) {
      isInputError.value = true;
      setTimeout(() => (isInputError.value = false), 1000);
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
    isInputError.value = false;
  };

  const restartGame = () => {
    initGame();
  };

  const success = initGame();
  if (!success) {
  }

  return {
    targetWord,
    displayedWord,
    guessedLetters,
    attempts,
    inputLetter,
    isInputError,
    gameStatus,
    isValidInput,
    correctGuessedLetters,
    incorrectGuessedLetters,
    currentImage,
    validateInput,
    makeGuess,
    restartGame
  };
}