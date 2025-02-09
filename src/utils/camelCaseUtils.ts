import camelCase from "lodash.camelcase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCase); // Recursively map array elements
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = camelCase(key);
            acc[camelKey] = toCamelCase(obj[key]);
            return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as Record<string, any>);
    }
    return obj;
};

export default toCamelCase;
