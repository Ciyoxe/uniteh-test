<template>
    <div ref="popover" class="popover">
        <div
            ref="trigger"
            class="popover__trigger"
            role="button"
            tabindex="0"
            @click="open = !open"
        >
            <slot name="trigger" :open />
        </div>
        <TransitionExpand>
            <div v-show="open" ref="content" class="popover__content">
                <slot name="content" :close="() => (open = false)" />
            </div>
        </TransitionExpand>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef, computed } from 'vue';
import { TransitionExpand } from '@morev/vue-transitions';
import { onClickOutside, useElementBounding } from '@vueuse/core';

defineSlots<{
    trigger: (props: { open: boolean }) => unknown;
    content: (props: { close: () => void }) => unknown;
}>();

const open = defineModel({ default: false });
const popover = useTemplateRef('popover');
const trigger = useTemplateRef('trigger');
const content = useTemplateRef('content');

const top = computed(() => calculateVerticalPosition());
const left = computed(() => calculateHorizontalPosition());

const triggerBounds = useElementBounding(trigger, { immediate: true });
const contentBounds = useElementBounding(content, { immediate: true });

onClickOutside(popover, () => {
    open.value = false;
});

const calculateVerticalPosition = () => {
    const triggerBottom = triggerBounds.bottom.value;
    return triggerBottom;
};

/**
 * Calculate horizontal position, clamping to viewport
 */
const calculateHorizontalPosition = () => {
    const contentWidth = contentBounds.width.value;
    const triggerLeft = triggerBounds.left.value;
    const triggerWidth = triggerBounds.width.value;
    const triggerCenter = triggerLeft + triggerWidth / 2;

    // Center popover relative to trigger center
    const leftEdge = triggerCenter - contentWidth / 2;
    const minLeft = 0;
    const maxLeft = window.innerWidth - contentWidth;

    if (leftEdge < minLeft) {
        return minLeft;
    }
    if (leftEdge > maxLeft) {
        return maxLeft;
    }

    return leftEdge;
};
</script>

<style scoped>
.popover__trigger {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
}
.popover__content {
    z-index: 1;
    overflow: hidden;
    position: fixed;
    top: calc(v-bind(top) * 1px);
    left: calc(v-bind(left) * 1px);
}
</style>
