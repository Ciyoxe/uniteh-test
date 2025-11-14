<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
        :class="direction"
    >
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    direction: 'up' | 'down' | 'left' | 'right';
}>();
</script>

<style scoped>
svg {
    transition: transform 0.3s ease-in-out;
}
svg.up {
    transform: rotate(90deg);
}
svg.left {
    transform: rotate(180deg);
}
svg.down {
    transform: rotate(270deg);
}
</style>
