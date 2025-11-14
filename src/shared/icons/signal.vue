<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path :class="{ active: strength >= 1 }" d="M40-160v-240h120v240z" />
        <path :class="{ active: strength >= 2 }" d="M230-160v-320h120v320z" />
        <path :class="{ active: strength >= 3 }" d="M420-160v-440h120v440z" />
        <path :class="{ active: strength >= 4 }" d="M610-160v-520h120v520z" />
        <path :class="{ active: strength >= 5 }" d="M800-160v-640h120v640z" />
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    strength: number;
}>();
</script>

<style scoped>
svg {
    color: #0002;
}
path.active {
    color: color-mix(in srgb, #6bcf6b calc((v-bind(strength) - 1) * 25%), #8d1212);
}
</style>
