<template>
    <span class="input">
        <slot name="leading" />
        <input :id :type class="input__field" v-model="value" v-bind="$attrs" />
        <slot name="trailing" />
    </span>
</template>

<script setup lang="ts" generic="TypeT extends 'text' | 'number'">
const { id, type = 'text' } = defineProps<{
    id?: string;
    type?: TypeT;
}>();

const value = defineModel<TypeT extends 'number' ? number : string>();
</script>

<style scoped>
.input {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 2px solid color-mix(in srgb, var(--color-primary), black 20%);
    background-color: var(--color-base);
    color: var(--color-text);
    transition:
        border-color 0.3s ease-in-out,
        box-shadow 0.3s ease-in-out,
        background-color 0.3s ease-in-out;
}

.input__field {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background-color: transparent;
    color: inherit;
    font: inherit;
}

.input__field::placeholder {
    color: #9ca3af;
}

.input:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-accent), transparent 60%);
    background-color: color-mix(in srgb, var(--color-base), white 15%);
}

.input:hover {
    border-color: var(--color-accent);
}

.input__field[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>
