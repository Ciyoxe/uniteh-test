<template>
    <form class="device-editing-form" @submit.prevent>
        <label class="device-editing-form__label">
            <p>Тревога</p>
            <UiCheckbox v-model="deviceFields.alarm" />
        </label>
        <label class="device-editing-form__label">
            <p>Название</p>
            <input
                v-model="deviceFields.name"
                type="text"
                class="device-editing-form__input"
                required
            />
        </label>
        <label class="device-editing-form__label">
            <p>Уровень сигнала</p>
            <input
                v-model="deviceFields.wifi"
                type="number"
                class="device-editing-form__input"
                max="5"
                min="1"
                step="1"
                required
            />
        </label>
    </form>
</template>

<script setup lang="ts">
import UiCheckbox from '@/shared/ui/checkbox.vue';
import { watchEffect } from 'vue';

const deviceFields = defineModel<{
    name: string;
    wifi: number;
    alarm: boolean;
}>({ required: true });

watchEffect(() => {
    if (deviceFields.value.wifi > 5) {
        deviceFields.value.wifi = 5;
    }
    if (deviceFields.value.wifi < 1) {
        deviceFields.value.wifi = 1;
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
</style>
