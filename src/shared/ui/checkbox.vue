<template>
    <span class="checkbox">
        <input :id :checked v-model="value" type="checkbox" class="checkbox__input" />
        <span :class="['checkbox__box', { checked }]">
            <IconCheck />
        </span>
    </span>
</template>

<script setup lang="ts">
import IconCheck from '@/shared/icons/check.vue';

defineProps<{
    id: string;
    checked: boolean;
}>();

const value = defineModel<boolean>();
</script>

<style scoped>
.checkbox {
    position: relative;
}

.checkbox__input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    inset: 0;
}

.checkbox__box {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: 2px solid color-mix(in srgb, var(--color-primary), black 20%);
    border-radius: 4px;
    background-color: transparent;
    transition:
        background-color 0.3s ease-in-out,
        border-color 0.3s ease-in-out;
    cursor: pointer;
}

.checkbox__box svg {
    width: 20px;
    height: 20px;
    opacity: 0;
    color: var(--color-text);
    transition: opacity 0.3s ease-in-out;
}

.checkbox__box.checked {
    background-color: var(--color-primary);
}

.checkbox__box.checked svg {
    opacity: 1;
}

.checkbox:hover .checkbox__box {
    border-color: var(--color-accent);
}
</style>
