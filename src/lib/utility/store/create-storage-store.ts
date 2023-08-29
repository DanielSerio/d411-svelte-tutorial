import type { StorageStore, StorageStoreConfig, StorageStoreValue } from '../utility.types';
import { writable } from 'svelte/store';
/**
 * Creates a svelte store that is tied to browser storage.
 * @param config {StorageStoreConfig<object,object>}
 * @returns {StorageStore<object,object>} {@link StorageStore}
 */
export default function createStorageStore<
	Type extends object,
	MethodsType extends object = object
>(config: StorageStoreConfig<Type, MethodsType>): StorageStore<Type, MethodsType> {
	const store = writable<StorageStoreValue<Type>>('LOADING');

	if (typeof window !== 'undefined') {
		const STORAGE = config.storage.type === 'session' ? sessionStorage : localStorage;
		const KEY = config.storage.key;
		// Get last value stored in local storage...
		const lastSavedValue: string | null = STORAGE.getItem(KEY);

		// if there is a value, use it to set the store.
		if (lastSavedValue !== null) {
			store.set(JSON.parse(lastSavedValue));
		} else {
			//otherwise, set the store to the defaultValue passed into the config
			store.set(config.defaultValue);
		}

		// runs every time 'value' changes
		store.subscribe(async (value) => {
			// If the state of the store is not 'LOADING', save it to local storage.
			if (value !== 'LOADING') {
				STORAGE.setItem(KEY, JSON.stringify(value));
			}
			// If a onSubscribe callback was passed to the config, call it here
			if (config.onSubscribe) await config.onSubscribe(value);
		});
	}

	let methods = {} as MethodsType;

	// This is how we can create custom store methods.
	if (config.getMethods) {
		methods = config.getMethods(store);
	}

	return {
		store,
		methods
	};
}
