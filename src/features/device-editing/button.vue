<template>
    <UiButton type="primary" @click="modalOpen = true">
        Редактировать
        <IconEdit />

        <Teleport to="body">
            <UiDialog v-model="modalOpen">
                <p class="device-editing-button__title">
                    Редактирование устройства ID: {{ device.id }}
                </p>
                <FeatureDeviceEditingForm :device @cancel="cancelEditing" @save="confirmSaving" />
            </UiDialog>
        </Teleport>
    </UiButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Device } from '@/shared/api/types';
import { useEntitiesStore } from '@/stores/entities';
import IconEdit from '@/shared/icons/edit.vue';
import UiButton from '@/shared/ui/button.vue';
import UiDialog from '@/shared/ui/dialog.vue';
import FeatureDeviceEditingForm from './form.vue';

const { device } = defineProps<{
    device: Device;
}>();

const modalOpen = ref(false);
const entitiesStore = useEntitiesStore();

const cancelEditing = () => {
    modalOpen.value = false;
};
const confirmSaving = (newDevice: Device) => {
    entitiesStore.devices.set(device.id, newDevice);
    modalOpen.value = false;
};
</script>

<style scoped>
.device-editing-button__title {
    font-size: 1.2em;
    margin-bottom: 16px;
}
</style>
