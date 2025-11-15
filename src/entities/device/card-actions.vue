<template>
    <UiPopover>
        <template #trigger>
            <UiButton>
                <IconDots />
            </UiButton>
        </template>
        <template #content>
            <div class="device-card-actions__buttons">
                <UiButton type="secondary">
                    Редактировать
                    <IconEdit />
                </UiButton>
                <UiButton type="warn">
                    Удалить
                    <IconDelete />
                </UiButton>
            </div>
        </template>
    </UiPopover>
</template>

<script setup lang="ts">
import UiPopover from '@/shared/ui/popover.vue';
import UiButton from '@/shared/ui/button.vue';
import IconDots from '@/shared/icons/dots.vue';
import IconDelete from '@/shared/icons/delete.vue';
import IconEdit from '@/shared/icons/edit.vue';
</script>

<style scoped>
.device-card-actions__buttons {
    margin: 16px;
    padding: 16px;
    background-color: var(--color-base);
    border-radius: 12px;
    box-shadow: 0 0 16px 0 rgba(18, 27, 82, 0.233);
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
