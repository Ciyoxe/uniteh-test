<template>
    <TransitionFade>
        <div v-if="open" class="dialog" @click.self="open = false" @keydown.esc="open = false">
            <div class="dialog__content">
                <slot />
            </div>
        </div>
    </TransitionFade>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions';

const open = defineModel({ default: false });
</script>

<style scoped>
.dialog {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0005;
    z-index: 2;
}
.dialog__content {
    background-color: var(--color-base);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
