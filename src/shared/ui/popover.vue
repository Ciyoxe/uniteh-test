<template>
    <div ref="popover" class="popover">
        <button ref="trigger" class="popover__trigger" @click="open = !open">
            <slot name="trigger" :open />
        </button>
        <div ref="content" :class="['popover__content', { open }]" @click.stop.prevent>
            <slot name="content" :close="() => (open = false)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef, computed, watch } from 'vue';
import { onClickOutside, useElementBounding, useWindowSize } from '@vueuse/core';

defineSlots<{
    trigger: (props: { open: boolean }) => unknown;
    content: (props: { close: () => void }) => unknown;
}>();

const open = defineModel({ default: false });
const popover = useTemplateRef('popover');
const trigger = useTemplateRef('trigger');
const content = useTemplateRef('content');

const windowSize = useWindowSize();
const triggerBounds = useElementBounding(trigger, { immediate: true });
const contentBounds = useElementBounding(content, { immediate: true });

const top = computed(() => calculateVerticalPosition());
const left = computed(() => calculateHorizontalPosition());

onClickOutside(popover, () => {
    open.value = false;
});

watch(open, () => {
    triggerBounds.update();
    contentBounds.update();
});

const calculateVerticalPosition = (): number => {
    const triggerBottom = triggerBounds.bottom.value;
    const triggerTop = triggerBounds.top.value;
    const contentHeight = contentBounds.height.value;
    const viewportHeight = windowSize.height.value;

    // Try positioning below trigger first
    const fitsBelow = triggerBottom + contentHeight <= viewportHeight;

    if (fitsBelow) {
        // Position below trigger, clamp to viewport bottom
        const maxTop = viewportHeight - contentHeight;
        return Math.min(triggerBottom, maxTop);
    } else {
        // Position above trigger, clamp to viewport top
        const positionAbove = triggerTop - contentHeight;
        return Math.max(positionAbove, 0);
    }
};

const calculateHorizontalPosition = (): number => {
    const contentWidth = contentBounds.width.value;
    const triggerLeft = triggerBounds.left.value;
    const triggerWidth = triggerBounds.width.value;
    const triggerCenter = triggerLeft + triggerWidth / 2;
    const viewportWidth = windowSize.width.value;

    // Center popover relative to trigger center
    const leftEdge = triggerCenter - contentWidth / 2;
    const minLeft = 0;
    const maxLeft = viewportWidth - contentWidth;

    // Clamp to viewport
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
.popover {
    position: relative;
}

.popover__trigger {
    border: none;
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
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.popover__content.open {
    opacity: 1;
    pointer-events: auto;
}
</style>
