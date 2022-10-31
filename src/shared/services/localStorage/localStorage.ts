import { useMemo } from "react";

import config from "config/appConfig";

import { safelyParseJSON } from "utils/serviceUtils/helpers";

const { GLOBAL_CONSTANTS } = config;

const isSupported = (): boolean => {
	try {
		const key = "test_ls_key";
		localStorage.setItem(key, "test value");
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		console.warn("Local storage not supported!", { error });
		return false;
	}
};

const useLocalStorage = () => {
	const isLocalStorageAvailable = useMemo(() => isSupported(), []);

	return useMemo(
		() => ({
			set: (key: string, value: string): void => {
				if (!isLocalStorageAvailable) return;

				localStorage.setItem(`${GLOBAL_CONSTANTS.LOCAL_STORAGE_PREFIX}${key}`, value);
			},
			get: <T>(key: string, defaultValue: Partial<T> | null): T | Partial<T> | string | null => {
				if (!isLocalStorageAvailable) return defaultValue;

				const data = localStorage.getItem(`${GLOBAL_CONSTANTS.LOCAL_STORAGE_PREFIX}${key}`);

				try {
					const parsedValue = safelyParseJSON<T>(data);
					return data ? (parsedValue !== undefined ? parsedValue : data) : defaultValue;
				} catch (error) {
					console.error(
						`Error while parsing local storage data for ${key}. Message: ${(error as Error).message}. Stack: ${
							(error as Error).stack
						}`
					);
					return data || defaultValue;
				}
			},
			setGlobal: (key: string, value: string): void => {
				if (!isLocalStorageAvailable) return;

				localStorage.setItem(key, value);
			},
			getGlobal: <T>(key: string, defaultValue: Partial<T> | null): T | Partial<T> | string | null => {
				if (!isLocalStorageAvailable) return defaultValue;

				const data = localStorage.getItem(key);

				try {
					const parsedValue = safelyParseJSON<T>(data);
					return data ? (parsedValue !== undefined ? parsedValue : data) : defaultValue;
				} catch (error) {
					console.error(
						`Error while parsing local storage data for ${key}. Message: ${(error as Error).message}. Stack: ${
							(error as Error).stack
						}`
					);
					return data || defaultValue;
				}
			},
			remove: (key: string): void => {
				if (!isLocalStorageAvailable) return;

				localStorage.removeItem(`${GLOBAL_CONSTANTS.LOCAL_STORAGE_PREFIX}${key}`);
			}
		}),
		[isLocalStorageAvailable]
	);
};

export default useLocalStorage;
