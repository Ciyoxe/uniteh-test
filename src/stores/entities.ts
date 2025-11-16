import type { Device, DevicesGroup } from '@/shared/api/types';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

const deviceMatchesQuery = (device?: Device, query?: string): device is Device => {
    if (!device) {
        return false;
    }
    if (!query) {
        return true;
    }
    return (
        device.name.toUpperCase().includes(query.toUpperCase()) ||
        device.id.toString().includes(query)
    );
};

export const useEntitiesStore = defineStore('entities', () => {
    // id -> entity
    const searchQuery = ref<string>();
    const devices = reactive(new Map<number, Device>());
    const groups = reactive(new Map<string, DevicesGroup>());

    const deleteDevice = (id: number) => {
        devices.delete(id);
        groups.forEach((group) => {
            group.deviceIds = group.deviceIds.filter((deviceId) => deviceId !== id);
        });
    };
    const getDevicesInGroup = (groupId: string | null) => {
        // Non-grouped devices
        if (groupId === null) {
            const deviceIdsUsedInGroups = new Set(
                Array.from(groups.values()).flatMap((group) => group.deviceIds),
            );
            return Array.from(devices.keys())
                .filter((id) => !deviceIdsUsedInGroups.has(id))
                .map((id) => devices.get(id)!)
                .filter((d) => deviceMatchesQuery(d, searchQuery.value));
        }

        const group = groups.get(groupId);
        if (!group) {
            return [];
        }
        return group.deviceIds
            .map((id) => devices.get(id))
            .filter((d) => deviceMatchesQuery(d, searchQuery.value));
    };
    const getGroupsList = () => {
        return Array.from(groups.keys())
            .filter((groupId) => getDevicesInGroup(groupId).length > 0)
            .map((groupId) => groups.get(groupId)!);
    };

    return {
        searchQuery,
        devices,
        groups,
        deleteDevice,
        getGroupsList,
        getDevicesInGroup,
    };
});
