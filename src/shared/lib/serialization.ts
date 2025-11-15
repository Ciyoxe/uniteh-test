export const structuredSerializer = {
    serialize(data: unknown) {
        return JSON.stringify(data, (_k, v) => {
            if (v instanceof Map) {
                return {
                    __type: 'Map',
                    value: Array.from(v.entries()),
                };
            }
            if (v instanceof Set) {
                return {
                    __type: 'Set',
                    value: Array.from(v),
                };
            }
            return v;
        });
    },
    deserialize(data: string) {
        return JSON.parse(data, (_k, v) => {
            if (v && typeof v === 'object' && v.__type === 'Map') {
                return new Map(v.value);
            }
            if (v && typeof v === 'object' && v.__type === 'Set') {
                return new Set(v.value);
            }
            return v;
        });
    },
};
