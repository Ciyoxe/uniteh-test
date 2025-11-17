export const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const arrayToShuffled = <T>(array: T[]) => {
    const result = array.slice();

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = result[i] as T;
        result[i] = result[j] as T;
        result[j] = tmp;
    }

    return result;
};

export const formatDatetime = (datetime: string) => {
    return new Date(datetime).toLocaleString();
};
