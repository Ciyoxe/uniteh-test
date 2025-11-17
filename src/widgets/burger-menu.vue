<template>
    <div class="burger-menu">
        <UiButton class="burger-menu__button" @click="menuOpen = !menuOpen">
            <IconBurger :open="menuOpen" />
        </UiButton>

        <TransitionSlide :offset="{ enter: [100, 0], leave: [-100, 0] }">
            <WidgetControls v-show="menuOpen" class="burger-menu__controls" />
        </TransitionSlide>
    </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { ref, watch } from 'vue';
import WidgetControls from './controls.vue';
import IconBurger from '@/shared/icons/burger.vue';
import UiButton from '@/shared/ui/button.vue';
import { TransitionSlide } from '@morev/vue-transitions';

const isMobileView = useMediaQuery('(width <= 1024px)');
const menuOpen = ref(false);

watch(isMobileView, () => {
    menuOpen.value = true;
});
</script>

<style scoped>
.burger-menu__button {
    position: fixed;
    top: 16px;
    right: 16px;
    width: 64px;
    height: 64px;
    z-index: 2;
}

.burger-menu__controls {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 96px 16px 16px;
}
</style>
