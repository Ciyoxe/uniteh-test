import { structuredSerializer } from '@/shared/lib/serialization';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(
    'app',
    () => {
        const mode = ref<'online' | 'archive'>('online');

        // Shared between online and archive modes
        const expandedGroupIds = ref<Set<string>>(new Set());
        const expandedDeviceIds = ref<Set<number>>(new Set());

        const onlineModeState = ref({
            selectedDeviceIds: new Set<number>(),
            // deviceId -> enabledCamerasIds
            selectedCameras: new Map<number, Set<number>>(),
        });
        const archiveModeState = ref({
            selectedDeviceId: null as number | null,
            // deviceId -> enabledCamerasIds
            selectedCameras: new Map<number, Set<number>>(),
        });

        const isGroupExpanded = (groupId: string) => {
            return expandedGroupIds.value.has(groupId);
        };
        const isDeviceExpanded = (deviceId: number) => {
            return expandedDeviceIds.value.has(deviceId);
        };
        const toggleGroupExpanded = (groupId: string) => {
            if (isGroupExpanded(groupId)) {
                expandedGroupIds.value.delete(groupId);
            } else {
                expandedGroupIds.value.add(groupId);
            }
        };
        const toggleDeviceExpanded = (deviceId: number) => {
            if (isDeviceExpanded(deviceId)) {
                expandedDeviceIds.value.delete(deviceId);
            } else {
                expandedDeviceIds.value.add(deviceId);
            }
        };

        const isDeviceEnabled = (deviceId: number) => {
            if (mode.value === 'online') {
                return onlineModeState.value.selectedDeviceIds.has(deviceId);
            } else {
                return archiveModeState.value.selectedDeviceId === deviceId;
            }
        };
        const toggleDeviceEnabled = (deviceId: number) => {
            if (mode.value === 'online') {
                if (isDeviceEnabled(deviceId)) {
                    onlineModeState.value.selectedDeviceIds.delete(deviceId);
                } else {
                    onlineModeState.value.selectedDeviceIds.add(deviceId);
                }
            } else {
                if (isDeviceEnabled(deviceId)) {
                    archiveModeState.value.selectedDeviceId = null;
                } else {
                    archiveModeState.value.selectedDeviceId = deviceId;
                }
            }
        };

        const isCameraEnabled = (deviceId: number, cameraIndex: number) => {
            if (mode.value === 'online') {
                return (
                    onlineModeState.value.selectedCameras.get(deviceId)?.has(cameraIndex) ?? false
                );
            } else {
                return (
                    archiveModeState.value.selectedCameras.get(deviceId)?.has(cameraIndex) ?? false
                );
            }
        };

        const toggleCameraEnabled = (deviceId: number, cameraIndex: number) => {
            if (mode.value === 'online') {
                if (isCameraEnabled(deviceId, cameraIndex)) {
                    onlineModeState.value.selectedCameras.get(deviceId)?.delete(cameraIndex);
                } else {
                    if (!onlineModeState.value.selectedCameras.has(deviceId)) {
                        onlineModeState.value.selectedCameras.set(deviceId, new Set());
                    }
                    onlineModeState.value.selectedCameras.get(deviceId)?.add(cameraIndex);
                }
            } else {
                if (isCameraEnabled(deviceId, cameraIndex)) {
                    archiveModeState.value.selectedCameras.get(deviceId)?.delete(cameraIndex);
                } else {
                    if (!archiveModeState.value.selectedCameras.has(deviceId)) {
                        archiveModeState.value.selectedCameras.set(deviceId, new Set());
                    }
                    archiveModeState.value.selectedCameras.get(deviceId)?.add(cameraIndex);
                }
            }
        };

        const deleteDevice = (deviceId: number) => {
            expandedDeviceIds.value.delete(deviceId);
            onlineModeState.value.selectedDeviceIds.delete(deviceId);
            onlineModeState.value.selectedCameras.delete(deviceId);
            archiveModeState.value.selectedCameras.delete(deviceId);

            if (archiveModeState.value.selectedDeviceId === deviceId) {
                archiveModeState.value.selectedDeviceId = null;
            }
        };

        return {
            mode,
            expandedGroupIds,
            expandedDeviceIds,
            onlineModeState,
            archiveModeState,

            isGroupExpanded,
            isDeviceExpanded,
            toggleGroupExpanded,
            toggleDeviceExpanded,

            isDeviceEnabled,
            toggleDeviceEnabled,

            isCameraEnabled,
            toggleCameraEnabled,

            deleteDevice,
        };
    },
    {
        persist: {
            storage: localStorage,
            serializer: structuredSerializer,
        },
    },
);
