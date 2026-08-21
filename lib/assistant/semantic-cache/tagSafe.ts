export const toRedisTag = (value: string): string => value.replace(/[^a-zA-Z0-9_]/g, '_');
