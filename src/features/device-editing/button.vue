<template>
    <UiButton type="primary" @click="modalOpen = true">
        Редактировать
        <IconEdit />

        <Teleport to="body">
            <UiDialog v-model="modalOpen">
                <p class="device-editing-button__title">
                    Редактирование устройства {{ device.id }}
                </p>
                <FeatureDeviceEditingForm v-model="deviceCopy" />
                <div class="device-editing-button__buttons">
                    <UiButton type="primary" @click="modalOpen = false">Отмена</UiButton>
                    <UiButton type="warn" @click="confirmSaving">Сохранить</UiButton>
                </div>
            </UiDialog>
        </Teleport>
    </UiButton>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import UiButton from '@/shared/ui/button.vue';
import UiDialog from '@/shared/ui/dialog.vue';
import IconEdit from '@/shared/icons/edit.vue';
import FeatureDeviceEditingForm from './form.vue';
import type { Device } from '@/shared/api/types';
import { useEntitiesStore } from '@/stores/entities';

const { device } = defineProps<{
    device: Device;
}>();

const modalOpen = ref(false);
const deviceCopy = ref(device);
const entitiesStore = useEntitiesStore();

watch(
    () => device,
    () => {
        deviceCopy.value = structuredClone(toRaw(device));
    },
    { deep: true, immediate: true },
);

const confirmSaving = () => {
    entitiesStore.devices.set(device.id, deviceCopy.value);
    modalOpen.value = false;
};
</script>

<style scoped>
.device-editing-button__buttons {
    display: flex;
    gap: 16px;
}

.device-editing-button__title {
    font-size: 1.2em;
    margin-bottom: 16px;
}
</style>
