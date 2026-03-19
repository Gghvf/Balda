<template>

    <button class="button">
        <slot/>
    </button>

</template>

<style>

.button{
    background-color: var(--color-primary);
    color: var(--color-white);
    border: 2px solid var(--color-primary);
    transition: all 0.5s ;
}

.button:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
}
<<<<<<< HEAD

=======
>>>>>>> 3fc9a9b (Restore project files after lock fix)
</style>