'use client';

type StorageType = 'local' | 'session';

export const getBrowserStorage = (key: string, storageType: StorageType): string => {

    if (typeof window === 'undefined') throw new Error('No window');
    const storage = storageType === 'session' ? window.sessionStorage : window.localStorage;
    return storage.getItem(key) as string;
};

export const setBrowserStorage = (key: string,value: string, storageType: StorageType, ): void => {
    if (typeof window === 'undefined') return;
    const storage = storageType === 'session' ? window.sessionStorage : window.localStorage;
    storage.setItem(key, value);
};