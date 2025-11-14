<template>
    <button :class="['button', type]">
        <slot />
    </button>
</template>

<script setup lang="ts">
const { type = 'primary' } = defineProps<{
    type?: 'primary' | 'secondary' | 'accent' | 'warn';
}>();
</script>

<style scoped>
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    background-color: var(--current-color);
    color: var(--color-text);
    border: 1px solid color-mix(in srgb, var(--current-color), black 20%);
    border-radius: 16px;
    padding: 12px 24px;
    font-size: 1.25em;
    transition: background-color 0.3s ease-in-out;
}
.button:hover {
    background-color: color-mix(in srgb, var(--current-color), black 7%);
}
.button:active {
    background-color: color-mix(in srgb, var(--current-color), black 20%);
}

.button.primary {
    --current-color: var(--color-primary);
}
.button.secondary {
    --current-color: var(--color-secondary);
}
.button.accent {
    --current-color: var(--color-accent);
}
.button.warn {
    --current-color: var(--color-warn);
}
</style>
