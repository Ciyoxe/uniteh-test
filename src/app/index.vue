<template>
    <main>
        <WidgetControls v-if="!isMobileView" class="sidebar" />
        <WidgetBurgerMenu v-else />
        <WidgetMap />
    </main>
</template>

<script setup lang="ts">
import '@/app/index.css';
import { fetchEntities } from '@/features/data-fetching/fetch-entities';
import WidgetBurgerMenu from '@/widgets/burger-menu.vue';
import { useMediaQuery } from '@vueuse/core';
import WidgetControls from '../widgets/controls.vue';
import WidgetMap from '../widgets/map.vue';

fetchEntities();

const isMobileView = useMediaQuery('(width <= 1024px)');
</script>

<style scoped>
main {
    display: flex;
}

.sidebar {
    flex: 0 0;
    min-width: clamp(500px, 40vw, 700px);
}
</style>
