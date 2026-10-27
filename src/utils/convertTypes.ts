
export const getChangedFields = <T extends object>(
    data: T,
    dirtyFields: Partial<Record<keyof T, boolean>>
): Partial<T> => {
    const result: Partial<T> = {};

    (Object.keys(dirtyFields) as (keyof T)[]).forEach(key => {
        if (dirtyFields[key]) {
            result[key] = data[key];
        }
    });

    return result;
};