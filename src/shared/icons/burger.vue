<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4 12H20"
            stroke="currentColor"
            :class="{ open }"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M4 12H20"
            stroke="currentColor"
            :class="{ open }"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M4 12H20"
            stroke="currentColor"
            :class="{ open }"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    open?: boolean;
}>();
</script>

<style scoped>
svg path {
    transition: transform 0.3s ease-in-out;
    transform-origin: center;
}

svg path:nth-child(1) {
    transform: translateY(-6px);
}

svg path:nth-child(1).open {
    transform: rotate(45deg) scale(1.2);
}

svg path:nth-child(2).open {
    transform: scale(0);
}

svg path:nth-child(3) {
    transform: translateY(6px);
}

svg path:nth-child(3).open {
    transform: rotate(-45deg) scale(1.2);
}
</style>
