export const STORES_TYPES_EX_1 = `import type { Writable } from 'svelte/store';

// STORES are "LOADING" before window/localStorage/sessionStorage is available. more explicit than using null, and a bit easier to work with
export type StorageStoreValue<Type extends object> = 'LOADING' | Type;

export interface StorageStoreStorage {
	type?: 'session';
	key: string;
}

export interface StorageStoreConfig<Type extends object, MethodsType extends object = object> {
	storage: StorageStoreStorage;
	defaultValue: Type;
	onSubscribe?: (value: StorageStoreValue<Type>) => Promise<void>;
	getMethods?: (store: Writable<StorageStoreValue<Type>>) => MethodsType;
}

export interface StorageStore<Type extends object, MethodsType extends object = object> {
	store: Writable<StorageStoreValue<Type>>;
	methods: MethodsType;
}
`;
export const STORES_EX_1 = `import type { StorageStore, StorageStoreConfig, StorageStoreValue } from '../utility.types';
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
			// If the state of the store is not 'LOADING', save it to storage.
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
`;

export const STORES_EX_2 = `import createStorageStore from '$lib/utility/store/create-storage-store';

export interface NavState {
	isExpanded: boolean;
}

export interface NavMethods {
	toggleNav: () => void;
	closeNav: () => void;
}

const navStoreObject = createStorageStore<NavState, NavMethods>({
	storage: {
		key: 'nav',
		type: 'session'
	},
	getMethods: (store) => {
		const toggleNav = () =>
			store.update((v) => {
				if (v === 'LOADING') return v;
				if (v.isExpanded) {
					return { isExpanded: false };
				}
				return { isExpanded: true };
			});

		const closeNav = () =>
			store.update((v) => {
				if (v === 'LOADING') return v;
				return { isExpanded: false };
			});

		return {
			toggleNav,
			closeNav
		};
	},
	defaultValue: { isExpanded: false }
});

// rename via destruction on export
export const {
	store: navStore,
	methods: { toggleNav, closeNav }
} = navStoreObject;
`;
