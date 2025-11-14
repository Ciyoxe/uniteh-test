<template>
    <div ref="popover" class="popover">
        <div
            ref="trigger"
            class="popover__trigger"
            role="button"
            tabindex="0"
            @click="open = !open"
        >
            <slot name="trigger" />
        </div>
        <TransitionExpand>
            <div v-show="open" ref="content" class="popover__content">
                <slot name="content" />
            </div>
        </TransitionExpand>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watchEffect, ref } from 'vue';
import { TransitionExpand } from '@morev/vue-transitions';
import { onClickOutside, useElementBounding } from '@vueuse/core';

defineSlots<{
    trigger: () => unknown;
    content: () => unknown;
}>();

const open = defineModel<boolean>();
const popover = useTemplateRef('popover');
const trigger = useTemplateRef('trigger');
const content = useTemplateRef('content');

const top = ref(0);
const left = ref(0);

const triggerBounds = useElementBounding(trigger, { immediate: true });
const contentBounds = useElementBounding(content, { immediate: true });

onClickOutside(popover, () => {
    open.value = false;
});

watchEffect(() => {
    if (!open.value) return;

    top.value = calculateVerticalPosition();
    left.value = calculateHorizontalPosition();
});

/**
 * Calculate vertical position, preferring below trigger but flipping above if needed
 */
function calculateVerticalPosition(): number {
    const contentHeight = contentBounds.height.value;
    const triggerBottom = triggerBounds.bottom.value;
    const triggerTop = triggerBounds.top.value;

    const wouldOverflowBottom = triggerBottom + contentHeight > window.innerHeight;
    if (wouldOverflowBottom) {
        // Flip above trigger if content would overflow bottom
        return triggerTop - contentHeight;
    }

    return triggerBottom;
}

/**
 * Calculate horizontal position, centering relative to trigger and clamping to viewport
 */
function calculateHorizontalPosition(): number {
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
}
</script>

<style scoped>
.popover__trigger {
    width: fit-content;
}
.popover__content {
    z-index: 1;
    overflow: hidden;
    position: fixed;
    top: calc(v-bind(top) * 1px);
    left: calc(v-bind(left) * 1px);
}
</style>
