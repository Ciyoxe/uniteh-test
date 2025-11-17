<template>
    <form class="device-editing-form" @submit.prevent>
        <label class="device-editing-form__label">
            <p>Тревога</p>
            <UiCheckbox v-model="deviceCopy.alarm" />
        </label>
        <label class="device-editing-form__label">
            <p>Название</p>
            <UiInput v-model="deviceCopy.name" type="text" class="device-editing-form__input" />
        </label>
        <label class="device-editing-form__label">
            <p>Уровень сигнала</p>
            <UiInput
                v-model="deviceCopy.wifi"
                type="number"
                class="device-editing-form__input"
                max="5"
                min="1"
                step="1"
            />
        </label>

        <div class="device-editing-form__buttons">
            <UiButton type="primary" @click="$emit('cancel')">Отмена</UiButton>
            <UiButton type="warn" @click="$emit('save', deviceCopy)">Сохранить</UiButton>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, toRaw } from 'vue';
import UiCheckbox from '@/shared/ui/checkbox.vue';
import UiInput from '@/shared/ui/input.vue';
import UiButton from '@/shared/ui/button.vue';
import type { Device } from '@/shared/api/types';

const { device } = defineProps<{
    device: Device;
}>();
defineEmits<{
    save: [newDevice: Device];
    cancel: [];
}>();

const deviceCopy = ref(device);
watch(
    () => device,
    () => {
        deviceCopy.value = structuredClone(toRaw(device));
    },
    { deep: true, immediate: true },
);

watchEffect(() => {
    if (deviceCopy.value.wifi > 5) {
        deviceCopy.value.wifi = 5;
    }
    if (deviceCopy.value.wifi < 1) {
        deviceCopy.value.wifi = 1;
    }
});
</script>

<style scoped>
.device-editing-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.device-editing-form__label {
    display: flex;
    align-items: center;
}

.device-editing-form__input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 2px solid color-mix(in srgb, var(--color-primary), black 20%);
}

.device-editing-form__label p {
    min-width: 130px;
}

.device-editing-form__buttons {
    display: flex;
    gap: 16px;
}
</style>
