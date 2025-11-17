<template>
    <button :class="['button', type]" :disabled>
        <slot />
    </button>
</template>

<script setup lang="ts">
const { type = 'primary' } = defineProps<{
    type?: 'primary' | 'accent' | 'warn';
    disabled?: boolean;
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
    border-radius: 12px;
    padding: 12px;
    font-size: 1.25em;
    transition:
        background-color 0.3s ease-in-out,
        opacity 0.3s ease-in-out;
}
.button:hover {
    background-color: color-mix(in srgb, var(--current-color), black 7%);
}
.button:active {
    background-color: color-mix(in srgb, var(--current-color), black 20%);
}
.button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
}

.button.primary {
    --current-color: var(--color-primary);
}
.button.accent {
    --current-color: var(--color-accent);
}
.button.warn {
    --current-color: var(--color-warn);
}
</style>
