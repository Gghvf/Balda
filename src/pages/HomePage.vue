<template>
<div class="description">

    <p>«Виселица» — классическая игра на угадывание слов для компании. Нужны бумага и ручка. Один игрок загадывает слово из согласованной категории и обозначает буквы черточками. 
    Остальные по очереди называют буквы или пытаются угадать слово целиком.</p>
    <p>Верная буква вписывается, неверная — ведет к рисованию элемента виселицы (лимит ошибок оговаривается, обычно 6–10). Неверное предположение слова также считается ошибкой.</p>
    <p>Игра заканчивается победой отгадывающих, если слово найдено до завершения рисунка, иначе побеждает загадывающий.
     Перед началом стоит договориться о темах, исключениях и количестве попыток, адаптируя сложность под участников.</p>
     
</div>

<div class="orientation"> 

<<<<<<< HEAD
    <UiButton @click="router.push('topic')">Начать игру</UiButton>
=======
    <UiButton @click="router.push('Topic')">Начать игру</UiButton>
>>>>>>> 3fc9a9b (Restore project files after lock fix)

</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
<<<<<<< HEAD
=======

>>>>>>> 3fc9a9b (Restore project files after lock fix)
import UiButton from '../components/UiButton.vue';

const router = useRouter();
</script>

<style scoped>

.orientation{
    padding: 16px;
    text-align: center;
}

.description {
    border: 2px solid var(--color-primary);
    padding: 16px;
    margin: 8px;
    border-radius: 8px;
    text-align: justify;
    line-height: 32px;
    font-size: 24px;
}
</style>
