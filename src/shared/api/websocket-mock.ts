import type { Device, DevicesGroup } from './types';
import { SampleDevices, SampleGroups } from './data';
import { arrayToShuffled, waitFor } from '@/shared/lib/utils';

type WebsocketDeviceEvent = {
    type: 'device_update';
    device: Device;
};
type WebsocketGroupEvent = {
    type: 'group_update';
    group: DevicesGroup;
};

type WebsocketApiEvent = WebsocketDeviceEvent | WebsocketGroupEvent;

export const useWebsocketEventsStream = async (listener: (event: WebsocketApiEvent) => void) => {
    const delayMs = 200;
    const events = [
        ...SampleDevices.map((device) => ({
            type: 'device_update' as const,
            device,
        })),
        ...SampleGroups.map((group) => ({
            type: 'group_update' as const,
            group,
        })),
    ];

    for (const event of arrayToShuffled(events)) {
        await waitFor(delayMs);
        listener(event);
    }
};
