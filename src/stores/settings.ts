import { structuredSerializer } from '@/shared/lib/serialization';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

const toggleValueInSet = <T>(set: Set<T>, value: T) => {
    if (set.has(value)) {
        set.delete(value);
    } else {
        set.add(value);
    }
};
const pushArrayOptionIntoMap = <K, V>(map: Map<K, V[]>, key: K, value: V) => {
    if (!map.has(key)) {
        map.set(key, []);
    }
    map.get(key)!.push(value);
};
const hasArrayOptionInMap = <K, V>(map: Map<K, V[]>, key: K, value: V) => {
    return map.has(key) && map.get(key)!.includes(value);
};
const toggleArrayOptionInMap = <K, V>(map: Map<K, V[]>, key: K, value: V) => {
    if (hasArrayOptionInMap(map, key, value)) {
        const values = map.get(key)!.filter((v) => v !== value);

        if (values.length === 0) {
            map.delete(key);
        } else {
            map.set(key, values);
        }
    } else {
        pushArrayOptionIntoMap(map, key, value);
    }
};

export const useSettingsStore = defineStore(
    'settings',
    () => {
        const mode = ref<'online' | 'archive'>('online');

        const expandedGroupIds = reactive(new Set<string>());
        const expandedDeviceIds = reactive(new Map<string | null, number[]>()); // group id (null for non-grouped devices) -> expanded device ids

        const selectedOnlineDeviceIds = reactive(new Set<number>());
        const selectedOnlineChannelIdxs = reactive(new Map<number, number[]>()); // device id -> selected channel indices (1-based)

        const selectedArchiveDeviceId = ref<number | null>(null);
        const selectedArchiveChannelsIdxs = reactive(new Map<number, number[]>()); // device id -> selected channel indices (1-based)

        const isGroupExpanded = (groupId: string) => {
            return expandedGroupIds.has(groupId);
        };
        const isDeviceExpanded = (groupId: string | null, deviceId: number) => {
            return hasArrayOptionInMap(expandedDeviceIds, groupId, deviceId);
        };
        const toggleGroupExpanded = (groupId: string) => {
            toggleValueInSet(expandedGroupIds, groupId);
        };
        const toggleDeviceExpanded = (groupId: string | null, deviceId: number) => {
            toggleArrayOptionInMap(expandedDeviceIds, groupId, deviceId);
        };

        const isDeviceSelected = (deviceId: number) => {
            if (mode.value === 'online') {
                return selectedOnlineDeviceIds.has(deviceId);
            } else {
                return selectedArchiveDeviceId.value === deviceId;
            }
        };
        const toggleDeviceSelected = (deviceId: number) => {
            if (mode.value === 'online') {
                toggleValueInSet(selectedOnlineDeviceIds, deviceId);
            } else {
                selectedArchiveDeviceId.value =
                    deviceId === selectedArchiveDeviceId.value ? null : deviceId;
            }
        };

        const isChannelSelected = (deviceId: number, channelIdx: number) => {
            if (!isDeviceSelected(deviceId)) return false;

            if (mode.value === 'online') {
                return hasArrayOptionInMap(selectedOnlineChannelIdxs, deviceId, channelIdx);
            } else {
                return hasArrayOptionInMap(selectedArchiveChannelsIdxs, deviceId, channelIdx);
            }
        };
        const toggleChannelSelected = (deviceId: number, channelIdx: number) => {
            if (!isDeviceSelected(deviceId)) {
                throw new Error('Cannot toggle channel selection for non-selected device');
            }

            if (mode.value === 'online') {
                toggleArrayOptionInMap(selectedOnlineChannelIdxs, deviceId, channelIdx);
            } else {
                toggleArrayOptionInMap(selectedArchiveChannelsIdxs, deviceId, channelIdx);
            }
        };
        const deleteDevice = (deviceId: number) => {
            selectedOnlineDeviceIds.delete(deviceId);
            selectedOnlineChannelIdxs.delete(deviceId);
            selectedArchiveChannelsIdxs.delete(deviceId);

            if (selectedArchiveDeviceId.value === deviceId) {
                selectedArchiveDeviceId.value = null;
            }
            for (const [groupId, deviceIds] of expandedDeviceIds.entries()) {
                expandedDeviceIds.set(
                    groupId,
                    deviceIds.filter((id) => id !== deviceId),
                );
            }
        };

        return {
            mode,
            expandedGroupIds,
            expandedDeviceIds,
            selectedOnlineDeviceIds,
            selectedOnlineChannelIdxs,
            selectedArchiveDeviceId,
            selectedArchiveChannelsIdxs,

            isGroupExpanded,
            isDeviceExpanded,
            isDeviceSelected,
            isChannelSelected,
            toggleGroupExpanded,
            toggleDeviceExpanded,
            toggleDeviceSelected,
            toggleChannelSelected,
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
