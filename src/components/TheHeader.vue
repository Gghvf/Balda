<template>
    <header class="header">
        <RouterLink to="/">
            <img src="/Balda.svg" alt="Logo" width="64">
        </RouterLink>
        <b>Балда</b>
    </header>
</template>


<style>

:root{
    --color-white: #ffffff;
}

.header{
    color: var(--color-white);
    background-color: var(--color-primary);
    display: flex;
    padding: 16px;
    gap: 16px;
    border-radius: 8px;
    font-size: 64px;
}

</style>